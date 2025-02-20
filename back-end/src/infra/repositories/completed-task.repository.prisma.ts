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

    public async save(completedTask: CompletedTask): Promise<void> {
        const data = {
            completed_task_list_id: completedTask.completed_task_list_id,
            name: completedTask.name
        }

        await this.prismaClient.completedTask.create({
            data: data
        })
    }
}