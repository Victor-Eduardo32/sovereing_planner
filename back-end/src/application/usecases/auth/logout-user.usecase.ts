import { UpdateSessionDataUseCase } from "../session/update-session-data.usecase"
import { UseCase } from "../usecase" 

export type LogoutUserInputDto = {
    token: string
}

export type LogoutUserOutputDto = null

export class LogoutUserUseCase implements UseCase<LogoutUserInputDto, LogoutUserOutputDto> {
    private constructor(
        private readonly UpdateSessionDataUseCase: UpdateSessionDataUseCase
    ){}

    public static create(UpdateSessionDataUseCase: UpdateSessionDataUseCase) {
        return new LogoutUserUseCase(UpdateSessionDataUseCase)
    }

    public async execute({ token }: LogoutUserInputDto): Promise<LogoutUserOutputDto> {
        await this.UpdateSessionDataUseCase.execute({ token })
        
        return null
    }
}