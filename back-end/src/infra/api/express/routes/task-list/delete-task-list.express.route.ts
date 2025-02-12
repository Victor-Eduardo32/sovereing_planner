import { Request, Response, NextFunction } from "express";
import { DeleteTaskListUseCase } from "../../../../../application/usecases/task-list/delete-task-list.usecase";
import { HttpMethod, Route } from "../route";

export class DeleteTaskListRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly deleteTaskListUseCase: DeleteTaskListUseCase
    ){}

    public static create(deleteTaskListUseCase: DeleteTaskListUseCase) {
        return new DeleteTaskListRoute(
            '/task-list',
            HttpMethod.DELETE,
            deleteTaskListUseCase
        )
    }

    public getHandler() {
        return async (request: Request, response: Response, next: NextFunction): Promise<void>  => {
           try {
                const { id } = request.body

                await this.deleteTaskListUseCase.execute({ id })

                response.status(200).send('Task List deletada com sucesso!')
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