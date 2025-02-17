import { Task } from "../../../domain/entities/task"
import { TaskList } from "../../../domain/entities/taskList"
import { TaskListGateway } from "../../../domain/gateway/taskList.gateway"
import { TaskProps } from "../../../domain/types/taskProps"
import { FindAllTaskUseCase } from "../task/find-all-task.usecase"
import { UseCase } from "../usecase"

export type FindAllTaskListInputDto = {
    user_id: string
}

export type FindAllTaskListOuputDto = {
    taskLists: {
        id: number,
        title: string,
        description: string,
        priority_level: number,
        created_at: Date,
        updated_at: Date
        tasks: TaskProps[]
    }[]
}

export class FindAllTaskListUseCase implements UseCase<FindAllTaskListInputDto, FindAllTaskListOuputDto> {
    private constructor(
        private readonly taskListGateway: TaskListGateway,
        private readonly findAllTaskUseCase: FindAllTaskUseCase
    ){}

    public static create(taskListGateway: TaskListGateway, findAllTaskUseCase: FindAllTaskUseCase) {
        return new FindAllTaskListUseCase(taskListGateway, findAllTaskUseCase)
    }

    public async execute({ user_id }: FindAllTaskListInputDto): Promise<FindAllTaskListOuputDto> {
        const aTaskLists = await this.taskListGateway.findAll(user_id)
        const tasksOutput = await this.findAllTaskUseCase.execute({ user_id })
        const tasks = tasksOutput.tasks as Task[]

        const output = this.presentOutput(aTaskLists, tasks)

        return output
    }

    private presentOutput(aTaskLists: TaskList[], aTasks: Task[]): FindAllTaskListOuputDto {
        return {      
            taskLists: aTaskLists.map((taskList) => {
                return {
                    id: taskList.id!,
                    title: taskList.title,
                    description: taskList.description,
                    priority_level: taskList.priority_level,
                    created_at: taskList.created_at,
                    updated_at: taskList.updated_at,
                    tasks: aTasks.filter((task) => task.task_list_id === taskList.id)
                }
            })
        }
    }
}