import { Cookies } from 'quasar';
import { useUserStore } from 'src/stores/UserStore';
import { computed } from 'vue';
import { useRouter } from 'vue-router';

export function useRedirect() {
  const router = useRouter();
  const user = computed(() => {
    return useUserStore();
  });

  const redirectToDashboard = async (): Promise<void> => {
    if (!user.value.getUserData.id) await user.value.getUser();
    if (Cookies.get('XSRF-TOKEN') && user.value.getUserData.id) {
      router.push('/user');
    }
  };

  return { redirectToDashboard }
}
