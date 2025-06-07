import { Request, Response, NextFunction } from "express";
import { CreateSavingInputDto, CreateSavingOutputDto, CreateSavingUseCase } from "../../../../../application/usecases/saving/create-saving.usecase";
import { HttpMethod, Route } from "../route";
import { UpdateBalanceInputDto, UpdateBalanceOutputDto, UpdateBalanceUseCase } from "../../../../../application/usecases/balance/update-balance.usecase";
import { Currency } from "@prisma/client";

export type CreateSavingResponseDto = {
    saving: {
        id: number,
        balance_id: number,
        description: string, 
        value: string, 
        date: Date,
        created_at: Date
    }
    balance: {
        id: number,
        name: string,
        amount: string,
        currency: Currency,
        created_at: Date,
        updated_at: Date
    }
}

export class CreateSavingRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly createSavingUseCase: CreateSavingUseCase,
        private readonly updateBalanceUseCase: UpdateBalanceUseCase
    ){}

    public static create(createSavingUseCase: CreateSavingUseCase, updateBalanceUseCase: UpdateBalanceUseCase) {
        return new CreateSavingRoute(
            "/saving",
            HttpMethod.POST,
            createSavingUseCase,
            updateBalanceUseCase
        )
    }

    public getHandler() {
        return async (request: Request, response: Response, next: NextFunction): Promise<void> => {
            try {
                const { balance_id, description, value, date } = request.body

                const inputSaving: CreateSavingInputDto = {
                    balance_id: balance_id,
                    description: description,
                    value: value,
                    date: date
                }

                const saving = await this.createSavingUseCase.execute(inputSaving)

                const inputBalance: UpdateBalanceInputDto = {
                    id: saving.balance_id,
                    value: saving.value,
                    type: true
                }

                const balance = await this.updateBalanceUseCase.execute(inputBalance)

                const responseBody = this.present(saving, balance)

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

    private present(inputSaving: CreateSavingOutputDto, inputBalance: UpdateBalanceOutputDto): CreateSavingResponseDto {
        const response = {
            saving: {
                id: inputSaving.id,
                balance_id: inputSaving.balance_id,
                description: inputSaving.description, 
                value: inputSaving.value.toString(), 
                date: inputSaving.date,
                created_at: inputSaving.created_at
            },
            balance: {
                id: inputBalance.id,
                name: inputBalance.name,
                amount: inputBalance.amount.toString(),
                currency: inputBalance.currency,
                created_at: inputBalance.created_at,
                updated_at: inputBalance.updated_at
            }
        }

        return response
    }
}