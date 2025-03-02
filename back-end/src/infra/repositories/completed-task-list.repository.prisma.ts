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

    public async findAll(user_id: string): Promise<CompletedTaskList[]> {
        try {
            const completedTaskListsQuery = await this.prismaClient.completedTaskList.findMany({
                where: {
                    user_id: user_id
                }, 
                orderBy: {
                    ended_at: 'desc'
                }
            })
    
            const completedTaskLists = completedTaskListsQuery.map(completedTaskList => {
                return CompletedTaskList.with({
                    id: completedTaskList.id,
                    user_id: completedTaskList.user_id,
                    title: completedTaskList.title,
                    description: completedTaskList.description,
                    ended_at: completedTaskList.ended_at
                })
            })
    
            return completedTaskLists
        } catch (error) {
            console.error(error);
            throw new Error("Error on completed task list repository prisma.")
        }
    }

    public async save(completedTaskList: CompletedTaskList): Promise<CompletedTaskList> {
        try {
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
        } catch (error) {
            console.error(error);
            throw new Error("Error on completed task list repository prisma.")
        }
    }
}