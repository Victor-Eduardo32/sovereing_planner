import { PrismaClient } from "@prisma/client";
import { CompletedTaskListGateway } from "../../domain/gateway/completedTaskList.gateway";
import { CompletedTaskList } from "../../domain/entities/completedTaskList";

export class CompletedTaskListRepositoryPrisma implements CompletedTaskListGateway {
    private constructor(
        private readonly prismaClient: PrismaClient
    ) {}

    public static create(prismaClient: PrismaClient) {
        return new CompletedTaskListRepositoryPrisma(prismaClient);
    }

    public async findAll(user_id: string): Promise<CompletedTaskList[]> {
        try {
            const prismaCompletedTaskLists = await this.prismaClient.completedTaskList.findMany({
                where: { user_id },
                orderBy: { ended_at: 'desc' },
            });

            return prismaCompletedTaskLists.map((completedTaskList) =>
                this.toDomainEntity(completedTaskList)
            );
        } catch (error) {
            console.error("Error in findAll:", error);
            throw new Error("Error on completed task list repository prisma.");
        }
    }

    public async save(completedTaskList: CompletedTaskList): Promise<CompletedTaskList> {
        try {
            const prismaCompletedTaskList = await this.prismaClient.completedTaskList.create({
                data: this.toPrismaData(completedTaskList),
            });

            return this.toDomainEntity(prismaCompletedTaskList);
        } catch (error) {
            console.error("Error in save:", error);
            throw new Error("Error on completed task list repository prisma.");
        }
    }

    private toDomainEntity(prismaCompletedTaskList: any): CompletedTaskList {
        return CompletedTaskList.with({
            id: prismaCompletedTaskList.id,
            user_id: prismaCompletedTaskList.user_id,
            title: prismaCompletedTaskList.title,
            description: prismaCompletedTaskList.description,
            ended_at: prismaCompletedTaskList.ended_at,
        });
    }

    private toPrismaData(completedTaskList: CompletedTaskList): any {
        return {
            user_id: completedTaskList.user_id,
            title: completedTaskList.title,
            description: completedTaskList.description,
            ended_at: completedTaskList.ended_at,
        };
    }
}