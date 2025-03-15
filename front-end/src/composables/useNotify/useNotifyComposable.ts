import { UseNotifyType } from 'src/types/composables/useNotify/types'
import { useQuasar } from 'quasar'

export const useNotifyComposable = (): UseNotifyType => {
  const $q = useQuasar()

  const positiveNotify = async (message: string) => {
    $q.notify({
      type: 'positive',
      message: message
    })
  }

  return { positiveNotify }
}
