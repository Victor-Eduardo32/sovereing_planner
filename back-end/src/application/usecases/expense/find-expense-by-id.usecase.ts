import { Expense } from "../../../domain/entities/expense";
import { ExpenseGateway } from "../../../domain/gateway/expense.gateway";
import { UseCase } from "../usecase";

export type FindExpenseByIdInputDto = {
    id: number
}

export type FindExpenseByIdOutputDto = {
    id: number,
    balance_id: number,
    description: string, 
    value: BigInt, 
    date: Date,
    created_at: Date
}

export class FindExpenseByIdUseCase implements UseCase<FindExpenseByIdInputDto, FindExpenseByIdOutputDto> {
    private constructor(private readonly expenseGateway: ExpenseGateway){}
    
    public static create(expenseGateway: ExpenseGateway) {
        return new FindExpenseByIdUseCase(expenseGateway)
    }

    public async execute({ id }: FindExpenseByIdInputDto): Promise<FindExpenseByIdOutputDto> {
        try {
            const expense = await this.expenseGateway.findById(id)

            const output = this.presentOutput(expense)
    
            return output
        } catch (error) {
            console.error(error)
            throw Error('Error on processing FindExpenseByIdUseCase')  
        }
    }

    private presentOutput(expense: Expense): FindExpenseByIdOutputDto {
        const output = {
            id: expense.id!,
            balance_id: expense.balance_id,
            description: expense.description, 
            value: expense.value, 
            date: expense.date,
            created_at: expense.created_at
        }

        return output
    }
}