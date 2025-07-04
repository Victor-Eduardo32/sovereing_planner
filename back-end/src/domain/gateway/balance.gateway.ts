import { Balance } from "../entities/balance"

export interface BalanceGateway {
    findById(id: number): Promise<Balance>
    findAll(user_id: string): Promise<Balance[]>
    save(balance: Balance): Promise<Balance>
    update(id: number, amount: bigint, update_at: Date): Promise<Balance>
    delete(id: number): Promise<void>
}