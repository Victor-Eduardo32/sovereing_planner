import { Saving } from "../entities/saving"

export interface SavingGateway {
    findById(id: number): Promise<Saving>
    findAllByBalanceId(balance_id: number): Promise<Saving[]>
    save(saving: Saving): Promise<Saving>
    delete(id: number): Promise<void>
}