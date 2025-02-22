import { CompletedTask } from "../../../domain/entities/completedTask"
import { CompletedTaskList } from "../../../domain/entities/completedTaskList"
import { CompletedTaskListGateway } from "../../../domain/gateway/completedTaskList.gateway"
import { FindAllCompletedTaskUseCase } from "../completed-task/find-all-completed-task.usecase"
import { UseCase } from "../usecase"

export type FindAllCompletedTaskListInputDto = {
    user_id: string
}

export type FindAllCompletedTaskListOuputDto = {
    completedTaskLists: {
        id: number,
        title: string,
        description: string,
        ended_at: Date,
        completed_tasks: CompletedTask[]
    }[]
}

export class FindAllCompletedTaskListUseCase implements UseCase<FindAllCompletedTaskListInputDto, FindAllCompletedTaskListOuputDto> {
    private constructor(
        private readonly completedTaskListGateway: CompletedTaskListGateway,
        private readonly findAllCompletedTaskUseCase: FindAllCompletedTaskUseCase
    ){}

    public static create(completedTaskListGateway: CompletedTaskListGateway, findAllCompletedTaskUseCase: FindAllCompletedTaskUseCase) {
        return new FindAllCompletedTaskListUseCase(completedTaskListGateway, findAllCompletedTaskUseCase)
    }

    public async execute({ user_id }: FindAllCompletedTaskListInputDto): Promise<FindAllCompletedTaskListOuputDto> {
        try {
            const aCompletedTaskLists = await this.completedTaskListGateway.findAll(user_id)

            const completedTaskListIds = aCompletedTaskLists.map(completedTaskList => {
                return completedTaskList.id!
            })

            const completedTasksOutput = await this.findAllCompletedTaskUseCase.execute({ completed_task_list_ids: completedTaskListIds })
            const completedTasks = completedTasksOutput.tasks as CompletedTask[]

            const output = this.presentOutput(aCompletedTaskLists, completedTasks)

            return output
        } catch (error) {
            console.error(error)
            throw Error('Error on processing FindAllCompletedTaskListUseCase')
        }
    }

    private presentOutput(aCompletedTaskLists: CompletedTaskList[], aCompletedTasks: CompletedTask[]): FindAllCompletedTaskListOuputDto {
        return {      
            completedTaskLists: aCompletedTaskLists.map((completedTaskList) => {
                return {
                    id: completedTaskList.id!,
                    title: completedTaskList.title,
                    description: completedTaskList.description,
                    ended_at: completedTaskList.ended_at,
                    completed_tasks: aCompletedTasks.filter((completedTask) => completedTask.completed_task_list_id === completedTaskList.id)
                }
            })
        }
    }
}