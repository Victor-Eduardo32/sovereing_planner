import { PrismaClient } from "@prisma/client";
import { TaskGateway } from "../../domain/gateway/task.gateway";
import { Task } from "../../domain/entities/task";

export class TaskRepositoryPrisma implements TaskGateway {
    private constructor(private readonly prismaClient: PrismaClient){}

    public static create(prismaClient: PrismaClient) {
        return new TaskRepositoryPrisma(prismaClient)
    }

    public async findAll(task_list_ids: number[]): Promise<Task[]> {
        const tasksQuery = await this.prismaClient.task.findMany({
            where: {
                task_list_id: {
                    in: task_list_ids
                }
            }
        })

        const tasks = tasksQuery.map((task) => {
            return Task.with({
                id: task.id,
                task_list_id: task.task_list_id,
                name: task.name,
                state: task.state,
                created_at: task.created_at,
                updated_at: task.updated_at
            })
        })

        return tasks
    }

    public async save(task: Task): Promise<Task> {
        try {
            const data = {
                task_list_id: task.task_list_id,
                name: task.name,
                state: task.state,
                created_at: task.created_at,
                updated_at: task.updated_at
            }
    
            const aTask = await this.prismaClient.task.create({
                data: data
            }) as Task
    
            return aTask
        } catch (error) {
            console.error(error);
            throw new Error("Error on task repository prisma.")
        }
    }

    public async update(task: Task): Promise<Task> {
        try {
            const data = {
                name: task.name,
                updated_at: task.updated_at
            }
    
            const aTask = await this.prismaClient.task.update({
                where: {
                    id: task.id
                },
                data: data
            }) as Task
    
            return aTask
        } catch (error) {
            console.error(error);
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

            return 
        } catch (error) {
            console.error(error);
            throw new Error("Error on task repository prisma.")
        }
    }

    public async findTaskIdsByTaskListId(task_list_id: number): Promise<number[]> {
        const taskIdsQuery = await this.prismaClient.task.findMany({
            select: {
                id: true
            },
            where: {
                task_list_id: task_list_id
            }
        })

        const taskIds = taskIdsQuery.map(taskId => taskId.id)

        return taskIds
    }

    public async updateState(id: number, state: number, updated_at: Date): Promise<Task> {
        try {
            const data = {
                state: state,
                updated_at: updated_at
            }

            const task = await this.prismaClient.task.update({
                where: {
                    id: id
                },
                data: data
            }) as Task

            return task
        } catch (error) {
            console.error(error);
            throw new Error("Error on task repository prisma.")
        }
    }
}