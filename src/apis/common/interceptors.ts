import {
  AxiosRequestConfig,
  AxiosResponse,
  AxiosInstance,
  AxiosError,
} from 'axios';
import router from '@/router';
import { useStore } from '@/services/pinia/main';

const DEBUG = process.env.NODE_ENV === 'development';
const store = useStore();
// loading ui
const startLoading = () => {
  store.isLoading = true;
};

const endLoading = () => {
  store.isLoading = false;
};

export function setInterceptors(instance: AxiosInstance) {
  instance.interceptors.request.use(
    (config: AxiosRequestConfig): AxiosRequestConfig => {
      if (DEBUG) {
        console.info(`
                      [method] [${JSON.stringify(config.method)}]
                      [mappedServiceUrl] [${config.url}]
                      [headers] [${JSON.stringify(config.headers)}]
                  `);
      }
      startLoading();
      return config;
    },
    (error: AxiosError): Promise<AxiosError> => {
      if (DEBUG) {
        console.error(`[request error] [${JSON.stringify(error)}]`);
      }
      if (error.code == 'ERR_NETWORK') router.push({ path: '/500' });
      endLoading();
      return Promise.reject(error);
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
    (error: AxiosError): Promise<AxiosError> => {
      if (DEBUG) {
        console.error(`
                      [method] [${error.response?.config.method}]
                      [mappedServiceUrl] [${error.response?.config.url}]
                      [responseStatusCode] [${error.response?.status}]
                  `);
      }

      if (error.code == 'ERR_NETWORK') router.push({ path: '/500' });
      endLoading();
      return Promise.reject({ error });
    },
  );

  return instance;
}
