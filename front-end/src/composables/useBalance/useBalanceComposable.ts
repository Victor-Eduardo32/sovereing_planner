import { Currency } from 'src/enums/currency'
import { useBalanceType } from 'src/types/composables/useBalance/types'

export const useBalanceComposable = (): useBalanceType => {
  const getCurrencyIcon = (currency: string): string => {
    if(currency === Currency.BRL) return 'fa-sharp fa-solid fa-brazilian-real-sign'
    if(currency === Currency.USD) return 'attach_money'
    if(currency === Currency.EUR) return 'euro'

    return ''
  }

  const getCurrencyPrefix = (currency: string): string => {
    if(currency === Currency.BRL) return 'R$'
    if(currency === Currency.USD) return '$'
    if(currency === Currency.EUR) return '€'

    return ''
  }

  return { getCurrencyIcon, getCurrencyPrefix }
}
