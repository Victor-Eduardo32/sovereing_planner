import { Request, Response, NextFunction } from "express";
import { CreateTaskListInputDto, CreateTaskListOutputDto, CreateTaskListUseCase } from "../../../../../application/usecases/task-list/create-task-list.usecase";
import { HttpMethod, Route } from "../route";
import { Task } from "../../../../../domain/entities/task";
import { getUserIdFromHeaders } from "../../../../../utils/requestHelpers";

export type CreateTaskListReponseDto = {
    id: number,
    title: string,
    description: string,
    priority_level: number,
    created_at: Date,
    updated_at: Date
    tasks: Task[]
}

export class CreateTaskListRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly createTaskListUseCase: CreateTaskListUseCase
    ){}

    public static create(createTaskListUseCase: CreateTaskListUseCase) {
        return new CreateTaskListRoute(
            "/task-list",
            HttpMethod.POST,
            createTaskListUseCase
        )
    }

    public getHandler() {
        return async (request: Request, response: Response, next: NextFunction): Promise<void> => {
            try {
                const user_id = getUserIdFromHeaders(request.headers)
                const { title, description, priority_level, tasks } = request.body

                const input: CreateTaskListInputDto = { 
                    user_id: user_id,
                    title: title, 
                    description: description, 
                    priority_level: priority_level,
                    tasks: tasks 
                }

                const output = await this.createTaskListUseCase.execute(input)

                const responseBody = this.present(output);

                response.status(200).json(responseBody).send()
            } catch (error) {
                next(error)
            }
        }
    }

    public getPath(): string {
        return this.path
    }

    public getMethod(): HttpMethod {
        return this.method
    }

    private present(input: CreateTaskListOutputDto): CreateTaskListReponseDto {
        const response = {
            id: input.id,
            title: input.title, 
            description: input.description,
            priority_level: input.priority_level, 
            created_at: input.created_at,
            updated_at: input.updated_at,
            tasks: input.tasks
        }

        return response
    }
}