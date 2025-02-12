import { AuthUserUseCase } from "./application/usecases/auth/auth-user.usescase";
import { LogoutUserUseCase } from "./application/usecases/auth/logout-user.usecase";
import { CreateSessionUseCase } from "./application/usecases/session/create-session.usecase"; 
import { RefreshSessionTokenUseCase } from "./application/usecases/session/refresh-session-token.usecase";
import { UpdateSessionDataUseCase } from "./application/usecases/session/update-session-data.usecase";
import { ValidateSessionTokenUseCase } from "./application/usecases/session/validate-session-token.usecase"; 
import { CreateTaskListUseCase } from "./application/usecases/task-list/create-task-list.usecase";
import { FindAllTaskListUseCase } from "./application/usecases/task-list/find-all-task-list.usecase";
import { UpdateTaskListUseCase } from "./application/usecases/task-list/update-task-list.usecase";
import { CreateTaskUseCase } from "./application/usecases/task/create-task.usecase";
import { DeleteTaskUseCase } from "./application/usecases/task/delete-task.usecase";
import { FindAllTaskUseCase } from "./application/usecases/task/find-all-task.usecase";
import { FindTaskIdsByTaskListIdUseCase } from "./application/usecases/task/find-task-ids-by-task-list-id.usecase";
import { UpdateTaskStateUseCase } from "./application/usecases/task/update-state-task.usecase";
import { CreateUserUseCase } from "./application/usecases/user/create-user.usecase";
import { ApiExpress } from "./infra/api/express/api.express";
import { AuthUserRoute } from "./infra/api/express/routes/auth/auth-user.express.route";
import { LogoutUserRoute } from "./infra/api/express/routes/auth/logout-user.express.route";
import { RefreshSessionTokenRoute } from "./infra/api/express/routes/session/refresh-session-token.express.route";
import { ValidateSessionTokenRoute } from "./infra/api/express/routes/session/validate-session-token.express.route";
import { CreateTaskListRoute } from "./infra/api/express/routes/task-list/create-task-list.express.route";
import { FindAllTaskListRoute } from "./infra/api/express/routes/task-list/find-all-task-list.express.route";
import { UpdateTaskListRoute } from "./infra/api/express/routes/task-list/update-task-list.express.route";
import { UpdateTaskStateRoute } from "./infra/api/express/routes/task/update-task-state.express.route";
import { CreateUserRoute } from "./infra/api/express/routes/user/create-user.express.route";
import { SessionRepositoryPrisma } from "./infra/repositories/session.repository.prisma";
import { TaskListRepositoryPrisma } from "./infra/repositories/task-list.repository.prisma";
import { TaskRepositoryPrisma } from "./infra/repositories/task.repository.prisma";
import { UserRepositoryPrisma } from "./infra/repositories/user.repository.prisma";
import { BcryptHashService } from "./infra/service/bcrypt-hash.service";
import { JwtServiceImpl } from "./infra/service/jwt-impl.service";
import { prisma } from "./package/prisma/prisma";

function main() {
    const userRepository = UserRepositoryPrisma.create(prisma)
    const sessionRepository = SessionRepositoryPrisma.create(prisma)
    const taskRepository = TaskRepositoryPrisma.create(prisma)
    const taskListRepository = TaskListRepositoryPrisma.create(prisma)

    const hashService = new BcryptHashService()
    const jwtService = new JwtServiceImpl()

    const createUserUseCase = CreateUserUseCase.create(userRepository, hashService)
    const createSessionUseCase = CreateSessionUseCase.create(sessionRepository)
    const updateSessionDataUseCase = UpdateSessionDataUseCase.create(sessionRepository, jwtService)
    const validateSessionToken = ValidateSessionTokenUseCase.create(jwtService)
    const refreshSessionTokenUseCase = RefreshSessionTokenUseCase.create(createSessionUseCase, jwtService)
    const authUserUseCase = AuthUserUseCase.create(userRepository, hashService, jwtService, createSessionUseCase)
    const logoutUserUseCase = LogoutUserUseCase.create(updateSessionDataUseCase)

    const createTaskUseCase = CreateTaskUseCase.create(taskRepository)
    const findAllTaskUseCase = FindAllTaskUseCase.create(taskRepository)
    const findTaskIdsByTaskListIdUseCase = FindTaskIdsByTaskListIdUseCase.create(taskRepository)
    const deleteTaskUseCase = DeleteTaskUseCase.create(taskRepository)
    const updateTaskStateUseCase = UpdateTaskStateUseCase.create(taskRepository)

    const createTaskListUseCase = CreateTaskListUseCase.create(taskListRepository, createTaskUseCase)
    const updateTaskListUseCase = UpdateTaskListUseCase.create(taskListRepository, createTaskUseCase, findTaskIdsByTaskListIdUseCase, deleteTaskUseCase)
    const findAllTaskListUseCase = FindAllTaskListUseCase.create(taskListRepository, findAllTaskUseCase)

    const createUserRoute = CreateUserRoute.create(createUserUseCase)
    const authUserRoute = AuthUserRoute.create(authUserUseCase)
    const validateSessionTokenRoute = ValidateSessionTokenRoute.create(validateSessionToken)
    const refreshSessionTokenRoute = RefreshSessionTokenRoute.create(refreshSessionTokenUseCase)
    const logoutUserRoute = LogoutUserRoute.create(logoutUserUseCase)
    const createTaskListRoute = CreateTaskListRoute.create(createTaskListUseCase)
    const updateTaskListRoute = UpdateTaskListRoute.create(updateTaskListUseCase)
    const findAllTaskListRoute = FindAllTaskListRoute.create(findAllTaskListUseCase)
    const updateTaskStateRoute = UpdateTaskStateRoute.create(updateTaskStateUseCase)

    const port = 8000
    const api = ApiExpress.create([
        createUserRoute, 
        authUserRoute, 
        validateSessionTokenRoute, 
        refreshSessionTokenRoute, 
        logoutUserRoute, 
        createTaskListRoute,
        updateTaskListRoute,
        findAllTaskListRoute,
        updateTaskStateRoute
    ])
    api.start(port)
}

main()