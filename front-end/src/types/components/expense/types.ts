export type Expense = {
  id?: number,
  balance_id: number,
  description: string,
  value: number,
  date: Date,
  created_at?: Date
}
