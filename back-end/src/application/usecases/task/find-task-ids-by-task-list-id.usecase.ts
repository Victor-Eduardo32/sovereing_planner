import { TaskGateway } from "../../../domain/gateway/task.gateway";
import { UseCase } from "../usecase";

export type FindTaskIdsByTaskListIdInputDto = {
    task_list_id: number
}

export type FindTaskIdsByTaskListIdOutputDto = {
    ids: number[]
}

export class FindTaskIdsByTaskListIdUseCase implements UseCase<FindTaskIdsByTaskListIdInputDto, FindTaskIdsByTaskListIdOutputDto> {
    private constructor(
        private readonly taskGateway: TaskGateway
    ){}

    public static create(taskGateway: TaskGateway) {
        return new FindTaskIdsByTaskListIdUseCase(taskGateway)
    }

    public async execute({ task_list_id }: FindTaskIdsByTaskListIdInputDto): Promise<FindTaskIdsByTaskListIdOutputDto> {
        const taskIds = await this.taskGateway.findTaskIdsByTaskListId(task_list_id)

        const output = this.presentOutput(taskIds) 

        return output
    }

    private presentOutput(taskIds: number[]): FindTaskIdsByTaskListIdOutputDto {
        return {
            ids: taskIds.map(taskId => {
                return taskId
            })
        }
    }
}