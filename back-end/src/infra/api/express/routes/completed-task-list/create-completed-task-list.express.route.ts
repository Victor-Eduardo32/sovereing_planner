import { Request, Response, NextFunction } from "express";
import { CreateCompletedTaskListInputDto, CreateCompletedTaskListUseCase } from "../../../../../application/usecases/completed-task-list/create-completed-task-list.usecase";
import { HttpMethod, Route } from "../route";
import { getUserIdFromHeaders } from "../../../../../utils/requestHelpers";

export class CreateCompletedTaskListRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly createCompletedTaskListUseCase: CreateCompletedTaskListUseCase
    ){}

    public static create(createCompletedTaskListUseCase: CreateCompletedTaskListUseCase) {
        return new CreateCompletedTaskListRoute(
            '/completed-task-list',
            HttpMethod.POST,
            createCompletedTaskListUseCase
        )
    }

    public getHandler() {
        return async (request: Request, response: Response, next: NextFunction): Promise<void> => {
            try {
                const user_id = getUserIdFromHeaders(request.headers)
                const { title, description, completed_tasks } = request.body

                const input: CreateCompletedTaskListInputDto = { 
                    user_id,
                    title, 
                    description, 
                    completed_tasks 
                }
                
                await this.createCompletedTaskListUseCase.execute(input)

                response.status(200).send('Task list finish succefully')
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
}