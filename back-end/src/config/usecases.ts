import { AuthUserUseCase } from "../application/usecases/auth/auth-user.usescase"
import { LogoutUserUseCase } from "../application/usecases/auth/logout-user.usecase"
import { CreateBalanceUseCase } from "../application/usecases/balance/create-balance.usecase"
import { DeleteBalanceUseCase } from "../application/usecases/balance/delete-balance.usecase"
import { FindAllBalanceUseCase } from "../application/usecases/balance/find-all-balance.usecase"
import { FindBalanceByIdUseCase } from "../application/usecases/balance/find-balance-by-id.usecase"
import { UpdateBalanceUseCase } from "../application/usecases/balance/update-balance.usecase"
import { CreateCompletedTaskListUseCase } from "../application/usecases/completed-task-list/create-completed-task-list.usecase"
import { FindAllCompletedTaskListUseCase } from "../application/usecases/completed-task-list/find-all-completed-task-list.usecase"
import { CreateCompletedTaskUseCase } from "../application/usecases/completed-task/create-completed-task.usecase"
import { FindAllCompletedTaskUseCase } from "../application/usecases/completed-task/find-all-completed-task.usecase"
import { CreateExpenseUseCase } from "../application/usecases/expense/create-expense.usecase"
import { DeleteExpenseUseCase } from "../application/usecases/expense/delete-expense.usecase"
import { FindExpenseByBalanceIdUseCase } from "../application/usecases/expense/find-expense-by-balance-id.usecase"
import { FindExpenseByIdUseCase } from "../application/usecases/expense/find-expense-by-id.usecase"
import { CreateSavingUseCase } from "../application/usecases/saving/create-saving.usecase"
import { DeleteSavingUseCase } from "../application/usecases/saving/delete-saving.usecase"
import { FindSavingByBalanceIdUseCase } from "../application/usecases/saving/find-saving-by-balance-id.usecase"
import { FindSavingByIdUseCase } from "../application/usecases/saving/find-saving-by-id.usecase"
import { CreateSessionUseCase } from "../application/usecases/session/create-session.usecase"
import { RefreshSessionTokenUseCase } from "../application/usecases/session/refresh-session-token.usecase"
import { UpdateSessionDataUseCase } from "../application/usecases/session/update-session-data.usecase"
import { ValidateSessionTokenUseCase } from "../application/usecases/session/validate-session-token.usecase"
import { CreateTaskListUseCase } from "../application/usecases/task-list/create-task-list.usecase"
import { DeleteTaskListUseCase } from "../application/usecases/task-list/delete-task-list.usecase"
import { FindAllTaskListUseCase } from "../application/usecases/task-list/find-all-task-list.usecase"
import { UpdateTaskListUseCase } from "../application/usecases/task-list/update-task-list.usecase"
import { CreateTaskUseCase } from "../application/usecases/task/create-task.usecase"
import { DeleteTaskUseCase } from "../application/usecases/task/delete-task.usecase"
import { FindAllTaskUseCase } from "../application/usecases/task/find-all-task.usecase"
import { FindTaskIdsByTaskListIdUseCase } from "../application/usecases/task/find-task-ids-by-task-list-id.usecase"
import { UpdateTaskStateUseCase } from "../application/usecases/task/update-state-task.usecase"
import { CreateUserUseCase } from "../application/usecases/user/create-user.usecase"

