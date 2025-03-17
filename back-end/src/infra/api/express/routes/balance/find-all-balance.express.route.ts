import { Request, Response, NextFunction } from "express";
import { FindAllBalanceInputDto, FindAllBalanceOutputDto, FindAllBalanceUseCase } from "../../../../../application/usecases/balance/find-all-balance.usecase";
import { HttpMethod, Route } from "../route";
import { getUserIdFromHeaders } from "../../../../../utils/requestHelpers";

export type FindAllBalanceResponseDto = {
    balances: {
        id: number,
        name: string,
        amount: number
        currency: string,
        created_at: Date
        updated_at: Date
    }[]
}

export class FindAllBalanceRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly findAllBalanceUseCase: FindAllBalanceUseCase
    ){}

    public static create(findAllBalanceUseCase: FindAllBalanceUseCase) {
        return new FindAllBalanceRoute(
            "/balance",
            HttpMethod.GET,
            findAllBalanceUseCase
        )
    }

    public getHandler() {
        return async (request: Request, response: Response, next: NextFunction): Promise<void>  => {
            try {
                const user_id = getUserIdFromHeaders(request.headers)

                const input: FindAllBalanceInputDto = {
                    user_id: user_id
                }

                const output = await this.findAllBalanceUseCase.execute(input)
    
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

    private present(input: FindAllBalanceOutputDto): FindAllBalanceResponseDto {
        const response = {
            balances: input.balances.map(balance => {
                return {
                    id: balance.id,
                    name: balance.name,
                    amount: balance.amount,
                    currency: balance.currency,
                    created_at: balance.created_at,
                    updated_at: balance.updated_at
                }
            })
        }

        return response
    }
}