import { Currency } from 'src/enums/currency'

export type Balance = {
  id?: number,
  name: string,
  amount?: number,
  currency: Currency,
  created_at?: Date,
  updated_at?: Date
}
