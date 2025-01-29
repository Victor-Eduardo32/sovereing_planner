import { AxiosError } from 'axios';
import { defineStore } from 'pinia';
import { axios } from 'src/boot/axios';
import { LoginForm } from 'src/types/components/auth/types';
import { RegisterForm } from 'src/types/components/auth/types';
import { User } from 'src/types/components/user/types';
import { ref } from 'vue';

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User>(JSON.parse(localStorage.getItem('user') || '{}'))
  const errorMessage = ref<string>('')
  const isAuthenticated = ref<boolean>(JSON.parse(localStorage.getItem('isAuthenticated') || 'false'))
  const remember = ref<boolean>(JSON.parse(localStorage.getItem('remember') || 'false'))

  const setUser = async (userData:User): Promise<void> => {
    user.value = userData
    localStorage.setItem('user', JSON.stringify(userData));
  }

  const setAuthenticated = async (value: boolean): Promise<void> => {
    isAuthenticated.value = value;
    localStorage.setItem('isAuthenticated', JSON.stringify(value));
  }

  const setRemeber = async (value: boolean): Promise<void> => {
    remember.value = value;
    localStorage.setItem('remember', JSON.stringify(value));
  }

  const login = async (data: LoginForm) => {
      try {
        const response = await axios.post('/oauth', data)
        const token = response.data.token

        if(token) {
          await setAuthenticated(true)
          await setRemeber(true)
          await setUser(response.data.user)
          errorMessage.value = ''
        }
      } catch (error) {
        errorMessage.value = 'Email or password is wrong. Please, verify your data and try again.'
      }
  }

  const register = async (data: RegisterForm) => {
    try {
      await axios.post('/user', data)

      const loginData = {
        email: data.email,
        password: data.password
      } as LoginForm

      await login(loginData)

      errorMessage.value = ''
    } catch (error) {
      if(error instanceof AxiosError) {
        errorMessage.value = error.response?.data.message
        return
      }

      errorMessage.value = 'Unexpected Error. Please, try again later.'
    }
  }

  const logout = async () => {
    try {
      if(isAuthenticated.value) await axios.post('/logout')
      await setAuthenticated(false)
      await setRemeber(false)
      localStorage.removeItem('user');
      errorMessage.value = ''
    } catch (error) {
      errorMessage.value = 'Unexpected Error. Please, try again later.'
    }
  }

  const refreshAcessToken = async () => {
    try {
      await axios.post('/refresh-token')
      errorMessage.value = ''
    } catch (error) {
      errorMessage.value = 'Unexpected Error. Please, try again later.'
    }
  }

  const validateTokenExpirationTime = async () => {
    try {
      const response = await axios.post('/validate-token')
      const valid = response.data.valid
      if(valid == false && remember.value == true) await refreshAcessToken()
      if(valid == false && remember.value == false) await logout()
      errorMessage.value = ''
    } catch (error) {
      errorMessage.value = 'Unexpected Error. Please, try again later.'
    }
  }

  return { user, errorMessage, isAuthenticated, login, register, validateTokenExpirationTime, logout };
})
