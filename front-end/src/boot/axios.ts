import { boot } from 'quasar/wrappers';
import axiosApi, { AxiosInstance } from 'axios';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance;
    $api: AxiosInstance;
  }
}

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
const axios = axiosApi.create({ baseURL: 'http://localhost:8000', withCredentials: true });

axios.interceptors.request.use(config => {
  const userString = localStorage.getItem('user');
  const user = userString ? JSON.parse(userString) : {};

  if(user) {
    console.log(user)
    config.headers['user_id'] = user.id
  }

  return config
}, error => {
  return Promise.reject(error);
})

export default boot(({ app }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axiosApi;
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = axios;
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
});

export { axios };
