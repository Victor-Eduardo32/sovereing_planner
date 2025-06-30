import { Request, Response, NextFunction } from "express";
import { HttpMethod, Route } from "../route";
import { UpdateBalanceInputDto, UpdateBalanceOutputDto, UpdateBalanceUseCase } from "../../../../../application/usecases/balance/update-balance.usecase";
import { Currency } from "@prisma/client";
import { CreateExpenseInputDto, CreateExpenseOutputDto, CreateExpenseUseCase } from "../../../../../application/usecases/expense/create-expense.usecase";

export type CreateExpenseResponseDto = {
    expense: {
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

export class CreateExpenseRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly createExpenseUseCase: CreateExpenseUseCase,
        private readonly updateBalanceUseCase: UpdateBalanceUseCase
    ){}

    public static create(createExpenseUseCase: CreateExpenseUseCase, updateBalanceUseCase: UpdateBalanceUseCase) {
        return new CreateExpenseRoute(
            "/expense",
            HttpMethod.POST,
            createExpenseUseCase,
            updateBalanceUseCase
        )
    }

    public getHandler() {
        return async (request: Request, response: Response, next: NextFunction): Promise<void> => {
            try {
                const { balance_id, description, value, date } = request.body

                const inputExpense: CreateExpenseInputDto = {
                    balance_id: balance_id,
                    description: description,
                    value: value,
                    date: date
                }

                const expense = await this.createExpenseUseCase.execute(inputExpense)

                const inputBalance: UpdateBalanceInputDto = {
                    id: expense.balance_id,
                    value: expense.value,
                    type: false
                }

                const balance = await this.updateBalanceUseCase.execute(inputBalance)

                const responseBody = this.present(expense, balance)

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

    private present(inputExpense: CreateExpenseOutputDto, inputBalance: UpdateBalanceOutputDto): CreateExpenseResponseDto {
        const response = {
            expense: {
                id: inputExpense.id,
                balance_id: inputExpense.balance_id,
                description: inputExpense.description, 
                value: inputExpense.value.toString(), 
                date: inputExpense.date,
                created_at: inputExpense.created_at
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