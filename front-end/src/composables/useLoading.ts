import { Loading } from 'quasar';
import { UseLoadingType } from 'src/types/composables/useLoading/types';

export function useLoading(): UseLoadingType {
  const loading = async (): Promise<void> => {
    Loading.show({
      spinnerColor: 'primary',
    });
  };

  const endLoading = async (): Promise<void> => {
    Loading.hide();
  };

  return { loading, endLoading }
}
