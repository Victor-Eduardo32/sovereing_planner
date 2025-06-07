export type useBalanceType = {
  getCurrencyIcon(currency: string): string
  getCurrencyPrefix(currency: string): string
  getNumberFormat(amount: number, currency: string): string
  getNumberMask(currency: string): string
}
