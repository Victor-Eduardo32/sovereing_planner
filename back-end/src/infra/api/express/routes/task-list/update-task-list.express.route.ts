import { Request, Response, NextFunction } from "express";
import { HttpMethod, Route } from "../route";
import { Task } from "../../../../../domain/entities/task";
import { UpdateTaskListInputDto, UpdateTaskListOutputDto, UpdateTaskListUseCase } from "../../../../../application/usecases/task-list/update-task-list.usecase";
import { getUserIdFromHeaders } from "../../../../../utils/requestHelpers";

export type UpdateTaskListReponseDto = {
    id: number,
    title: string,
    description: string,
    priority_level: number,
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
                const user_id = getUserIdFromHeaders(request.headers)
                const { id, title, description, priority_level, created_at, tasks } = request.body

                const input: UpdateTaskListInputDto = { 
                    id: id,
                    user_id: user_id,
                    title: title, 
                    priority_level: priority_level,
                    description: description, 
                    created_at: created_at,
                    tasks: tasks 
                }

                const output = await this.updateTaskListUseCase.execute(input)

                const responseBody = this.present(output);

                response.status(200).json(responseBody)
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
            priority_level: input.priority_level,
            created_at: input.created_at,
            updated_at: input.updated_at,
            tasks: input.tasks
        }

        return response
    }
}