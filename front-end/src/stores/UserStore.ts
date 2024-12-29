import { defineStore } from 'pinia';
import { axios } from 'src/boot/axios';
import { LoginForm, RegisterForm, User } from 'src/types/components/user/types';

export const useUserStore = defineStore('auth', {
  state: () => ({
    user: {} as User,
    error_message: '',
  }),
  persist: {
    paths: ['user']
  },
  getters: {
    getUserData(state): User{
      return state.user;
    },
    getErrorMessage(state): string{
      return state.error_message;
    }
  },
  actions: {
    async getXSRFToken() {
      await axios.get('/sanctum/csrf-cookie')
        .catch((error) => {
          throw new Error(
            error.response.data.message
          )
        })
    },
    async getUser() {
      await axios.get('/api/user').then(response => {
        this.user = response.data;
      })
        .catch(() => {
          this.user = {} as User;
        });
    },
    async formLogin(data: LoginForm) {
      await axios.post('/login', data)
        .catch((error) => {
          throw new Error(
            this.error_message = 'Email or password is incorrect, please verify your data and try again.' || error.response.data.message
          )
        });
    },
    async formRegister(data: RegisterForm) {
      await axios.post('/register', data)
        .catch((error) => {
          throw new Error(
            error.response.data.message
          )
        })
    },
    async logout(){
      await axios.post('/logout')
      .catch((error) => {
        throw new Error(
          error.response.data.message
        )
      });
      this.user = {} as User;
    }
  }
})
