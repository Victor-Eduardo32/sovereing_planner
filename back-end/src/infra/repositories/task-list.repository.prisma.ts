import { PrismaClient } from "@prisma/client";
import { TaskListGateway } from "../../domain/gateway/taskList.gateway";
import { TaskList } from "../../domain/entities/taskList";

export class TaskListRepositoryPrisma implements TaskListGateway {
    private constructor(private readonly prismaClient: PrismaClient){}

    public static create(prismaClient: PrismaClient) {
        return new TaskListRepositoryPrisma(prismaClient)
    }

    public async findAll(user_id: string): Promise<TaskList[]> {
        const taskListsQuery =  await this.prismaClient.taskList.findMany({
            where: {
                user_id: user_id
            },
            orderBy: {
                priority_level: 'desc'
            }
        })

        const taskLists = taskListsQuery.map((taskList) => {
            return TaskList.with({
                id: taskList.id,
                user_id: taskList.user_id,
                title: taskList.title,
                description: taskList.description,
                priority_level: taskList.priority_level,
                created_at: taskList.created_at,
                updated_at: taskList.updated_at
            })
        })

        return taskLists
    }

    public async save(taskList: TaskList): Promise<TaskList> {
        try {
            const data = {
                user_id: taskList.user_id,
                title: taskList.title,
                description: taskList.description,
                priority_level: taskList.priority_level,
                created_at: taskList.created_at,
                updated_at: taskList.updated_at
            }

            const aTaskList = await this.prismaClient.taskList.create({
                data: data
            }) as TaskList

            return aTaskList
        } catch (error) {
            console.error(error);
            throw new Error("Error on task list repository prisma.")
        }
    }

    public async update(taskList: TaskList): Promise<TaskList> {
        try {
            const data = {
                title: taskList.title,
                description: taskList.description,
                priority_level: taskList.priority_level,
                updated_at: taskList.updated_at
            }

            const aTaskList = await this.prismaClient.taskList.update({
                where: {
                    id: taskList.id
                },
                data: data
            }) as TaskList

            return aTaskList
        } catch (error) {
            console.error(error);
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
    
            return
        } catch (error) {
            console.error(error);
            throw new Error("Error on task list repository prisma.")
        }
    }
}   