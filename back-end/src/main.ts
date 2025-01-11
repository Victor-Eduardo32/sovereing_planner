import { AuthUserUseCase } from "./application/usecases/auth/auth-user/auth-user.usescase";
import { LogoutUserUseCase } from "./application/usecases/auth/auth-user/logout-ser.usecase";
import { CreateSessionUseCase } from "./application/usecases/session/create-session.usecase";
import { CreateUserUseCase } from "./application/usecases/user/create-user/create-user.usecase";
import { ApiExpress } from "./infra/api/express/api.express";
import { AuthUserRoute } from "./infra/api/express/routes/auth/auth-user.express.route";
import { LogoutUserRoute } from "./infra/api/express/routes/auth/logout-user.express.route";
import { CreateUserRoute } from "./infra/api/express/routes/user/create-user.express.route";
import { SessionRepositoryPrisma } from "./infra/repositories/session.repository.prisma";
import { UserRepositoryPrisma } from "./infra/repositories/user.repository.prisma";
import { BcryptHashService } from "./infra/service/bcrypt-hash.service";
import { JwtServiceImpl } from "./infra/service/jwt-impl.service";
import { prisma } from "./package/prisma/prisma";

function main() {
    const userRepository = UserRepositoryPrisma.create(prisma)
    const sessionRepository = SessionRepositoryPrisma.create(prisma)

    const hashService = new BcryptHashService()
    const createUserUseCase = CreateUserUseCase.create(userRepository, hashService)

    const createSessionUseCase = CreateSessionUseCase.create(sessionRepository)

    const jwtService = new JwtServiceImpl()
    const authUserUseCase = AuthUserUseCase.create(userRepository, hashService, jwtService, createSessionUseCase)

    const logoutUserUseCase = LogoutUserUseCase.create()

    const createUserRoute = CreateUserRoute.create(createUserUseCase)
    const authUserRoute = AuthUserRoute.create(authUserUseCase)
    const logoutUserRoute = LogoutUserRoute.create(logoutUserUseCase)

    const port = 8000
    const api = ApiExpress.create([createUserRoute, authUserRoute, logoutUserRoute])
    api.start(port)
}

main()