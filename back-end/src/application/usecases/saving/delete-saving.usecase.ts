import { SavingGateway } from "../../../domain/gateway/saving.gateway";
import { UseCase } from "../usecase";

export type DeleteSavingInputDto = {
    id: number
}

export type DeleteSavingOutputDto = void

export class DeleteSavingUseCase implements UseCase<DeleteSavingInputDto, DeleteSavingOutputDto> {
    private constructor(private readonly savingGateway: SavingGateway){}

    public static create(savingGateway: SavingGateway) {
        return new DeleteSavingUseCase(savingGateway)
    }

    public async execute({ id }: DeleteSavingInputDto): Promise<void> {
        try {
            await this.savingGateway.delete(id)
        } catch (error) {
            console.error(error)
            throw Error('Error on processing DeleteSavingUseCase')  
        }
    }
}