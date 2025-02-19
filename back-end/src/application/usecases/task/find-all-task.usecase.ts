import { Task } from "../../../domain/entities/task";
import { TaskGateway } from "../../../domain/gateway/task.gateway";
import { UseCase } from "../usecase";

export type FindAllTaskInputDto = {
    task_list_ids: number[]
}

export type FindAllTaskOutputDto = {
    tasks: {
        id: number,
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

    public async execute({ task_list_ids }: FindAllTaskInputDto): Promise<FindAllTaskOutputDto> {
        try {
            const tasks = await this.taskGateway.findAll(task_list_ids)

            const output = this.presentOutput(tasks)

            return output
        } catch (error) {
            console.error(error)
            throw Error('Error on processing FindAllTaskUseCase')
        }
    }

    private presentOutput(tasks: Task[]): FindAllTaskOutputDto {
        return {
            tasks: tasks.map((task) => {
                return {
                    id: task.id!,
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