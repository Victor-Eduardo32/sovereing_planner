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
            const prismaCompletedTask = await this.prismaClient.completedTask.findMany({
                where: {
                    completed_task_list_id: {
                        in: completed_task_list_ids
                    }
                }
            })
    
            return prismaCompletedTask.map(completedTask => this.toDomainEntity(completedTask))
        } catch (error) {
            console.error("Error in findAll:", error);
            throw new Error("Error on completed task repository prisma.")
        }
    }

    public async save(completedTask: CompletedTask): Promise<void> {
        try {
            await this.prismaClient.completedTask.create({
                data: this.toPrismaData(completedTask)
            })
        } catch (error) {
            console.error("Error in save:", error);
            throw new Error("Error on completed task repository prisma.")
        }
    }

    private toDomainEntity(prismaCompletedTask: any): CompletedTask {
        return CompletedTask.with({
            id: prismaCompletedTask.id,
            completed_task_list_id: prismaCompletedTask.completed_task_list_id,
            name: prismaCompletedTask.name
        })
    }

    private toPrismaData(completedTask: CompletedTask) {
        return {
            completed_task_list_id: completedTask.completed_task_list_id,
            name: completedTask.name
        }
    }
}