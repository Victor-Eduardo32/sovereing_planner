import { TaskGateway } from "../../../domain/gateway/task.gateway";
import { UseCase } from "../usecase";

export type DeleteTaskInputDto = {
    id: number
}

export type DeleteTaskOutputDto = void

export class DeleteTaskUseCase implements UseCase<DeleteTaskInputDto, DeleteTaskOutputDto> {
    private constructor(
        private readonly taskGateway: TaskGateway
    ){}

    public static create(taskGateway: TaskGateway) {
        return new DeleteTaskUseCase(taskGateway)
    }

    public async execute({ id }: DeleteTaskInputDto): Promise<void> {
        try {
            await this.taskGateway.delete(id)

            return 
        } catch (error) {
            console.error(error)
            throw Error('Error on processing DeleteTaskUseCase')
        }
    }
}