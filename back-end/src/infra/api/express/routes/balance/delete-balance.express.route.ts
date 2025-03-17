import { Request, Response, NextFunction } from "express";
import { DeleteBalanceInputDto, DeleteBalanceUseCase } from "../../../../../application/usecases/balance/delete-balance.usecase";
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

                const input: DeleteBalanceInputDto = {
                    id: id
                }

                await this.deleteBalanceUseCase.execute(input)

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