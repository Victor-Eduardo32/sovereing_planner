import { Task } from "../../../domain/entities/task";
import { TaskList } from "../../../domain/entities/taskList";
import { TaskListGateway } from "../../../domain/gateway/taskList.gateway";
import { CreateTaskUseCase } from "../task/create-task.usecase";
import { UseCase } from "../usecase";

export type CreateTaskListInputDto = {
    title: string,
    description: string,
    tasks: Task[]
}

export type CreateTaskListOutputDto = {
    id: number,
    title: string,
    description: string,
    created_at: Date,
    updated_at: Date
    tasks: Task[]
}

export class CreateTaskListUseCase implements UseCase<CreateTaskListInputDto, CreateTaskListOutputDto> {
    private constructor(
        private readonly taskListGateway: TaskListGateway,
        private readonly createTaskUseCase: CreateTaskUseCase
    ){}

    public static create(taskListGateway: TaskListGateway, createTaskUseCase: CreateTaskUseCase) {
        return new CreateTaskListUseCase(taskListGateway, createTaskUseCase)
    }

    public async execute({ title, description, tasks }: CreateTaskListInputDto): Promise<CreateTaskListOutputDto> {
        try {
            const created_at = new Date();
            const updated_at = new Date();

            const aTaskList = TaskList.create(title, description, created_at, updated_at)

            const taskList = await this.taskListGateway.save(aTaskList)

            const tasksPromises = tasks.map(async (task) => {
                return await this.createTaskUseCase.execute({
                    name: task.name,
                    state: task.state,
                    task_list_id: taskList.id!
                }) as Task
            })

            const aTasks = await Promise.all(tasksPromises)
            
            const output = this.presentOutput(taskList, aTasks)

            return output
        } catch (error) {
            console.error(error)
            throw Error('Error on processing CreateTaskListUseCase')
        }
        
    }

    private presentOutput(taskList: TaskList, tasks: Task[]): CreateTaskListOutputDto {
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