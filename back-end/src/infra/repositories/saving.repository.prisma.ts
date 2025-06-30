import { PrismaClient } from "@prisma/client";
import { SavingGateway } from "../../domain/gateway/saving.gateway";
import { Saving } from "../../domain/entities/saving";

export class SavingRepositoryPrisma implements SavingGateway {
    private constructor(private readonly prismaClient: PrismaClient){}

    public static create(prismaClient: PrismaClient) {
        return new SavingRepositoryPrisma(prismaClient)
    }

    public async findById(id: number): Promise<Saving> {
        try {
            const prismaSaving = await this.prismaClient.saving.findUnique({
                where: { id },
            });

            if (!prismaSaving) {
                throw new Error("Saving not found in balance repository prisma.");
            }

            return this.toDomainEntity(prismaSaving);
        } catch (error) {
            console.error("Error in findById:", error);
            throw new Error("Error on saving repository prisma.");
        }
    }

    public async findAllByBalanceId(balance_id: number): Promise<Saving[]> {
        const prismaSavings = await this.prismaClient.saving.findMany({
            where: { balance_id }
        })

        return prismaSavings.map(saving => this.toDomainEntity(saving))
    }

    public async save(saving: Saving): Promise<Saving> {
        try {
            const prismaSaving = await this.prismaClient.saving.create({
                data: this.toPrismaData(saving)
            })
    
            return this.toDomainEntity(prismaSaving)
        } catch (error) {
            console.error("Error in save:", error);
            throw new Error("Error on saving repository prisma.")
        }
    }

    public async delete(id: number): Promise<void> {
        try {
            await this.prismaClient.saving.delete({
                where: { id: id }
            })
        } catch (error) {
            console.error("Error in delete:", error);
            throw new Error("Error on saving repository prisma.")
        }
    }

    private toDomainEntity(prismaSaving: any): Saving {
        return Saving.with({
            id: prismaSaving.id,
            balance_id: prismaSaving.balance_id,
            description: prismaSaving.description,
            value: prismaSaving.value,
            date: prismaSaving.date,
            created_at: prismaSaving.created_at
        })
    }

    private toPrismaData(saving: Saving) {
        return {
            balance_id: saving.balance_id,
            description: saving.description,
            value: saving.value,
            date: saving.date,
            created_at: saving.created_at
        }
    }
}