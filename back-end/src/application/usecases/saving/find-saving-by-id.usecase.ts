import { Saving } from "../../../domain/entities/saving";
import { SavingGateway } from "../../../domain/gateway/saving.gateway";
import { UseCase } from "../usecase";

export type FindSavingByIdInputDto = {
    id: number
}

export type FindSavingByIdOutputDto = {
    id: number,
    balance_id: number,
    description: string, 
    value: BigInt, 
    date: Date,
    created_at: Date
}

export class FindSavingByIdUseCase implements UseCase<FindSavingByIdInputDto, FindSavingByIdOutputDto> {
    private constructor(private readonly savingGateway: SavingGateway){}
    
    public static create(savingGateway: SavingGateway) {
        return new FindSavingByIdUseCase(savingGateway)
    }

    public async execute({ id }: FindSavingByIdInputDto): Promise<FindSavingByIdOutputDto> {
        try {
            const saving = await this.savingGateway.findById(id)

            const output = this.presentOutput(saving)
    
            return output
        } catch (error) {
            console.error(error)
            throw Error('Error on processing FindSavingByIdUseCase')  
        }
    }

    private presentOutput(saving: Saving): FindSavingByIdOutputDto {
        const output = {
            id: saving.id!,
            balance_id: saving.balance_id,
            description: saving.description, 
            value: saving.value, 
            date: saving.date,
            created_at: saving.created_at
        }

        return output
    }
}