import { Task } from "../../../domain/entities/task";
import { TaskGateway } from "../../../domain/gateway/task.gateway";
import { UseCase } from "../usecase";

export type UpdateTaskStateInputDto = {
    id: number,
    actionState: boolean,
    state: number
}

export type UpdateTaskStateOutputDto = {
    id: number,
    task_list_id: number,
    name: string,
    state: number,
    created_at: Date,
    updated_at: Date
}

export class UpdateTaskStateUseCase implements UseCase<UpdateTaskStateInputDto, UpdateTaskStateOutputDto> {
    private constructor(
        private readonly taskGateway: TaskGateway
    ){}

    public static create(taskGateway: TaskGateway) {
        return new UpdateTaskStateUseCase(taskGateway)
    }

    public async execute({ id, actionState, state }: UpdateTaskStateInputDto): Promise<UpdateTaskStateOutputDto> {
        try {
            const updated_at = new Date()

            state = actionState ? state + 1 : state

            const task = await this.taskGateway.updateState(id, state, updated_at)

            const output = this.presentOutput(task)

            return output
        } catch (error) {
            console.error(error)
            throw new Error('Error on processing UpdateTaskStateUseCase')
        }
    }

    private presentOutput(input: Task): UpdateTaskStateOutputDto {
        const output = {
            id: input.id!,
            task_list_id: input.task_list_id,
            name: input.name,
            state: input.state,
            created_at: input.created_at,
            updated_at: input.updated_at
        }

        return output
    }
}