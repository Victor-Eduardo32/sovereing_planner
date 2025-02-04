import { Task } from "../../../domain/entities/task";
import { TaskGateway } from "../../../domain/gateway/task.gateway";
import { UseCase } from "../usecase";

export type UpdateTaskInputDto = {
    id: number,
    task_list_id: number,
    name: string,
    state: number,
    created_at: Date
}

export type UpdateTaskOutputDto = {
    id: number,
    task_list_id: number,
    name: string,
    state: number,
    created_at: Date,
    updated_at: Date
}

export class UpdateTaskUseCase implements UseCase<UpdateTaskInputDto, UpdateTaskOutputDto> {
    private constructor(
        private readonly taskGateway: TaskGateway
    ){}

    public static create(taskGateway: TaskGateway) {
        return new UpdateTaskUseCase(taskGateway)
    }

    public async execute({ id, name, state, task_list_id, created_at }: UpdateTaskInputDto): Promise<UpdateTaskOutputDto> {
        try {
            const updated_at = new Date();

            const aTask = Task.with({ id, task_list_id, name, state, created_at, updated_at });

            const task = await this.taskGateway.update(aTask)

            const output = this.presentOutput(task)

            return output
        } catch (error) {
            console.error(error)
            throw Error('Error on processing UpdateTaskUseCase')
        }
    }

    private presentOutput(task: Task): UpdateTaskOutputDto {
        const output = {
            id: task.id!,
            task_list_id: task.task_list_id,
            name: task.name,
            state: task.state,
            created_at: task.created_at,
            updated_at: task.updated_at
        }

        return output
    }
}