<script lang="ts" setup>
import { useLoading } from 'src/composables/useLoading';
import { useRedirect } from 'src/composables/useRedirect';
import { useAuthStore } from 'src/stores/modules/AuthStore';
import { RegisterForm } from 'src/types/components/auth/types';
import { onBeforeMount, ref, watch } from 'vue';

const authStore = useAuthStore()

const { redirectToDashboard } = useRedirect();
const { loading, endLoading } = useLoading();

const registerForm = ref<RegisterForm>({
  name: '',
  email: '',
  password: ''
});

const passwordConfirmation = ref<string>('');
const differentPass = ref<string>('')
const isPasswordVisible = ref<boolean>(false);
const isLoading = ref<boolean>(true);

const register = async (): Promise<void> => {
  if (registerForm.value.password === passwordConfirmation.value) {
    await authStore.register(registerForm.value)
    await redirectToDashboard();
  }
};

watch([() => registerForm.value.password, () => passwordConfirmation.value], () => {
  differentPass.value = registerForm.value.password !== passwordConfirmation.value ? 'Password are not the same' : ''
})

onBeforeMount(async () => {
  await loading();
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
      <div class="container-register q-px-md q-py-lg">
        <q-form class="form-register" @submit="register()">
          <div class="q-ma-none">
            <h5 class="q-my-none q-mb-xs font-purple text-bold">Register</h5>
            <p>
              Already have an account?
              <span
                class="sign-in font-purple-hover cursor-pointer text-bold"
                @click="$router.push('/login')"
                >Sing In</span
              >
            </p>
          </div>

          <div class="q-ma-none">
            <span class="text-bold">Name</span>
            <q-input
              class="q-mt-sm"
              type="text"
              v-model="registerForm.name"
              outlined
              placeholder="Your name"
              :dense="false"
              :rules="[
                (val) => (val && val.length > 0) || 'Please type something',
              ]"
              autocomplete="username"
            />
          </div>

          <div class="q-ma-none">
            <span class="text-bold">Email Address</span>
            <q-input
              class="q-mt-sm"
              type="email"
              v-model="registerForm.email"
              outlined
              placeholder="you@example.com"
              :dense="false"
              :rules="[
                (val) => (val && val.length > 0) || 'Please type something',
              ]"
              autocomplete="username"
            />
          </div>

          <div class="q-ma-none">
            <span class="text-bold">Password</span>

            <q-input
              :type="isPasswordVisible ? 'text' : 'password'"
              outlined
              v-model="registerForm.password"
              class="q-mt-sm"
              placeholder="Enter 8 caracters or more"
              :name="isPasswordVisible ? 'visibility_off' : 'visibility'"
              :dense="false"
              :rules="[
                (val) =>
                  (val && val.length >= 8) ||
                  'Please, enter 8 caracters or more'
              ]"
              autocomplete="new-password"
            >
            <template v-slot:append>
                <q-icon
                  :name="isPasswordVisible ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isPasswordVisible = !isPasswordVisible"
                />
              </template>
            </q-input>
          </div>

          <div class="q-ma-none q-mb-sm">
            <span class="text-bold">Confirm Password</span>

            <q-input
              :type="isPasswordVisible ? 'text' : 'password'"
              outlined
              v-model="passwordConfirmation"
              class="q-mt-sm"
              placeholder="Enter your password again"
              :name="isPasswordVisible ? 'visibility_off' : 'visibility'"
              :dense="false"
              :rules="[
                (val) =>
                  (val && val.length >= 8) ||
                  'Please, enter 8 caracters or more',
                (val) =>
                  (val && differentPass.length <= 0) ||
                  differentPass
              ]"
              autocomplete="new-password"
            >
            <template v-slot:append>
                <q-icon
                  :name="isPasswordVisible ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isPasswordVisible = !isPasswordVisible"
                />
              </template>
            </q-input>
          </div>

          <q-btn
            class="btn-login text-bold q-ma-none"
            label="Register"
            type="Login"
            color="primary"
          />
        </q-form>

        <div class="flex no-wrap items-center q-mt-md">
          <span class="decoration-line"></span>
          <p class="or-login-text q-pb-none text-center">Or login with</p>
          <span class="decoration-line"></span>
        </div>

        <div class="login-options justify-center flex no-wrap q-mb-lg">
          <q-btn
            class="google-login flex no-wrap justify-center items-center rounded-borders q-mr-xs"
          >
            <q-avatar>
              <img src="src/assets/google.svg" />
            </q-avatar>
            <span class="q-ml-xs text-bold">Google</span>
          </q-btn>
        </div>
      </div>
      <div class="img-container q-ml-xl">
        <img src="src/assets/backgroundRegister.png" />
      </div>
    </div>
  </q-page>
</template>

<style lang="scss" scoped>
.container-register {
  background: #fff;
  width: 40%;
  .form-register {
    .sign-in {
      border-bottom: 1px solid $primary;
    }

    .btn-login {
      width: 100%;
      height: 55px;
    }

    @media (max-width: 1023px) {
      padding-top: 30px;

      h5 {
        margin-top: 48px;
      }
    }
  }

  .or-login-text {
    width: 350px !important;
  }

  .decoration-line {
    border-top: 2px solid #edf2f4;
    width: 100%;
  }

  .login-options {
    .google-login {
      color: $googlered;
      border: 2px solid $googlered;
      width: 150px;
      font-size: 12px;

      .q-avatar {
        width: 35px;
        height: 35px;
      }

      @media (max-width: 1023px) {
        margin-bottom: 24px;
      }
    }
  }

  @media (max-width: 1023px) {
    display: flex;
    justify-content: center;
    flex-direction: column;
    width: 100%;
    height: 100%;
    transform: scale(1);
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