export const initializeUseCases = (repositories: any, services: any) => {
    const createUserUseCase = CreateUserUseCase.create(repositories.userRepository, services.hashService);
    const createSessionUseCase = CreateSessionUseCase.create(repositories.sessionRepository);
    const updateSessionDataUseCase = UpdateSessionDataUseCase.create(repositories.sessionRepository, services.jwtService);
    const validateSessionToken = ValidateSessionTokenUseCase.create(services.jwtService);
    const refreshSessionTokenUseCase = RefreshSessionTokenUseCase.create(createSessionUseCase, services.jwtService);
    const authUserUseCase = AuthUserUseCase.create(repositories.userRepository, services.hashService, services.jwtService, createSessionUseCase);
    const logoutUserUseCase = LogoutUserUseCase.create(updateSessionDataUseCase);

    const createTaskUseCase = CreateTaskUseCase.create(repositories.taskRepository);
    const findAllTaskUseCase = FindAllTaskUseCase.create(repositories.taskRepository);
    const findTaskIdsByTaskListIdUseCase = FindTaskIdsByTaskListIdUseCase.create(repositories.taskRepository);
    const deleteTaskUseCase = DeleteTaskUseCase.create(repositories.taskRepository);
    const updateTaskStateUseCase = UpdateTaskStateUseCase.create(repositories.taskRepository);

    const createTaskListUseCase = CreateTaskListUseCase.create(repositories.taskListRepository, createTaskUseCase);
    const updateTaskListUseCase = UpdateTaskListUseCase.create(repositories.taskListRepository, createTaskUseCase, findTaskIdsByTaskListIdUseCase, deleteTaskUseCase);
    const findAllTaskListUseCase = FindAllTaskListUseCase.create(repositories.taskListRepository, findAllTaskUseCase);
    const deleteTaskListUseCase = DeleteTaskListUseCase.create(repositories.taskListRepository);

    const createCompletedTaskUseCase = CreateCompletedTaskUseCase.create(repositories.completedTaskRepository);
    const findAllCompletedTaskUseCase = FindAllCompletedTaskUseCase.create(repositories.completedTaskRepository);

    const createCompletedTaskListUseCase = CreateCompletedTaskListUseCase.create(repositories.completedTaskListRepository, createCompletedTaskUseCase);
    const findAllCompletedTaskListUseCase = FindAllCompletedTaskListUseCase.create(repositories.completedTaskListRepository, findAllCompletedTaskUseCase);

    const createBalanceUseCase = CreateBalanceUseCase.create(repositories.balanceRepository);
    const findBalanceByIdUseCase = FindBalanceByIdUseCase.create(repositories.balanceRepository);
    const findAllBalanceUseCase = FindAllBalanceUseCase.create(repositories.balanceRepository);
    const deleteBalanceUseCase = DeleteBalanceUseCase.create(repositories.balanceRepository);
    const updateBalanceUseCase = UpdateBalanceUseCase.create(repositories.balanceRepository, findBalanceByIdUseCase);

    const createSavingUseCase = CreateSavingUseCase.create(repositories.savingRepository);
    const findSavingByIdUseCase = FindSavingByIdUseCase.create(repositories.savingRepository);
    const findSavingByBalanceIdUseCase = FindSavingByBalanceIdUseCase.create(repositories.savingRepository);
    const deleteSavingUseCase = DeleteSavingUseCase.create(repositories.savingRepository)

    const createExpenseUseCase = CreateExpenseUseCase.create(repositories.expenseRepository);
    const findExpenseByIdUseCase = FindExpenseByIdUseCase.create(repositories.expenseRepository);
    const findExpenseByBalanceIdUseCase = FindExpenseByBalanceIdUseCase.create(repositories.expenseRepository);
    const deleteExpenseUseCase = DeleteExpenseUseCase.create(repositories.expenseRepository)

    return {
        createUserUseCase,
        createSessionUseCase,
        updateSessionDataUseCase,
        validateSessionToken,
        refreshSessionTokenUseCase,
        authUserUseCase,
        logoutUserUseCase,
        createTaskUseCase,
        findAllTaskUseCase,
        findTaskIdsByTaskListIdUseCase,
        deleteTaskUseCase,
        updateTaskStateUseCase,
        createTaskListUseCase,
        updateTaskListUseCase,
        findAllTaskListUseCase,
        deleteTaskListUseCase,
        createCompletedTaskUseCase,
        findAllCompletedTaskUseCase,
        createCompletedTaskListUseCase,
        findAllCompletedTaskListUseCase,
        createBalanceUseCase,
        findBalanceByIdUseCase,
        findAllBalanceUseCase,
        deleteBalanceUseCase,
        updateBalanceUseCase,
        createSavingUseCase,
        findSavingByIdUseCase,
        findSavingByBalanceIdUseCase,
        deleteSavingUseCase,
        createExpenseUseCase,
        findExpenseByIdUseCase,
        findExpenseByBalanceIdUseCase,
        deleteExpenseUseCase
    };
}