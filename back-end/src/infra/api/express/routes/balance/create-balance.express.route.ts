import { Request, Response, NextFunction } from "express";
import { HttpMethod, Route } from "../route";
import { CreateBalanceOutputDto, CreateBalanceUseCase } from "../../../../../application/usecases/balance/create-balance.usecase";
import { getUserIdFromHeaders } from "../../../../../utils/requestHelpers";
import { Balance } from "@prisma/client";

export type CreateBalanceResponseDto = {
    id: number,
    name: string,
    amount: number
    currency: string,
    created_at: Date
    updated_at: Date
}

export class CreateBalanceRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly createBalanceUseCase: CreateBalanceUseCase
    ){}

    public static create(createBalanceUseCase: CreateBalanceUseCase) {
        return new CreateBalanceRoute(
            "/balance",
            HttpMethod.POST,
            createBalanceUseCase
        )
    }

    public getHandler() {
        return async (request: Request, response: Response, next: NextFunction): Promise<void> => {
            try {
                const user_id = getUserIdFromHeaders(request.headers)
                const { name, currency } = request.body

                const output = await this.createBalanceUseCase.execute({ user_id, name, currency })

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

    private present(input: CreateBalanceOutputDto): CreateBalanceResponseDto {
        const response = {
            id: input.id,
            name: input.name,
            amount: input.amount,
            currency: input.currency,
            created_at: input.created_at,
            updated_at: input.updated_at
        }

        return response
    }
}