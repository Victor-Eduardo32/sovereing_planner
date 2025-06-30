-- CreateTable
CREATE TABLE "expenses" (
    "id" SERIAL NOT NULL,
    "balance_id" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "value" BIGINT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "expenses_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "expenses" ADD CONSTRAINT "expenses_balance_id_fkey" FOREIGN KEY ("balance_id") REFERENCES "balances"("id") ON DELETE CASCADE ON UPDATE CASCADE;
