import { Balance } from "../../../domain/entities/balance";
import { Currency } from "../../../domain/enums/currency";
import { BalanceGateway } from "../../../domain/gateway/balance.gateway";
import { UseCase } from "../usecase";
import { FindBalanceByIdUseCase } from "./find-balance-by-id.usecase";

export type UpdateBalanceInputDto = {
    id: number,
    value: bigint,
    type: boolean
}

export type UpdateBalanceOutputDto = {
    id: number,
    name: string,
    amount: bigint,
    currency: Currency,
    created_at: Date,
    updated_at: Date
}

export class UpdateBalanceUseCase implements UseCase<UpdateBalanceInputDto, UpdateBalanceOutputDto> {
    private constructor(
        private readonly balanceGateway: BalanceGateway,
        private readonly findBalanceByIdUseCase: FindBalanceByIdUseCase
    ) {}

    public static create(balanceGateway: BalanceGateway, findBalanceByIdUseCase: FindBalanceByIdUseCase) {
        return new UpdateBalanceUseCase(balanceGateway, findBalanceByIdUseCase)
    }

    public async execute({ id, value, type }: UpdateBalanceInputDto): Promise<UpdateBalanceOutputDto> {
        try {
            const update_at = new Date()

            const aBalance = await this.findBalanceByIdUseCase.execute({ id })

            const newBalanceAmount = type ? aBalance.amount + value : aBalance.amount - value

            const balance = await this.balanceGateway.update(id, newBalanceAmount, update_at)

            const output = this.presentOutput(balance)

            return output
        } catch (error) {
            console.error(error)
            throw Error('Error on processing UpdateBalanceUseCase')
        }     
    }

    private presentOutput(balance: Balance): UpdateBalanceOutputDto {
        const output = {
            id: balance.id!,
            name: balance.name,
            amount: balance.amount,
            currency: balance.currency,
            created_at: balance.created_at,
            updated_at: balance.updated_at
        }

        return output
    }
}