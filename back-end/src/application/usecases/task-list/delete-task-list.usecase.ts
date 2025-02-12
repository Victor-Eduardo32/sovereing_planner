import { TaskListGateway } from "../../../domain/gateway/taskList.gateway";
import { UseCase } from "../usecase";

export type DeleteTaskListInputDto = {
    id: number
}

export type DeleteTaskListOutputDto = void

export class DeleteTaskListUseCase implements UseCase<DeleteTaskListInputDto, DeleteTaskListOutputDto> {
    private constructor(
        private readonly taskListGateway: TaskListGateway
    ){}

    public static create(taskListGateway: TaskListGateway) {
        return new DeleteTaskListUseCase(taskListGateway)
    }

    public async execute({ id }: DeleteTaskListInputDto): Promise<void> {
        try {
            await this.taskListGateway.delete(id)

            return
        } catch (error) {
            console.error(error)
            throw Error('Error on processing DeleteTaskListUseCase')
        }
    }
}