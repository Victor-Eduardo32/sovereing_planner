import { Request, Response, NextFunction } from "express";
import { HttpMethod, Route } from "../route";
import { Task } from "../../../../../domain/entities/task";
import { UpdateTaskListInputDto, UpdateTaskListOutputDto, UpdateTaskListUseCase } from "../../../../../application/usecases/task-list/update-task-list.usecase";

export type UpdateTaskListReponseDto = {
    id: number,
    title: string,
    description: string,
    created_at: Date,
    updated_at: Date
    tasks: Task[]
}

export class UpdateTaskListRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly updateTaskListUseCase: UpdateTaskListUseCase
    ){}

    public static create(updateTaskListUseCase: UpdateTaskListUseCase) {
        return new UpdateTaskListRoute(
            "/task-list",
            HttpMethod.PUT,
            updateTaskListUseCase
        )
    }

    public getHandler() {
        return async (request: Request, response: Response, next: NextFunction): Promise<void> => {
            try {
                const { id, user_id, title, description, created_at, tasks } = request.body

                const input: UpdateTaskListInputDto = { 
                    id: id,
                    user_id: user_id,
                    title: title, 
                    description: description, 
                    created_at: created_at,
                    tasks: tasks 
                }

                const output = await this.updateTaskListUseCase.execute(input)

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

    private present(input: UpdateTaskListOutputDto): UpdateTaskListReponseDto {
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