import { Expense } from "../entities/expense"

export interface ExpenseGateway {
    findById(balance_id: number): Promise<Expense>
    findAllByBalanceId(balance_id: number): Promise<Expense[]>
    save(saving: Expense): Promise<Expense>
    delete(id: number): Promise<void>
}