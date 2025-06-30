import { Expense } from "../../../domain/entities/expense";
import { ExpenseGateway } from "../../../domain/gateway/expense.gateway";
import { UseCase } from "../usecase";

export type FindExpenseByBalanceIdInputDto = {
    balance_id: number
}

export type FindExpenseByBalanceIdOutputDto = {
    expenses: {
        id: number,
        balance_id: number,
        description: string, 
        value: BigInt, 
        date: Date,
        created_at: Date
    }[]
}

export class FindExpenseByBalanceIdUseCase implements UseCase<FindExpenseByBalanceIdInputDto, FindExpenseByBalanceIdOutputDto> {
    private constructor(private readonly expenseGateway: ExpenseGateway){}
    
    public static create(expenseGateway: ExpenseGateway) {
        return new FindExpenseByBalanceIdUseCase(expenseGateway)
    }

    public async execute({ balance_id }: FindExpenseByBalanceIdInputDto): Promise<FindExpenseByBalanceIdOutputDto> {
        try {
            const expenses = await this.expenseGateway.findAllByBalanceId(balance_id)

            const output = this.presentOutput(expenses)
    
            return output
        } catch (error) {
            console.error(error)
            throw Error('Error on processing FindExpenseByBalanceIdUseCase')  
        }
    }

    private presentOutput(aExpense: Expense[]): FindExpenseByBalanceIdOutputDto {
        return {
            expenses: aExpense.map(expense => {
                return {
                    id: expense.id!,
                    balance_id: expense.balance_id,
                    description: expense.description, 
                    value: expense.value, 
                    date: expense.date,
                    created_at: expense.created_at
                }
            })
        }
    }
}