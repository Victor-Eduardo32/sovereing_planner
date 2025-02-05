import { Task } from "../../../domain/entities/task";
import { TaskGateway } from "../../../domain/gateway/task.gateway";
import { UseCase } from "../usecase";

export type CreateTaskInputDto = {
    user_id: string,
    task_list_id: number,
    name: string,
    state: number
}

export type CreateTaskOutputDto = {
    id: number,
    task_list_id: number,
    name: string,
    state: number,
    created_at: Date,
    updated_at: Date
}

export class CreateTaskUseCase implements UseCase<CreateTaskInputDto, CreateTaskOutputDto> {
    private constructor(
        private readonly taskGateway: TaskGateway
    ){}

    public static create(taskGateway: TaskGateway) {
        return new CreateTaskUseCase(taskGateway)
    }

    public async execute({ user_id, name, state, task_list_id }: CreateTaskInputDto): Promise<CreateTaskOutputDto> {
        try {
            const created_at = new Date();
            const updated_at = new Date();

            const aTask = Task.create(user_id, task_list_id, name, state, created_at, updated_at);

            const task = await this.taskGateway.save(aTask)

            const output = this.presentOutput(task)

            return output
        } catch (error) {
            console.error(error)
            throw Error('Error on processing CreateTaskUseCase')
        }
    }

    private presentOutput(task: Task): CreateTaskOutputDto {
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