import { UpdateTaskStateOutputDto, UpdateTaskStateUseCase } from "../../../../../application/usecases/task/update-state-task.usecase";
import { HttpMethod, Route } from "../route";
import { Request, Response, NextFunction } from "express";

export type UpdateTaskStateResponseDto = {
    id: number,
    task_list_id: number,
    name: string,
    state: number,
    created_at: Date,
    updated_at: Date
}

export class UpdateTaskStateRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly updateTaskStateUseCase: UpdateTaskStateUseCase
    ){}

    public static create(updateTaskStateUseCase: UpdateTaskStateUseCase) {
        return new UpdateTaskStateRoute(
            '/update-task-state',
            HttpMethod.PUT,
            updateTaskStateUseCase
        )
    }

    public getHandler() {
        return async (request: Request, response: Response, next: NextFunction): Promise<void> => {
           try {
                const { id,  actionState, state } = request.body

                const output = await this.updateTaskStateUseCase.execute({ id, actionState, state })
                
                const responseBody = this.present(output)

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

    private present(input: UpdateTaskStateOutputDto): UpdateTaskStateResponseDto {
        const response = {
            id: input.id,
            task_list_id: input.task_list_id,
            name: input.name,
            state: input.state,
            created_at: input.created_at,
            updated_at: input.updated_at
        }

        return response
    }
}