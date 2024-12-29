import { CreateUserUseCase } from "./application/usecases/user/create-user/create-user.usecase";
import { ApiExpress } from "./infra/api/express/api.express";
import { CreateUserRoute } from "./infra/api/express/routes/user/create-user.express.route";
import { UserRepositoryPrisma } from "./infra/repositories/user.repository.prisma";
import { BcryptHashService } from "./infra/service/bcrypt-hash.service";
import { prisma } from "./package/prisma/prisma";

function main() {
    const userRepository = UserRepositoryPrisma.create(prisma)

    const hashService = new BcryptHashService()
    const CreateUserUsecase = CreateUserUseCase.create(userRepository, hashService)

    const createUserRoute = CreateUserRoute.create(CreateUserUsecase)

    const port = 8000
    const api = ApiExpress.create([createUserRoute])
    api.start(port)
}

main()