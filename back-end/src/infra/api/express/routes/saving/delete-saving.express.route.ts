import { Request, Response, NextFunction } from "express";
import { DeleteSavingInputDto, DeleteSavingUseCase } from "../../../../../application/usecases/saving/delete-saving.usecase";
import { HttpMethod, Route } from "../route";

export class DeleteSavingRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly deleteSavingUseCase: DeleteSavingUseCase
    ){}

    public static create(deleteSavingUseCase: DeleteSavingUseCase) {
        return new DeleteSavingRoute(
            '/saving',
            HttpMethod.DELETE,
            deleteSavingUseCase
        )
    }

    public getHandler() {
        return async (request: Request, response: Response, next: NextFunction): Promise<void> => {
            try {
                const { id } = request.body

                const input: DeleteSavingInputDto = {
                    id: id
                }

                await this.deleteSavingUseCase.execute(input)

                response.status(200).send('Saving deleted successfully!')
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