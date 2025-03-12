import { Balance } from "../../../domain/entities/balance";
import { BalanceGateway } from "../../../domain/gateway/balance.gateway";
import { UseCase } from "../usecase";

export type FindAllBalanceInputDto = {
    user_id: string
}

export type FindAllBalanceOutputDto = {
    balances: {
        id: number,
        name: string,
        amount: number
        currency: string,
        created_at: Date
        updated_at: Date
    }[]
}

export class FindAllBalanceUseCase implements UseCase<FindAllBalanceInputDto, FindAllBalanceOutputDto> {
    private constructor(private readonly balanceGateway: BalanceGateway){}

    public static create(balanceGateway: BalanceGateway) {
        return new FindAllBalanceUseCase(balanceGateway)
    }

    public async execute({ user_id }: FindAllBalanceInputDto): Promise<FindAllBalanceOutputDto> {
        try {
            const balances = await this.balanceGateway.findAll(user_id)

            const output = this.presentOutput(balances)

            return output
        } catch (error) {
            console.error(error)
            throw Error('Error on processing FindAllBalanceUseCase')  
        }
    }

    private presentOutput(balances: Balance[]): FindAllBalanceOutputDto {
        return {
            balances: balances.map(balance => {
                return {
                    id: balance.id!,
                    name: balance.name,
                    amount: balance.amount,
                    currency: balance.currency,
                    created_at: balance.created_at,
                    updated_at: balance.updated_at
                }
            })
        }
    }
}