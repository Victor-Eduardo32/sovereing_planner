import { PrismaClient } from "@prisma/client";
import { BalanceGateway } from "../../domain/gateway/balance.gateway";
import { Balance } from "../../domain/entities/balance";
import { Currency } from "../../domain/enums/currency";

export class BalanceRepositoryPrisma implements BalanceGateway {
    private constructor(private readonly prismaClient: PrismaClient) {}

    public static create(prismaClient: PrismaClient): BalanceRepositoryPrisma {
        return new BalanceRepositoryPrisma(prismaClient);
    }

    public async findById(id: number): Promise<Balance> {
        try {
            const prismaBalance = await this.prismaClient.balance.findUnique({
                where: { id },
            });

            if (!prismaBalance) {
                throw new Error("Balance not found in balance repository prisma.");
            }

            return this.toDomainEntity(prismaBalance);
        } catch (error) {
            console.error("Error in findById:", error);
            throw new Error("Error on balance repository prisma.");
        }
    }

    public async findAll(user_id: string): Promise<Balance[]> {
        try {
            const prismaBalances = await this.prismaClient.balance.findMany({
                where: { user_id },
            });

            return prismaBalances.map((balance) => this.toDomainEntity(balance));
        } catch (error) {
            console.error("Error in findAll:", error);
            throw new Error("Error on balance repository prisma.");
        }
    }

    public async save(balance: Balance): Promise<Balance> {
        try {
            const prismaBalance = await this.prismaClient.balance.create({
                data: this.toPrismaData(balance),
            });

            return this.toDomainEntity(prismaBalance);
        } catch (error) {
            console.error("Error in save:", error);
            throw new Error("Error on balance repository prisma.");
        }
    }

    public async update(id: number, amount: number, updated_at: Date): Promise<Balance> {
        try {
            const prismaBalance = await this.prismaClient.balance.update({
                where: { id },
                data: { amount, updated_at },
            });

            return this.toDomainEntity(prismaBalance);
        } catch (error) {
            console.error("Error in update:", error);
            throw new Error("Error on balance repository prisma.");
        }
    }

    public async delete(id: number): Promise<void> {
        try {
            await this.prismaClient.balance.delete({
                where: { id: id }
            })
        } catch (error) {
            console.error("Error in delete:", error);
            throw new Error("Error on balance task repository prisma.");
        }
    }

    private toDomainEntity(prismaBalance: any): Balance {
        return Balance.with({
            id: prismaBalance.id,
            user_id: prismaBalance.user_id,
            name: prismaBalance.name,
            amount: Number(prismaBalance.amount),
            currency: prismaBalance.currency as Currency,
            created_at: prismaBalance.created_at,
            updated_at: prismaBalance.updated_at,
        });
    }

    private toPrismaData(balance: Balance): any {
        return {
            user_id: balance.user_id,
            name: balance.name,
            amount: balance.amount,
            currency: balance.currency,
            created_at: balance.created_at,
            updated_at: balance.updated_at,
        };
    }
}