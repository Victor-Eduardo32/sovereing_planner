import { Saving } from './types'

export type FormSavingProps = {
  visible: boolean
  currency: string
}

export type SavingDataTableProps = {
  savings: Saving[]
  currency: string
}
