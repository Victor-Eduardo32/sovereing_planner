import { AuthUserRoute } from "../infra/api/express/routes/auth/auth-user.express.route";
import { LogoutUserRoute } from "../infra/api/express/routes/auth/logout-user.express.route";
import { CreateBalanceRoute } from "../infra/api/express/routes/balance/create-balance.express.route";
import { DeleteBalanceRoute } from "../infra/api/express/routes/balance/delete-balance.express.route";
import { FindAllBalanceRoute } from "../infra/api/express/routes/balance/find-all-balance.express.route";
import { CreateCompletedTaskListRoute } from "../infra/api/express/routes/completed-task-list/create-completed-task-list.express.route";
import { FindAllCompletedTaskListRoute } from "../infra/api/express/routes/completed-task-list/find-all-task-list.express.route";
import { CreateExpenseRoute } from "../infra/api/express/routes/expense/create-expense.express.route";
import { DeleteExpenseRoute } from "../infra/api/express/routes/expense/delete-expense.express.route";
import { FindExpenseByBalanceIdRoute } from "../infra/api/express/routes/expense/find-expense-by-balance-id.express.route";
import { CreateSavingRoute } from "../infra/api/express/routes/saving/create-saving.express.route";
import { DeleteSavingRoute } from "../infra/api/express/routes/saving/delete-saving.express.route";
import { FindSavingByBalanceIdRoute } from "../infra/api/express/routes/saving/find-saving-by-balance-id.express.route";
import { RefreshSessionTokenRoute } from "../infra/api/express/routes/session/refresh-session-token.express.route";
import { ValidateSessionTokenRoute } from "../infra/api/express/routes/session/validate-session-token.express.route";
import { CreateTaskListRoute } from "../infra/api/express/routes/task-list/create-task-list.express.route";
import { DeleteTaskListRoute } from "../infra/api/express/routes/task-list/delete-task-list.express.route";
import { FindAllTaskListRoute } from "../infra/api/express/routes/task-list/find-all-task-list.express.route";
import { UpdateTaskListRoute } from "../infra/api/express/routes/task-list/update-task-list.express.route";
import { UpdateTaskStateRoute } from "../infra/api/express/routes/task/update-task-state.express.route";
import { CreateUserRoute } from "../infra/api/express/routes/user/create-user.express.route";

export const initializeRoutes = (useCases: any) => {
    const createUserRoute = CreateUserRoute.create(useCases.createUserUseCase);

    const authUserRoute = AuthUserRoute.create(useCases.authUserUseCase);
    const logoutUserRoute = LogoutUserRoute.create(useCases.logoutUserUseCase);
    const validateSessionTokenRoute = ValidateSessionTokenRoute.create(useCases.validateSessionToken);
    const refreshSessionTokenRoute = RefreshSessionTokenRoute.create(useCases.refreshSessionTokenUseCase);

    const createTaskListRoute = CreateTaskListRoute.create(useCases.createTaskListUseCase);
    const updateTaskListRoute = UpdateTaskListRoute.create(useCases.updateTaskListUseCase);
    const findAllTaskListRoute = FindAllTaskListRoute.create(useCases.findAllTaskListUseCase);
    const deleteTaskListRoute = DeleteTaskListRoute.create(useCases.deleteTaskListUseCase);

    const updateTaskStateRoute = UpdateTaskStateRoute.create(useCases.updateTaskStateUseCase);
    
    const createCompletedTaskListRoute = CreateCompletedTaskListRoute.create(useCases.createCompletedTaskListUseCase);
    const findAllCompletedTaskListRoute = FindAllCompletedTaskListRoute.create(useCases.findAllCompletedTaskListUseCase);

    const createBalanceRoute = CreateBalanceRoute.create(useCases.createBalanceUseCase);
    const findAllBalanceRoute = FindAllBalanceRoute.create(useCases.findAllBalanceUseCase);
    const deleteBalanceRoute = DeleteBalanceRoute.create(useCases.deleteBalanceUseCase);

    const createSavingRoute = CreateSavingRoute.create(useCases.createSavingUseCase, useCases.updateBalanceUseCase);
    const findSavingByBalanceIdRoute = FindSavingByBalanceIdRoute.create(useCases.findSavingByBalanceIdUseCase);
    const deleteSavingRoute = DeleteSavingRoute.create(useCases.deleteSavingUseCase, useCases.findSavingByIdUseCase, useCases.updateBalanceUseCase);

    const createExpenseRoute = CreateExpenseRoute.create(useCases.createExpenseUseCase, useCases.updateBalanceUseCase);
    const findExpenseByBalanceIdRoute = FindExpenseByBalanceIdRoute.create(useCases.findExpenseByBalanceIdUseCase);
    const deleteExpenseRoute = DeleteExpenseRoute.create(useCases.deleteExpenseUseCase, useCases.findExpenseByIdUseCase,useCases.updateBalanceUseCase);

    return [
        createUserRoute,
        authUserRoute,
        validateSessionTokenRoute,
        refreshSessionTokenRoute,
        logoutUserRoute,
        createTaskListRoute,
        updateTaskListRoute,
        findAllTaskListRoute,
        deleteTaskListRoute,
        updateTaskStateRoute,
        createCompletedTaskListRoute,
        findAllCompletedTaskListRoute,
        createBalanceRoute,
        findAllBalanceRoute,
        deleteBalanceRoute,
        createSavingRoute,
        findSavingByBalanceIdRoute,
        deleteSavingRoute,
        createExpenseRoute,
        findExpenseByBalanceIdRoute,
        deleteExpenseRoute
    ];
}