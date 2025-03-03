import { CompletedTaskListRepositoryPrisma } from "../infra/repositories/completed-task-list.repository.prisma"
import { CompletedTaskRepositoryPrisma } from "../infra/repositories/completed-task.repository.prisma"
import { SessionRepositoryPrisma } from "../infra/repositories/session.repository.prisma"
import { TaskListRepositoryPrisma } from "../infra/repositories/task-list.repository.prisma"
import { TaskRepositoryPrisma } from "../infra/repositories/task.repository.prisma"
import { UserRepositoryPrisma } from "../infra/repositories/user.repository.prisma"
import { prisma } from "../package/prisma/prisma"

export const initializeRepositories = () => {
    const userRepository = UserRepositoryPrisma.create(prisma);
    const sessionRepository = SessionRepositoryPrisma.create(prisma);
    const taskRepository = TaskRepositoryPrisma.create(prisma);
    const taskListRepository = TaskListRepositoryPrisma.create(prisma);
    const completedTaskRepository = CompletedTaskRepositoryPrisma.create(prisma);
    const completedTaskListRepository = CompletedTaskListRepositoryPrisma.create(prisma);

    return {
        userRepository,
        sessionRepository,
        taskRepository,
        taskListRepository,
        completedTaskRepository,
        completedTaskListRepository,
    };
}