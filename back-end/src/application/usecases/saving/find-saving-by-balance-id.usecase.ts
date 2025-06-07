import { Saving } from "../../../domain/entities/saving";
import { SavingGateway } from "../../../domain/gateway/saving.gateway";
import { UseCase } from "../usecase";

export type FindSavingByBalanceIdInputDto = {
    balance_id: number
}

export type FindSavingByBalanceIdOutputDto = {
    savings: {
        id: number,
        balance_id: number,
        description: string, 
        value: BigInt, 
        date: Date,
        created_at: Date
    }[]
}

export class FindSavingByBalanceIdUseCase implements UseCase<FindSavingByBalanceIdInputDto, FindSavingByBalanceIdOutputDto> {
    private constructor(private readonly savingGateway: SavingGateway){}
    
    public static create(savingGateway: SavingGateway) {
        return new FindSavingByBalanceIdUseCase(savingGateway)
    }

    public async execute({ balance_id }: FindSavingByBalanceIdInputDto): Promise<FindSavingByBalanceIdOutputDto> {
        try {
            const savings = await this.savingGateway.findAllByBalanceId(balance_id)

            const output = this.presentOutput(savings)
    
            return output
        } catch (error) {
            console.error(error)
            throw Error('Error on processing FindSavingByBalanceIdUseCase')  
        }
    }

    private presentOutput(aSaving: Saving[]): FindSavingByBalanceIdOutputDto {
        return {
            savings: aSaving.map(saving => {
                return {
                    id: saving.id!,
                    balance_id: saving.balance_id,
                    description: saving.description, 
                    value: saving.value, 
                    date: saving.date,
                    created_at: saving.created_at
                }
            })
        }
    }
}