import { PrismaClient } from "@prisma/client";
import { CompletedTaskListGateway } from "../../domain/gateway/completedTaskList.gateway";
import { CompletedTaskList } from "../../domain/entities/completedTaskList";

export class CompletedTaskListRepositoryPrisma implements CompletedTaskListGateway {
    private constructor(
        private readonly prismaClient: PrismaClient
    ){}

    public static create(prismaClient: PrismaClient) {
        return new CompletedTaskListRepositoryPrisma(prismaClient)
    }

    public async save(completedTaskList: CompletedTaskList): Promise<CompletedTaskList> {
        const data = {
            user_id: completedTaskList.user_id,
            title: completedTaskList.title,
            description: completedTaskList.description,
            ended_at: completedTaskList.ended_at
        }

        const aCompletedTaskList = await this.prismaClient.completedTaskList.create({
            data: data
        }) as CompletedTaskList

        return aCompletedTaskList
    }
}