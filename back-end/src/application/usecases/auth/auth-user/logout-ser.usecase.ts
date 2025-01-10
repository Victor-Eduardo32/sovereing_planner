import { UseCase } from "../../usecase";

export type LogoutUserInputDto = null

export type LogoutUserOutputDto = null

export class LogoutUserUseCase implements UseCase<LogoutUserInputDto, LogoutUserOutputDto> {
    private constructor(){}

    public static create() {
        return new LogoutUserUseCase()
    }

    public async execute(input: null): Promise<null> {
        return null
    }
}