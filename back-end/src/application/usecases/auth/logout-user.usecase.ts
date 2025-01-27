import { UpdateSessionDataUseCase } from "../session/update-session-data.usecase"
import { UseCase } from "../usecase" 

export type LogoutUserInputDto = {
    token: string
}

export type LogoutUserOutputDto = null

export class LogoutUserUseCase implements UseCase<LogoutUserInputDto, LogoutUserOutputDto> {
    private constructor(
        private readonly UpdateSessionDataService: UpdateSessionDataUseCase
    ){}

    public static create(UpdateSessionDataService: UpdateSessionDataUseCase) {
        return new LogoutUserUseCase(UpdateSessionDataService)
    }

    public async execute({ token }: LogoutUserInputDto): Promise<LogoutUserOutputDto> {
        await this.UpdateSessionDataService.execute({ token })
        
        return null
    }
}