import { Task } from "../../../domain/entities/task";
import { TaskList } from "../../../domain/entities/taskList";
import { TaskListGateway } from "../../../domain/gateway/taskList.gateway";
import { CreateTaskUseCase } from "../task/create-task.usecase";
import { DeleteTaskUseCase } from "../task/delete-task.usecase";
import { FindTaskIdsByTaskListIdUseCase } from "../task/find-task-ids-by-task-list-id.usecase";
import { UseCase } from "../usecase";

export type UpdateTaskListInputDto = {
    id: number,
    user_id: string,
    title: string,
    description: string,
    priority_level: number,
    created_at: Date,
    tasks: Task[]
}

export type UpdateTaskListOutputDto = {
    id: number,
    title: string,
    description: string,
    priority_level: number,
    created_at: Date,
    updated_at: Date
    tasks: Task[]
}

export class UpdateTaskListUseCase implements UseCase<UpdateTaskListInputDto, UpdateTaskListOutputDto> {
    private constructor(
        private readonly taskListGateway: TaskListGateway,
        private readonly createTaskUseCase: CreateTaskUseCase,
        private readonly findTaskIdsByTaskListIdUseCase: FindTaskIdsByTaskListIdUseCase,
        private readonly deleteTaskUseCase: DeleteTaskUseCase
    ){}

    public static create(taskListGateway: TaskListGateway, createTaskUseCase: CreateTaskUseCase, findTaskIdsByTaskListIdUseCase: FindTaskIdsByTaskListIdUseCase, deleteTaskUseCase: DeleteTaskUseCase) {
        return new UpdateTaskListUseCase(taskListGateway, createTaskUseCase, findTaskIdsByTaskListIdUseCase, deleteTaskUseCase)
    }

    public async execute({ id, user_id, title, description, priority_level, tasks, created_at }: UpdateTaskListInputDto): Promise<UpdateTaskListOutputDto> {
        try {
            const updated_at = new Date()

            const aTaskList = TaskList.with({ id, user_id, title, description, priority_level, created_at, updated_at })

            const taskList = await this.taskListGateway.update(aTaskList)

            const { ids: existingTaskIds  } = await this.findTaskIdsByTaskListIdUseCase.execute({ task_list_id: id })

            const tasksPromises = tasks.map(async (task) => {
                if(!task.id) {
                    return await this.createTaskUseCase.execute({
                        user_id: user_id,
                        name: task.name,
                        state: task.state,
                        task_list_id: taskList.id!,
                    }) as Task
                }

                return task
            })

            const aTasks = await Promise.all(tasksPromises)

            const receivedTaskIds = aTasks.map(task => task.id)
            const tasksToDelete = existingTaskIds.filter(id => !receivedTaskIds.includes(id))

            const deleteTasksPromises = tasksToDelete.map(async (taskId) => {
                await this.deleteTaskUseCase.execute({ id: taskId });
            });

            await Promise.all(deleteTasksPromises);
            
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
            priority_level: taskList.priority_level,
            created_at: taskList.created_at,
            updated_at: taskList.updated_at,
            tasks: tasks
        }

        return output
    }
}