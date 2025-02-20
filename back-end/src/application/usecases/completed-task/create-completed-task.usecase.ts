import { CompletedTask } from "../../../domain/entities/completedTask";
import { CompletedTaskGateway } from "../../../domain/gateway/completedTask.gateway";
import { UseCase } from "../usecase";

export type CreateCompletedTaskInputDto = {
    completed_task_list_id: number,
    name: string
}

export type CreateCompletedTaskOutputDto = void

export class CreateCompletedTaskUseCase implements UseCase<CreateCompletedTaskInputDto, CreateCompletedTaskOutputDto> {
    private constructor(
        private readonly completedTaskGateway: CompletedTaskGateway
    ){}

    public static create(completedTaskGateway: CompletedTaskGateway) {
        return new CreateCompletedTaskUseCase(completedTaskGateway)
    }

    public async execute({ completed_task_list_id, name }: CreateCompletedTaskInputDto): Promise<CreateCompletedTaskOutputDto> {
        const completedTask = CompletedTask.create(completed_task_list_id, name)

        await this.completedTaskGateway.save(completedTask)

        return 
    }
}