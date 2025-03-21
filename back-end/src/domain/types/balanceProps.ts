import { Currency } from "../enums/currency"

export type BalanceProps = {
  id?: number,
  user_id: string,
  name: string,
  amount: bigint
  currency: Currency,
  created_at: Date
  updated_at: Date
}