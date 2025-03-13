import { Request, Response, NextFunction } from "express";
import { DeleteBalanceUseCase } from "../../../../../application/usecases/balance/delete-balance.usecase";
import { HttpMethod, Route } from "../route";

export class DeleteBalanceRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly deleteBalanceUseCase: DeleteBalanceUseCase
    ){}

    public static create(deleteBalanceUseCase: DeleteBalanceUseCase) {
        return new DeleteBalanceRoute(
            "/balance",
            HttpMethod.DELETE,
            deleteBalanceUseCase
        )
    }

    public getHandler() {
       return async (request: Request, response: Response, next: NextFunction): Promise<void>  => {
            try {
                const { id } = request.body

                await this.deleteBalanceUseCase.execute({ id })

                response.status(200).send('Balance deleted successfully!')
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