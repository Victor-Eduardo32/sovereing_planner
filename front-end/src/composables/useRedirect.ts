import { useAuthStore } from 'src/stores/AuthStore';
import { useRouter } from 'vue-router';

export function useRedirect() {
  const router = useRouter();
  const authStore = useAuthStore()

  const redirectToDashboard = async (): Promise<void> => {
    if (authStore.isAuthenticated) {
      router.push('/dashboard');
    }
  };

  return { redirectToDashboard }
}
