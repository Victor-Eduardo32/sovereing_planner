-- CreateTable
CREATE TABLE "task_lists" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "task_lists_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tasks" (
    "id" SERIAL NOT NULL,
    "task_list_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "state" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tasks_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "tasks_task_list_id_idx" ON "tasks"("task_list_id");

-- AddForeignKey
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_task_list_id_fkey" FOREIGN KEY ("task_list_id") REFERENCES "task_lists"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
