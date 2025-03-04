import { PrismaClient } from "@prisma/client";
import { CompletedTaskGateway } from "../../domain/gateway/completedTask.gateway";
import { CompletedTask } from "../../domain/entities/completedTask";

export class CompletedTaskRepositoryPrisma implements CompletedTaskGateway {
    private constructor(
        private readonly prismaClient: PrismaClient
    ){}

    public static create(prismaClient: PrismaClient) {
        return new CompletedTaskRepositoryPrisma(prismaClient)
    }

    public async findAll(completed_task_list_ids: number[]): Promise<CompletedTask[]> {
        try {
            const completedTasksQuery = await this.prismaClient.completedTask.findMany({
                where: {
                    completed_task_list_id: {
                        in: completed_task_list_ids
                    }
                }
            })
    
            const completedTasks = completedTasksQuery.map(completedTask => {
                return CompletedTask.with({
                    id: completedTask.id,
                    completed_task_list_id: completedTask.completed_task_list_id,
                    name: completedTask.name
                })
            })
    
            return completedTasks
        } catch (error) {
            console.error(error);
            throw new Error("Error on completed task repository prisma.")
        }
    }

    public async save(completedTask: CompletedTask): Promise<void> {
        try {
            const data = {
                completed_task_list_id: completedTask.completed_task_list_id,
                name: completedTask.name
            }
    
            await this.prismaClient.completedTask.create({
                data: data
            })
        } catch (error) {
            console.error(error);
            throw new Error("Error on completed task repository prisma.")
        }
    }
}