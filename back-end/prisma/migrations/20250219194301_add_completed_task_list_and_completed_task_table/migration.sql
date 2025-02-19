-- CreateTable
CREATE TABLE "completed_task_lists" (
    "id" SERIAL NOT NULL,
    "user_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "ended_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "completed_task_lists_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "completed_tasks" (
    "id" SERIAL NOT NULL,
    "completed_task_list_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "completed_tasks_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "completed_task_lists_user_id_idx" ON "completed_task_lists"("user_id");

-- CreateIndex
CREATE INDEX "completed_tasks_completed_task_list_id_idx" ON "completed_tasks"("completed_task_list_id");

-- AddForeignKey
ALTER TABLE "completed_task_lists" ADD CONSTRAINT "completed_task_lists_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "completed_tasks" ADD CONSTRAINT "completed_tasks_completed_task_list_id_fkey" FOREIGN KEY ("completed_task_list_id") REFERENCES "completed_task_lists"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
