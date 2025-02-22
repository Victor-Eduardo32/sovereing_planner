import { Request, Response, NextFunction } from "express";
import { HttpMethod, Route } from "../route";
import { getUserIdFromHeaders } from "../../../../../utils/requestHelpers";
import { FindAllCompletedTaskListInputDto, FindAllCompletedTaskListOuputDto, FindAllCompletedTaskListUseCase } from "../../../../../application/usecases/completed-task-list/find-all-completed-task-list.usecase";
import { CompletedTask } from "../../../../../domain/entities/completedTask";

export type FindAllCompletedTaskListResponseDto = {
    completedTaskLists: {
        id: number,
        title: string,
        description: string,
        ended_at: Date,
        completed_tasks: CompletedTask[]
    }[]
}

export class FindAllCompletedTaskListRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly findAllCompletedTaskListUseCase: FindAllCompletedTaskListUseCase
    ){}

    public static create(findAllCompletedTaskListUseCase: FindAllCompletedTaskListUseCase) {
        return new FindAllCompletedTaskListRoute(
            "/completed-task-list",
            HttpMethod.GET,
            findAllCompletedTaskListUseCase
        )
    }

    public getHandler() {
        return async (request: Request, response: Response, next: NextFunction): Promise<void> => {
            try {
                const user_id = getUserIdFromHeaders(request.headers)

                const input: FindAllCompletedTaskListInputDto = {
                    user_id: user_id
                }

                const output = await this.findAllCompletedTaskListUseCase.execute(input)

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

    private present(input: FindAllCompletedTaskListOuputDto): FindAllCompletedTaskListResponseDto {
        const response = {
            completedTaskLists: input.completedTaskLists.map((completedTaskList) => {
                return {
                    id: completedTaskList.id,
                    title: completedTaskList.title,
                    description: completedTaskList.description,
                    ended_at: completedTaskList.ended_at,
                    completed_tasks: completedTaskList.completed_tasks
                }
            })
        }

        return response
    }
}