import { PrismaClient } from "@prisma/client";
import { ExpenseGateway } from "../../domain/gateway/expense.gateway";
import { Expense } from "../../domain/entities/expense";

export class ExpenseRepositoryPrisma implements ExpenseGateway {
    private constructor(private readonly prismaClient: PrismaClient){}

    public static create(prismaClient: PrismaClient) {
        return new ExpenseRepositoryPrisma(prismaClient)
    }

    public async findById(id: number): Promise<Expense> {
        try {
            const prismaExpense = await this.prismaClient.expense.findUnique({
                where: { id },
            });

            if (!prismaExpense) {
                throw new Error("Expense not found in balance repository prisma.");
            }

            return this.toDomainEntity(prismaExpense);
        } catch (error) {
            console.error("Error in findById:", error);
            throw new Error("Error on expense repository prisma.");
        }
    }

    public async findAllByBalanceId(balance_id: number): Promise<Expense[]> {
        const prismaExpenses = await this.prismaClient.expense.findMany({
            where: { balance_id }
        })

        return prismaExpenses.map(expense => this.toDomainEntity(expense))
    }

    public async save(expense: Expense): Promise<Expense> {
        try {
            const prismaExpense = await this.prismaClient.expense.create({
                data: this.toPrismaData(expense)
            })
    
            return this.toDomainEntity(prismaExpense)
        } catch (error) {
            console.error("Error in save:", error);
            throw new Error("Error on expense repository prisma.")
        }
    }

    public async delete(id: number): Promise<void> {
        try {
            await this.prismaClient.expense.delete({
                where: { id: id }
            })
        } catch (error) {
            console.error("Error in delete:", error);
            throw new Error("Error on expense repository prisma.")
        }
    }

    private toDomainEntity(prismaExpense: any): Expense {
        return Expense.with({
            id: prismaExpense.id,
            balance_id: prismaExpense.balance_id,
            description: prismaExpense.description,
            value: prismaExpense.value,
            date: prismaExpense.date,
            created_at: prismaExpense.created_at
        })
    }

    private toPrismaData(expense: Expense) {
        return {
            balance_id: expense.balance_id,
            description: expense.description,
            value: expense.value,
            date: expense.date,
            created_at: expense.created_at
        }
    }
}