import { Balance } from "../../../domain/entities/balance";
import { BalanceGateway } from "../../../domain/gateway/balance.gateway";
import { UseCase } from "../usecase";

export type FindBalanceByIdInputDto = {
    id: number
}

export type FindBalanceByIdOutputDto = {
    id: number,
    name: string,
    amount: bigint
    currency: string,
    created_at: Date
    updated_at: Date
}

export class FindBalanceByIdUseCase implements UseCase<FindBalanceByIdInputDto, FindBalanceByIdOutputDto> {
    private constructor(private readonly balanceGateway: BalanceGateway){}

    public static create(balanceGateway: BalanceGateway) {
        return new FindBalanceByIdUseCase(balanceGateway)
    }

    public async execute({ id }: FindBalanceByIdInputDto): Promise<FindBalanceByIdOutputDto> {
        try {
            const balance = await this.balanceGateway.findById(id)

            const output = this.presentOutput(balance)

            return output
        } catch (error) {
            console.error(error)
            throw Error('Error on processing FindBalanceByIdUseCase')           
        }
    }

    private presentOutput(balance: Balance): FindBalanceByIdOutputDto {
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