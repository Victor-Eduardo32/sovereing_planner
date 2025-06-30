import { Request, Response, NextFunction } from "express";
import { HttpMethod, Route } from "../route";
import { DeleteExpenseInputDto, DeleteExpenseUseCase } from "../../../../../application/usecases/expense/delete-expense.usecase";
import { UpdateBalanceInputDto, UpdateBalanceUseCase } from "../../../../../application/usecases/balance/update-balance.usecase";
import { FindExpenseByIdUseCase } from "../../../../../application/usecases/expense/find-expense-by-id.usecase";

export class DeleteExpenseRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly deleteExpenseUseCase: DeleteExpenseUseCase,
        private readonly findExpenseByIdUseCase: FindExpenseByIdUseCase,
        private readonly updateBalanceUseCase: UpdateBalanceUseCase
    ){}

    public static create(deleteExpenseUseCase: DeleteExpenseUseCase, findExpenseByIdUseCase: FindExpenseByIdUseCase, updateBalanceUseCase: UpdateBalanceUseCase) {
        return new DeleteExpenseRoute(
            '/expense',
            HttpMethod.DELETE,
            deleteExpenseUseCase,
            findExpenseByIdUseCase,
            updateBalanceUseCase
        )
    }

    public getHandler() {
        return async (request: Request, response: Response, next: NextFunction): Promise<void> => {
            try {
                const { id } = request.body

                const input: DeleteExpenseInputDto = {
                    id: id
                }

                const expense = await this.findExpenseByIdUseCase.execute({ id });

                const inputBalance: UpdateBalanceInputDto = {
                    id: expense.balance_id,
                    value: expense.value as bigint,
                    type: true
                }

                await this.updateBalanceUseCase.execute(inputBalance)

                await this.deleteExpenseUseCase.execute(input)

                response.status(200).send('Expense deleted successfully!')
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