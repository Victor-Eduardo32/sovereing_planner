import { Request, Response, NextFunction } from "express";
import { HttpMethod, Route } from "../route";
import { FindExpenseByBalanceIdInputDto, FindExpenseByBalanceIdOutputDto, FindExpenseByBalanceIdUseCase } from "../../../../../application/usecases/expense/find-expense-by-balance-id.usecase";

export type FindExpenseByBalanceIdResponseDto = {
    expenses: {
        id: number,
        balance_id: number,
        description: string, 
        value: string, 
        date: Date,
        created_at: Date
    }[]
}

export class FindExpenseByBalanceIdRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly findExpenseByBalanceIdUseCase: FindExpenseByBalanceIdUseCase
    ){}

    public static create(findExpenseByBalanceIdUseCase: FindExpenseByBalanceIdUseCase) {
        return new FindExpenseByBalanceIdRoute(
            "/expense",
            HttpMethod.GET,
            findExpenseByBalanceIdUseCase
        )
    }

    public getHandler() {
        return async (request: Request, response: Response, next: NextFunction): Promise<void>  =>  {
            try {
                const { balance_id } = request.query

                const input: FindExpenseByBalanceIdInputDto = {
                    balance_id: Number(balance_id)
                }

                const output = await this.findExpenseByBalanceIdUseCase.execute(input)

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

    private present(input: FindExpenseByBalanceIdOutputDto): FindExpenseByBalanceIdResponseDto {
        const response = {
            expenses: input.expenses.map(expense => {
                return {
                    id: expense.id,
                    balance_id: expense.balance_id,
                    description: expense.description, 
                    value: expense.value.toString(), 
                    date: expense.date,
                    created_at: expense.created_at
                }
            })
        }

        return response
    }
}