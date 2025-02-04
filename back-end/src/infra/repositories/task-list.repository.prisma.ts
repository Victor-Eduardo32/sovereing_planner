import { PrismaClient } from "@prisma/client";
import { TaskListGateway } from "../../domain/gateway/taskList.gateway";
import { TaskList } from "../../domain/entities/taskList";
import { title } from "process";

export class TaskListRepositoryPrisma implements TaskListGateway {
    private constructor(private readonly prismaClient: PrismaClient){}

    public static create(prismaClient: PrismaClient) {
        return new TaskListRepositoryPrisma(prismaClient)
    }

    public async save(taskList: TaskList): Promise<TaskList> {
        try {
            const data = {
                title: taskList.title,
                description: taskList.description,
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
}   