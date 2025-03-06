import { PrismaClient } from "@prisma/client";
import { TaskListGateway } from "../../domain/gateway/taskList.gateway";
import { TaskList } from "../../domain/entities/taskList";

export class TaskListRepositoryPrisma implements TaskListGateway {
    private constructor(private readonly prismaClient: PrismaClient){}

    public static create(prismaClient: PrismaClient) {
        return new TaskListRepositoryPrisma(prismaClient)
    }

    public async findAll(user_id: string): Promise<TaskList[]> {
        try {
            const prismaTaskList =  await this.prismaClient.taskList.findMany({
                where: {
                    user_id: user_id
                },
                orderBy: {
                    priority_level: 'desc'
                }
            })
    
            return prismaTaskList.map((taskList) => this.toDomainEntity(taskList))
        } catch (error) {
            console.error("Error in findAll:", error);
            throw new Error("Error on task list repository prisma.")
        }
    }

    public async save(taskList: TaskList): Promise<TaskList> {
        try {
            const prismaTaskList = await this.prismaClient.taskList.create({
                data: this.toPrismaData(taskList)
            })

            return this.toDomainEntity(prismaTaskList)
        } catch (error) {
            console.error("Error in save:", error);
            throw new Error("Error on task list repository prisma.")
        }
    }

    public async update(taskList: TaskList): Promise<TaskList> {
        try {
            const prismaTaskList = await this.prismaClient.taskList.update({
                where: {
                    id: taskList.id
                },
                data: this.toPrismaData(taskList)
            })

            return this.toDomainEntity(prismaTaskList)
        } catch (error) {
            console.error("Error in update:", error);
            throw new Error("Error on task list repository prisma.")
        }
    }

    public async delete(id: number): Promise<void> {
        try {
            await this.prismaClient.taskList.delete({
                where: {
                    id: id
                }
            })
        } catch (error) {
            console.error("Error in delete:", error);
            throw new Error("Error on task list repository prisma.")
        }
    }

    private toDomainEntity(prismaTaskList: any): TaskList {
        return TaskList.with({
            id: prismaTaskList.id,
            user_id: prismaTaskList.user_id,
            title: prismaTaskList.title,
            description: prismaTaskList.description,
            priority_level: prismaTaskList.priority_level,
            created_at: prismaTaskList.created_at,
            updated_at: prismaTaskList.updated_at
        })
    }

    private toPrismaData(taskList: TaskList) {
        return {
            user_id: taskList.user_id,
            title: taskList.title,
            description: taskList.description,
            priority_level: taskList.priority_level,
            created_at: taskList.created_at,
            updated_at: taskList.updated_at
        }
    }
}   