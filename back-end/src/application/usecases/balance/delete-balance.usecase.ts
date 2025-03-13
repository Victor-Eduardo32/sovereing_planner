import { BalanceGateway } from "../../../domain/gateway/balance.gateway";
import { UseCase } from "../usecase";

export type DeleteBalanceInputDto = {
    id: number
}

export type DeleteBalanceOutputDto = void

export class DeleteBalanceUseCase implements UseCase<DeleteBalanceInputDto, DeleteBalanceOutputDto> {
    private constructor(private readonly balancegateway: BalanceGateway){}

    public static create(balancegateway: BalanceGateway) {
        return new DeleteBalanceUseCase(balancegateway)
    }

    public async execute({ id }: DeleteBalanceInputDto): Promise<void> {
        try {
            await this.balancegateway.delete(id)
        } catch (error) {
            console.error(error)
            throw Error('Error on processing DeleteBalanceUseCase')  
        }
    }
}