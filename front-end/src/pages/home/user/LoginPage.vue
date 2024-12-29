<script lang="ts" setup>
import { useLoading } from 'src/composables/useLoading';
import { useRedirect } from 'src/composables/useRedirect';
import { useUserStore } from 'src/stores/UserStore';
import { LoginForm } from 'src/types/components/user/types';
import { computed, onBeforeMount, ref } from 'vue';

const user = computed(() => {
  return useUserStore();
});

const { redirectToDashboard } = useRedirect();
const { loading, endLoading } = useLoading();

const data = ref<LoginForm>({
  email: '',
  password: '',
});

const remember = ref<boolean>(false);
const isPwd = ref<boolean>(false);
const isLoading = ref<boolean>(true);

const login = async (): Promise<void> => {
  await user.value.formLogin(data.value);
  await user.value.getUser();
  await redirectToDashboard();
};

onBeforeMount(async () => {
  await loading();
  await user.value.getXSRFToken();
  await redirectToDashboard();
  await endLoading();
  isLoading.value = false;
});
</script>

<template>
  <q-page>
    <div
      class="flex no-wrap items-center justify-center bg-gray hvh-100"
      v-if="!isLoading"
    >
      <div class="container-login q-px-lg q-pt-xl q-pb-lg">
        <q-form class="form-login" @submit="login()">
          <div class="q-ma-none">
            <h5 class="q-my-none q-mb-xs font-purple text-bold">Login</h5>
            <p>
              Doesn't have an account yet?
              <span
                class="sign-up font-purple-hover cursor-pointer text-bold"
                @click="$router.push('/register')"
                >Sign Up</span
              >
            </p>
          </div>
          <p class="incorrect-data">{{ user.error_message }}</p>
          <div class="q-ma-none">
            <span class="text-bold">Email Address</span>
            <q-input
              class="q-mt-sm"
              type="email"
              v-model="data.email"
              outlined
              placeholder="you@example.com"
              :dense="false"
              :rules="[
                (val) => (val && val.length > 0) || 'Please type something',
              ]"
            />
          </div>

          <div class="q-ma-none">
            <div class="row justify-between">
              <span class="text-bold">Password</span>
              <span
                class="forgot-password font-purple-hover cursor-pointer text-bold"
                >Forgot Password?</span
              >
            </div>

            <q-input
              :type="isPwd ? 'password' : 'text'"
              outlined
              v-model="data.password"
              class="q-mt-sm"
              placeholder="Enter 8 caracters or more"
              :dense="false"
              :rules="[
                (val) =>
                  (val && val.length >= 8) ||
                  'Please, enter 8 caracters or more',
              ]"
            >
              <template v-slot:append>
                <q-icon
                  :name="isPwd ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isPwd = !isPwd"
                />
              </template>
            </q-input>
          </div>

          <div class="q-ml-none q-mt-none q-mb-lg">
            <q-checkbox v-model="remember" label="Remember me" />
          </div>

          <q-btn
            class="btn-login text-bold q-ma-none"
            label="Login"
            type="Login"
            color="primary"
          />
        </q-form>

        <div class="flex no-wrap items-center q-mt-md">
          <span class="decoration-line"></span>
          <p class="or-login-text q-pb-none text-center">Or login with</p>
          <span class="decoration-line"></span>
        </div>

        <div class="login-options justify-center flex no-wrap q-mb-md">
          <q-btn
            class="google-login flex no-wrap justify-center items-center rounded-borders q-mr-xs"
          >
            <q-avatar>
              <img src="src/assets/google.svg" />
            </q-avatar>
            <span class="q-ml-xs text-bold">Google</span>
          </q-btn>
          <q-btn
            class="facebook-login flex no-wrap justify-center items-center rounded-borders q-ml-xs"
          >
            <q-avatar>
              <img src="src/assets/facebook.svg" />
            </q-avatar>
            <span class="q-ml-xs text-bold">Facebook</span>
          </q-btn>
        </div>
      </div>
      <div class="img-container q-ml-xl">
        <img src="src/assets/backgroundLogin.png" />
      </div>
    </div>
  </q-page>
</template>

<style lang="scss" scoped>
.container-login {
  background: #fff;
  width: 40%;
  .form-login {
    .sign-up {
      border-bottom: 1px solid $primary;
    }

    .incorrect-data {
      color: $negative;
      font-size: 16px;
    }

    .forgot-password {
      border-bottom: 1px solid $primary;
    }

    .btn-login {
      width: 100%;
      height: 55px;
    }
  }

  .or-login-text {
    width: 350px !important;
  }

  .decoration-line {
    border-top: 2px solid #edf2f4;
    width: 100%;
  }

  .google-login {
    color: $googlered;
    border: 2px solid $googlered;
    width: 150px;
    font-size: 12px;

    .q-avatar {
      width: 35px;
      height: 35px;
    }
  }

  .facebook-login {
    color: $facebook;
    border: 2px solid $facebook;
    width: 150px;
    font-size: 12px;

    .q-avatar {
      width: 25px;
      height: 25px;
    }
  }

  @media (max-width: 1023px) {
    display: flex;
    justify-content: center;
    flex-direction: column;
    width: 100%;
    height: 100%;
  }
}

.img-container {
  width: 45%;
  img {
    width: 100%;
  }

  @media (max-width: 1023px) {
    display: none;
  }
}
</style>
