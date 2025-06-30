import { ExpenseGateway } from "../../../domain/gateway/expense.gateway";
import { UseCase } from "../usecase";

export type DeleteExpenseInputDto = {
    id: number
}

export type DeleteExpenseOutputDto = void

export class DeleteExpenseUseCase implements UseCase<DeleteExpenseInputDto, DeleteExpenseOutputDto> {
    private constructor(private readonly expenseGateway: ExpenseGateway){}

    public static create(expenseGateway: ExpenseGateway) {
        return new DeleteExpenseUseCase(expenseGateway)
    }

    public async execute({ id }: DeleteExpenseInputDto): Promise<void> {
        try {
            await this.expenseGateway.delete(id)
        } catch (error) {
            console.error(error)
            throw Error('Error on processing DeleteExpenseUseCase')  
        }
    }
}