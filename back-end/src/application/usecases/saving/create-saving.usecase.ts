import { Saving } from "../../../domain/entities/saving";
import { SavingGateway } from "../../../domain/gateway/saving.gateway";
import { UseCase } from "../usecase";

export type CreateSavingInputDto = {
    balance_id: number,
    description: string, 
    value: bigint, 
    date: Date
}

export type CreateSavingOutputDto = {
    id: number,
    balance_id: number,
    description: string, 
    value: bigint, 
    date: Date,
    created_at: Date
}

export class CreateSavingUseCase implements UseCase<CreateSavingInputDto, CreateSavingOutputDto> {
    private constructor(private readonly savingGateway: SavingGateway){}

    public static create(savingGateway: SavingGateway) {
        return new CreateSavingUseCase(savingGateway)
    }

    public async execute({ balance_id, description, value, date }: CreateSavingInputDto): Promise<CreateSavingOutputDto> {
        try {
            const aSaving = Saving.create(balance_id, description, value, date)

            const saving = await this.savingGateway.save(aSaving)
    
            const output = this.presentOutput(saving)
    
            return output
        } catch (error) {
            console.error(error)
            throw Error('Error on processing CreateSavingUseCase')  
        }
    }

    private presentOutput(saving: Saving): CreateSavingOutputDto {
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