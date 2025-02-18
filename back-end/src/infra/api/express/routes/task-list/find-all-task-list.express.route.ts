import { Request, Response, NextFunction } from "express";
import { FindAllTaskListInputDto, FindAllTaskListOuputDto, FindAllTaskListUseCase } from "../../../../../application/usecases/task-list/find-all-task-list.usecase";
import { HttpMethod, Route } from "../route";
import { TaskProps } from "../../../../../domain/types/taskProps";
import { getUserIdFromHeaders } from "../../../../../utils/requestHelpers";

export type FindAllTaskListResponseDto = {
    taskLists: {
        id: number,
        title: string,
        description: string,
        priority_level: number,
        created_at: Date,
        updated_at: Date
        tasks: TaskProps[]
    }[]
}

export class FindAllTaskListRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly findAllTaskListUseCase: FindAllTaskListUseCase
    ){}

    public static create(findAllTaskListUseCase: FindAllTaskListUseCase) {
        return new FindAllTaskListRoute(
            "/task-list",
            HttpMethod.GET,
            findAllTaskListUseCase
        )
    }

    public getHandler() {
        return async (request: Request, response: Response, next: NextFunction): Promise<void> => {
            try {
                const user_id = getUserIdFromHeaders(request.headers)

                const input: FindAllTaskListInputDto = {
                    user_id: user_id
                }

                const output = await this.findAllTaskListUseCase.execute(input)

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

    private present(input: FindAllTaskListOuputDto): FindAllTaskListResponseDto {
        const response = {
            taskLists: input.taskLists.map((taskList) => {
                return {
                    id: taskList.id,
                    title: taskList.title,
                    description: taskList.description,
                    priority_level: taskList.priority_level,
                    created_at: taskList.created_at,
                    updated_at: taskList.updated_at,
                    tasks: taskList.tasks
                }
            })
        }

        return response
    }
}