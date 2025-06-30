import { Request, Response, NextFunction } from "express";
import { DeleteSavingInputDto, DeleteSavingUseCase } from "../../../../../application/usecases/saving/delete-saving.usecase";
import { HttpMethod, Route } from "../route";
import { UpdateBalanceInputDto, UpdateBalanceUseCase } from "../../../../../application/usecases/balance/update-balance.usecase";
import { FindSavingByIdUseCase } from "../../../../../application/usecases/saving/find-saving-by-id.usecase";

export class DeleteSavingRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly deleteSavingUseCase: DeleteSavingUseCase,
        private findSavingByIdUseCase: FindSavingByIdUseCase,
        private readonly updateBalanceUseCase: UpdateBalanceUseCase
    ){}

    public static create(deleteSavingUseCase: DeleteSavingUseCase, findSavingByIdUseCase: FindSavingByIdUseCase, updateBalanceUseCase: UpdateBalanceUseCase) {
        return new DeleteSavingRoute(
            '/saving',
            HttpMethod.DELETE,
            deleteSavingUseCase,
            findSavingByIdUseCase,
            updateBalanceUseCase,
        )
    }

    public getHandler() {
        return async (request: Request, response: Response, next: NextFunction): Promise<void> => {
            try {
                const { id } = request.body

                const input: DeleteSavingInputDto = {
                    id: id
                }

                const saving = await this.findSavingByIdUseCase.execute({ id });

                const inputBalance: UpdateBalanceInputDto = {
                    id: saving.balance_id,
                    value: saving.value as bigint,
                    type: false
                }

                await this.updateBalanceUseCase.execute(inputBalance)

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