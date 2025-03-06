import { Balance } from "../../../domain/entities/balance";
import { Currency } from "../../../domain/enums/currency";
import { BalanceGateway } from "../../../domain/gateway/balance.gateway";
import { UseCase } from "../usecase";

export type CreateBalanceInputDto = {
    user_id: string,
    currency: Currency
}

export type CreateBalanceOutputDto = {
    id: number,
    amount: number
    currency: string,
    created_at: Date
    updated_at: Date
}

export class CreateBalanceUseCase implements UseCase<CreateBalanceInputDto, CreateBalanceOutputDto> {
    private constructor(private readonly balanceGateway: BalanceGateway) {}

    public static create(balanceGateway: BalanceGateway) {
        return new CreateBalanceUseCase(balanceGateway)
    }

    public async execute({ user_id, currency }: CreateBalanceInputDto): Promise<CreateBalanceOutputDto> {
        try {
            const aBalance = Balance.create(user_id, currency)

            const balance = await this.balanceGateway.save(aBalance)

            const output = this.presentOutput(balance)

            return output
        } catch (error) {
            console.error(error)
            throw Error('Error on processing CreateBalanceUseCase')
        }
    } 

    private presentOutput(balance: Balance): CreateBalanceOutputDto {
        const output = {
            id: balance.id!,
            amount: balance.amount,
            currency: balance.currency,
            created_at: balance.created_at,
            updated_at: balance.updated_at
        }

        return output
    }
}