import { CompletedTask } from "../../../domain/entities/completedTask";
import { CompletedTaskGateway } from "../../../domain/gateway/completedTask.gateway";
import { UseCase } from "../usecase";

export type FindAllCompletedTaskInputDto = {
    completed_task_list_ids: number[]
}

export type FindAllCompletedTaskOutputDto = {
    tasks: {
        id: number,
        completed_task_list_id: number,
        name: string
    }[]
}

export class FindAllCompletedTaskUseCase implements UseCase<FindAllCompletedTaskInputDto, FindAllCompletedTaskOutputDto> {
    private constructor(
        private readonly completedTaskGateway: CompletedTaskGateway
    ){}

    public static create(completedTaskGateway: CompletedTaskGateway) {
        return new FindAllCompletedTaskUseCase(completedTaskGateway)
    }

    public async execute({ completed_task_list_ids }: FindAllCompletedTaskInputDto): Promise<FindAllCompletedTaskOutputDto> {
        const completedTasks = await this.completedTaskGateway.findAll(completed_task_list_ids)

        const output = this.presentOutput(completedTasks)

        return output
    }

    private presentOutput(completedTasks: CompletedTask[]) {
        return {
            tasks: completedTasks.map((completedTask) => {
                return {
                    id: completedTask.id!,
                    completed_task_list_id: completedTask.completed_task_list_id,
                    name: completedTask.name
                }
            })
        }
    }
}