import { CompletedTask } from "../../../domain/entities/completedTask";
import { CompletedTaskList } from "../../../domain/entities/completedTaskList";
import { CompletedTaskListGateway } from "../../../domain/gateway/completedTaskList.gateway";
import { CreateCompletedTaskUseCase } from "../completed-task/create-completed-task.usecase";
import { UseCase } from "../usecase";

export type CreateCompletedTaskListInputDto = {
    user_id: string,
    title: string,
    description: string,
    completed_tasks: CompletedTask[]
}

export type CreateCompletedTaskListOutputDto = void

export class CreateCompletedTaskListUseCase implements UseCase<CreateCompletedTaskListInputDto, CreateCompletedTaskListOutputDto> {
    private constructor(
        private readonly completedTaskListGateway: CompletedTaskListGateway,
        private readonly createCompletedTaskUseCase: CreateCompletedTaskUseCase
    ){}

    public static create(completedTaskListGateway: CompletedTaskListGateway, createCompletedTaskUseCase: CreateCompletedTaskUseCase) {
        return new CreateCompletedTaskListUseCase(completedTaskListGateway, createCompletedTaskUseCase)
    }

    public async execute({ user_id, title, description, completed_tasks }: CreateCompletedTaskListInputDto): Promise<void> {
        const aCompletedTaskList = CompletedTaskList.create(user_id, title, description)

        const completedTaskList = await this.completedTaskListGateway.save(aCompletedTaskList)

        completed_tasks.map(async (completedTask) => {
            await this.createCompletedTaskUseCase.execute({ completed_task_list_id: completedTaskList.id!, name: completedTask.name  })
        })

        return
    }
}