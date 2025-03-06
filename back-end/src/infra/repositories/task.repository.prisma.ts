import { PrismaClient } from "@prisma/client";
import { TaskGateway } from "../../domain/gateway/task.gateway";
import { Task } from "../../domain/entities/task";

export class TaskRepositoryPrisma implements TaskGateway {
    private constructor(private readonly prismaClient: PrismaClient){}

    public static create(prismaClient: PrismaClient) {
        return new TaskRepositoryPrisma(prismaClient)
    }

    public async findAll(task_list_ids: number[]): Promise<Task[]> {
        try {
            const prismaTasks = await this.prismaClient.task.findMany({
                where: {
                    task_list_id: {
                        in: task_list_ids
                    }
                }
            })
    
            return prismaTasks.map((task) => this.toDomainEntity(task))
        } catch (error) {
            console.error("Error in findAll:", error);
            throw new Error("Error on task repository prisma.")
        }
    }

    public async save(task: Task): Promise<Task> {
        try {
            const prismaTask = await this.prismaClient.task.create({
                data: this.toPrismaData(task)
            })
    
            return this.toDomainEntity(prismaTask)
        } catch (error) {
            console.error("Error in save:", error);
            throw new Error("Error on task repository prisma.")
        }
    }

    public async update(task: Task): Promise<Task> {
        try {
            const prismaTask = await this.prismaClient.task.update({
                where: {
                    id: task.id
                },
                data: this.toPrismaData(task)
            }) as Task
    
            return this.toDomainEntity(prismaTask)
        } catch (error) {
            console.error("Error in update:", error);
            throw new Error("Error on task repository prisma.")
        }
    }

    public async delete(id: number): Promise<void> {
        try {
            await this.prismaClient.task.delete({
                where: {
                    id: id
                }
            })
        } catch (error) {
            console.error("Error in delete:", error);
            throw new Error("Error on task repository prisma.")
        }
    }

    public async findTaskIdsByTaskListId(task_list_id: number): Promise<number[]> {
        try {
            const prismaTaskIds = await this.prismaClient.task.findMany({
                select: {
                    id: true
                },
                where: {
                    task_list_id: task_list_id
                }
            })
    
            return prismaTaskIds.map(taskId => taskId.id)
        } catch (error) {
            console.error("Error in findTaskIdsByTaskListId:", error);
            throw new Error("Error on task repository prisma.")
        }
    }

    public async updateState(id: number, state: number, updated_at: Date): Promise<Task> {
        try {
            const prismaTask = await this.prismaClient.task.update({
                where: {
                    id: id
                },
                data: { state, updated_at }
            })

            return this.toDomainEntity(prismaTask)
        } catch (error) {
            console.error("Error in updateState:", error);
            throw new Error("Error on task repository prisma.")
        }
    }

    private toDomainEntity(prismaTask: any): Task {
        return Task.with({
            id: prismaTask.id,
            task_list_id: prismaTask.task_list_id,
            name: prismaTask.name,
            state: prismaTask.state,
            created_at: prismaTask.created_at,
            updated_at: prismaTask.updated_at
        })
    }

    private toPrismaData(task: Task) {
        return {
            task_list_id: task.task_list_id,
            name: task.name,
            state: task.state,
            created_at: task.created_at,
            updated_at: task.updated_at
        }
    }
}