import { Expense } from "../../../domain/entities/expense";
import { ExpenseGateway } from "../../../domain/gateway/expense.gateway";
import { UseCase } from "../usecase";

export type CreateExpenseInputDto = {
    balance_id: number,
    description: string, 
    value: bigint, 
    date: Date
}

export type CreateExpenseOutputDto = {
    id: number,
    balance_id: number,
    description: string, 
    value: bigint, 
    date: Date,
    created_at: Date
}

export class CreateExpenseUseCase implements UseCase<CreateExpenseInputDto, CreateExpenseOutputDto> {
    private constructor(private readonly expenseGateway: ExpenseGateway){}

    public static create(expenseGateway: ExpenseGateway) {
        return new CreateExpenseUseCase(expenseGateway)
    }

    public async execute({ balance_id, description, value, date }: CreateExpenseInputDto): Promise<CreateExpenseOutputDto> {
        try {
            const aExpense = Expense.create(balance_id, description, value, date)

            const expense = await this.expenseGateway.save(aExpense)
    
            const output = this.presentOutput(expense)
    
            return output
        } catch (error) {
            console.error(error)
            throw Error('Error on processing CreateExpenseUseCase')  
        }
    }

    private presentOutput(expense: Expense): CreateExpenseOutputDto {
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