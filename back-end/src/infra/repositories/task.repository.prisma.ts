import { PrismaClient } from "@prisma/client";
import { TaskGateway } from "../../domain/gateway/task.gateway";
import { Task } from "../../domain/entities/task";

export class TaskRepositoryPrisma implements TaskGateway {
    private constructor(private readonly prismaClient: PrismaClient){}

    public static create(prismaClient: PrismaClient) {
        return new TaskRepositoryPrisma(prismaClient)
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
                task_list_id: task.task_list_id,
                name: task.name,
                state: task.state,
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
}