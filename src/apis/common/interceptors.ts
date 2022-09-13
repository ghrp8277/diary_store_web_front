import {
  AxiosRequestConfig,
  AxiosResponse,
  AxiosInstance,
  AxiosError,
  AxiosRequestHeaders,
} from 'axios';
import router from '@/router';
import { useStore } from '@/stores/main';
import { storeToRefs } from 'pinia';
import { deleteCookie } from '@/services/cookies';

const DEBUG = process.env.NODE_ENV === 'development';

export function setInterceptors(instance: AxiosInstance) {
  const store = useStore();
  const { token, username, isLoading } = storeToRefs(store);

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

      headers.Authorization = token.value;

      return config;
    },
    (error: AxiosError): Promise<AxiosError> => {
      if (DEBUG) {
        console.error(`[request error] [${JSON.stringify(error)}]`);
      }

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

      return response;
    },
    (error: AxiosError): Promise<AxiosError> => {
      const status = error.response?.status;

      if (DEBUG) {
        console.error(`
                      [method] [${error.response?.config.method}]
                      [mappedServiceUrl] [${error.response?.config.url}]
                      [responseStatusCode] [${error.response?.status}]
                  `);
      }

      if (status == 500) router.push({ path: '/500' });
      else if (status == 403) {
        username.value = '';
        token.value = '';

        deleteCookie('til_access');
        deleteCookie('til_refresh');
        deleteCookie('til_user');

        router.push({ name: 'main' });
      }

      return Promise.reject(error.response);
    },
  );

  return instance;
}
