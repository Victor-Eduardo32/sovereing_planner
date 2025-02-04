import { Task } from "../../../domain/entities/task";
import { TaskList } from "../../../domain/entities/taskList";
import { TaskListGateway } from "../../../domain/gateway/taskList.gateway";
import { UpdateTaskUseCase } from "../task/update-task.usecase";
import { UseCase } from "../usecase";

export type UpdateTaskListInputDto = {
    id: number,
    title: string,
    description: string,
    created_at: Date,
    tasks: Task[]
}

export type UpdateTaskListOutputDto = {
    id: number,
    title: string,
    description: string,
    created_at: Date,
    updated_at: Date
    tasks: Task[]
}

export class UpdateTaskListUseCase implements UseCase<UpdateTaskListInputDto, UpdateTaskListOutputDto> {
    private constructor(
        private readonly taskListGateway: TaskListGateway,
        private readonly updateTaskUseCase: UpdateTaskUseCase
    ){}

    public static create(taskListGateway: TaskListGateway, updateTaskUseCase: UpdateTaskUseCase) {
        return new UpdateTaskListUseCase(taskListGateway, updateTaskUseCase)
    }

    public async execute({ id, title, description, tasks, created_at }: UpdateTaskListInputDto): Promise<UpdateTaskListOutputDto> {
        try {
            const updated_at = new Date()

            const aTaskList = TaskList.with({ id, title, description, created_at, updated_at })

            const taskList = await this.taskListGateway.update(aTaskList)

            const tasksPromises = tasks.map(async (task) => {
                return await this.updateTaskUseCase.execute({
                    id: task.id!,
                    name: task.name,
                    state: task.state,
                    task_list_id: taskList.id!,
                    created_at: task.created_at
                }) as Task
            })

            const aTasks = await Promise.all(tasksPromises)
            
            const output = this.presentOutput(taskList, aTasks)

            return output
        } catch (error) {
            console.error(error)
            throw Error('Error on processing UpdateTaskListUseCase')
        }
        
    }

    private presentOutput(taskList: TaskList, tasks: Task[]): UpdateTaskListOutputDto {
        const output = {
            id: taskList.id!,
            title: taskList.title,
            description: taskList.description,
            created_at: taskList.created_at,
            updated_at: taskList.updated_at,
            tasks: tasks
        }

        return output
    }
}