import { Expense } from './types'

export type FormExpenseProps = {
  visible: boolean
  currency: string
}

export type ExpenseDataTableProps = {
  expenses: Expense[]
  currency: string,
  winWidth: number
}
