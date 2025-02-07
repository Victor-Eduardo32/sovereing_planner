import { Task } from "../../../domain/entities/task";
import { TaskGateway } from "../../../domain/gateway/task.gateway";
import { UseCase } from "../usecase";

export type FindAllTaskInputDto = {
    user_id: string
}

export type FindAllTaskOutputDto = {
    tasks: {
        id: number,
        user_id: string,
        task_list_id: number,
        name: string,
        state: number,
        created_at: Date,
        updated_at: Date
    }[]
}

export class FindAllTaskUseCase implements UseCase<FindAllTaskInputDto, FindAllTaskOutputDto> {
    private constructor(    
        private readonly taskGateway: TaskGateway
    ){}

    public static create(taskGateway: TaskGateway) {
        return new FindAllTaskUseCase(taskGateway)
    }

    public async execute({ user_id }: FindAllTaskInputDto): Promise<FindAllTaskOutputDto> {
        const tasks = await this.taskGateway.findAll(user_id)

        const output = this.presentOutput(tasks)

        return output
    }

    private presentOutput(tasks: Task[]): FindAllTaskOutputDto {
        return {
            tasks: tasks.map((task) => {
                return {
                    id: task.id!,
                    user_id: task.user_id,
                    task_list_id: task.task_list_id,
                    name: task.name,
                    state: task.state,
                    created_at: task.created_at,
                    updated_at: task.updated_at
                }
            })
        }
    }
}