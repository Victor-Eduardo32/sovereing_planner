import { Balance } from './types'

export type BalanceDataTableProps = {
  balances: Balance[]
  winWidth: number
}

export type FormBalanceProps = {
  visible: boolean
}

export type SelectBalanceProps = {
  visible: boolean
  balances: Balance[]
  selectedBalance: Balance
}
