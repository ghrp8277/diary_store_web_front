import axios, {
  AxiosRequestConfig,
  AxiosResponse,
  AxiosInstance,
  AxiosError,
  AxiosRequestHeaders,
} from 'axios';
import router from '@/router';
import { useStore } from '@/stores/main';
import { storeToRefs } from 'pinia';
import { logout } from '@/services/auth';
import {
  getAccessFromCookie,
  saveAccessTokenToCookie,
  allDeleteCookie,
} from '@/services/cookies';

const DEBUG = process.env.NODE_ENV === 'development';

export function setInterceptors(instance: AxiosInstance) {
  const store = useStore();
  const { token, isLoading, username, refreshToken } = storeToRefs(store);

  const startLoading = () => {
    isLoading.value = true;
  };

  const endLoading = () => {
    isLoading.value = false;
  };

  instance.interceptors.request.use(
    (config: AxiosRequestConfig): AxiosRequestConfig => {
      if (DEBUG) {
        console.info(`
                      [method] [${JSON.stringify(config.method)}]
                      [mappedServiceUrl] [${config.url}]
                      [headers] [${JSON.stringify(config.headers)}]
                  `);
      }

      const headers = config.headers as AxiosRequestHeaders;

      headers.Authorization = `Bearer ${token.value}`;

      startLoading();

      return config;
    },
    (error: AxiosError): Promise<AxiosError> => {
      if (DEBUG) {
        console.error(`[request error] [${JSON.stringify(error)}]`);
      }

      endLoading();

      return Promise.reject(error.response);
    },
  );

  instance.interceptors.response.use(
    (response: AxiosResponse): AxiosResponse => {
      if (DEBUG) {
        console.info(`
                      [method] [${response.config.method}]
                      [mappedServiceUrl] [${response.config.url}]
                      [responseStatusCode] [${response.status}]
                      [data] [${JSON.stringify(response.data)}]
                  `);
      }

      endLoading();

      return response;
    },
    async (error: AxiosError) => {
      const status = error.response?.status as number;

      if (DEBUG) {
        console.error(`
                      [method] [${error.response?.config.method}]
                      [mappedServiceUrl] [${error.response?.config.url}]
                      [responseStatusCode] [${error.response?.status}]
                  `);
      }

      if (status === 410) {
        username.value = '';
        token.value = '';
        refreshToken.value = '';

        allDeleteCookie();

        router.push({
          name: 'login',
        });
      }

      // if (status === 410) {
      //   const params = new URLSearchParams();
      //   params.append('username', username.value);

      //   const response = await axios
      //     .post(`${process.env.VUE_APP_API_BASE_URL}auth/refresh`, params, {
      //       withCredentials: true,
      //       headers: {
      //         Authorization: refreshToken.value,
      //       },
      //     })
      //     .catch((error) => {
      //       endLoading();

      //       return Promise.reject(error);
      //     });

      //   if (response && response.data) {
      //     saveAccessTokenToCookie(response.data);

      //     token.value = response.data;

      //     const config = error.response?.config as AxiosRequestConfig;
      //     const headers = config?.headers as AxiosRequestHeaders;

      //     headers.Authorization = `Bearer ${token.value}`;

      //     endLoading();

      //     await instance(config);
      //   }
      // } else {
      endLoading();

      return Promise.reject(error.response);
      // }
    },
  );

  return instance;
}
