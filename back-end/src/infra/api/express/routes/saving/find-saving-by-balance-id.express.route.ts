import { Request, Response, NextFunction } from "express";
import { FindSavingByBalanceIdInputDto, FindSavingByBalanceIdOutputDto, FindSavingByBalanceIdUseCase } from "../../../../../application/usecases/saving/find-saving-by-balance-id.usecase";
import { HttpMethod, Route } from "../route";

export type FindSavingByBalanceIdResponseDto = {
    savings: {
        id: number,
        balance_id: number,
        description: string, 
        value: string, 
        date: Date,
        created_at: Date
    }[]
}

export class FindSavingByBalanceIdRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly findSavingByBalanceIdUseCase: FindSavingByBalanceIdUseCase
    ){}

    public static create(findSavingByBalanceIdUseCase: FindSavingByBalanceIdUseCase) {
        return new FindSavingByBalanceIdRoute(
            "/saving",
            HttpMethod.GET,
            findSavingByBalanceIdUseCase
        )
    }

    public getHandler() {
        return async (request: Request, response: Response, next: NextFunction): Promise<void>  =>  {
            try {
                const { balance_id } = request.query

                const input: FindSavingByBalanceIdInputDto = {
                    balance_id: Number(balance_id)
                }

                const output = await this.findSavingByBalanceIdUseCase.execute(input)

                const responseBody = this.present(output)

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

    private present(input: FindSavingByBalanceIdOutputDto): FindSavingByBalanceIdResponseDto {
        const response = {
            savings: input.savings.map(saving => {
                return {
                    id: saving.id,
                    balance_id: saving.balance_id,
                    description: saving.description, 
                    value: saving.value.toString(), 
                    date: saving.date,
                    created_at: saving.created_at
                }
            })
        }

        return response
    }
}