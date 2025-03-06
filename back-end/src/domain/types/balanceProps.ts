import { Currency } from "../enums/currency"

export type BalanceProps = {
  id?: number,
  user_id: string,
  amount: number
  currency: Currency,
  created_at: Date
  updated_at: Date
}