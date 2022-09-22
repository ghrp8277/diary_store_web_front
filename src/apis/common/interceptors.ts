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
import { logout, refreshTokenVerify } from '@/services/auth';

const DEBUG = process.env.NODE_ENV === 'development';

export function setInterceptors(instance: AxiosInstance) {
  const store = useStore();
  const { token, isLoading } = storeToRefs(store);

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
      const status = error.response?.status;

      if (DEBUG) {
        console.error(`
                      [method] [${error.response?.config.method}]
                      [mappedServiceUrl] [${error.response?.config.url}]
                      [responseStatusCode] [${error.response?.status}]
                  `);
      }

      console.log(status, error.message);

      switch (status) {
        case 403:
          logout();
          router.push({ name: 'main' });
          break;

        case 410:
          await refreshTokenVerify(error);
          break;

        case 500:
          router.push({
            path: '/500',
          });
          break;
      }

      endLoading();

      return Promise.reject(error.response);
    },
  );

  return instance;
}
