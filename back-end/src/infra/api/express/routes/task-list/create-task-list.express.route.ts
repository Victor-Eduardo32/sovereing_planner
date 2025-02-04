import { Request, Response, NextFunction } from "express";
import { CreateTaskListInputDto, CreateTaskListOutputDto, CreateTaskListUseCase } from "../../../../../application/usecases/task-list/create-task-list.usecase";
import { HttpMethod, Route } from "../route";
import { Task } from "../../../../../domain/entities/task";

export type CreateTaskListReponseDto = {
    id: number,
    title: string,
    description: string,
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
                const { title, description, tasks } = request.body

                const input: CreateTaskListInputDto = { 
                    title: title, 
                    description: description, 
                    tasks: tasks 
                }

                const output = await this.createTaskListUseCase.execute(input)

                const responseBody = this.present(output);

                response.send(responseBody).status(200)
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
            created_at: input.created_at,
            updated_at: input.updated_at,
            tasks: input.tasks
        }

        return response
    }
}