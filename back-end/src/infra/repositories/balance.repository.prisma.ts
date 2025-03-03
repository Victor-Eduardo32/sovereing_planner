import { PrismaClient } from "@prisma/client";
import { BalanceGateway } from "../../domain/gateway/balance.gateway";
import { Balance } from "../../domain/entities/balance";

export class BalanceRepositoryPrisma implements BalanceGateway{
    private constructor(private readonly prismaClient: PrismaClient){}

    public static create(prismaClient: PrismaClient) {
        return new BalanceRepositoryPrisma(prismaClient)
    }

    public async findById(id: number): Promise<Balance> {
        try {
            const aBalance = await this.prismaClient.balance.findFirst({
                where: {
                    id: id
                }
            })
    
            if(!aBalance) {
                throw new Error("Balance not found in balance repository prisma.")
            }

            const balance = Balance.with({
                id: aBalance.id,
                user_id: aBalance.user_id,
                amount: Number(aBalance.amount),
                currency: aBalance.currency,
                created_at: aBalance.created_at,
                updated_at: aBalance.updated_at
            })

            return balance
        } catch (error) {
            console.error(error);
            throw new Error("Error on balance task repository prisma.")
        }
    }

    public async findAll(user_id: string): Promise<Balance[]> {
        try {
            const aBalances = await this.prismaClient.balance.findMany({
                where: {
                    user_id: user_id
                }
            })

            const balances = aBalances.map(balance => {
                return {
                    id: balance.id,
                    user_id: balance.user_id,
                    amount: Number(balance.amount),
                    currency: balance.currency,
                    created_at: balance.created_at,
                    updated_at: balance.updated_at
                }
            }) as Balance[]

            return balances
        } catch (error) {
            console.error(error);
            throw new Error("Error on balance task repository prisma.")
        }
    }

    public async save(balance: Balance): Promise<Balance> {
        try {
            const data = {
                user_id: balance.user_id,
                amount: balance.amount,
                currency: balance.currency,
                created_at: balance.created_at,
                updated_at: balance.updated_at
            }

            const aBalanceData = await this.prismaClient.balance.create({
                data: data
            })

            const aBalance = Balance.with({
                id: aBalanceData.id,
                user_id: aBalanceData.user_id,
                amount: Number(aBalanceData.amount),
                currency: aBalanceData.currency,
                created_at: aBalanceData.created_at,
                updated_at: aBalanceData.updated_at
            })

            return aBalance
        } catch (error) {
            console.error(error);
            throw new Error("Error on balance task repository prisma.")
        }
    }

    public async update(id: number, amount: number, update_at: Date): Promise<Balance> {
        const aBalance = await this.prismaClient.balance.update({
            where: {
                id: id
            },
            data: {
                amount: amount,
                updated_at: update_at
            }
        })

        const balance = Balance.with({
            id: aBalance.id,
            user_id: aBalance.user_id,
            amount: Number(aBalance.amount),
            currency: aBalance.currency,
            created_at: aBalance.created_at,
            updated_at: aBalance.updated_at
        })

        return balance
    }
}