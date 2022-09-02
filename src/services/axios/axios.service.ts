import axios, {
  AxiosRequestConfig,
  AxiosResponse,
  AxiosPromise,
  AxiosError,
} from 'axios';

import AxiosServiceError from '@/services/axios/axios.error';
import { useStore } from '@/services/pinia';

const DEBUG = process.env.NODE_ENV === 'development';
const ReadConsoleInfo = false;
const store = useStore();

// loading ui
const startLoading = () => {
  store.isLoading = true;
};

const endLoading = () => {
  store.isLoading = false;
};

// axios setting
axios.defaults.timeout = 60 * 1000;
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN';

axios.interceptors.request.use(
  (config: AxiosRequestConfig): AxiosRequestConfig => {
    if (DEBUG && ReadConsoleInfo) {
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
    if (DEBUG && ReadConsoleInfo) {
      console.error(`[request error] [${JSON.stringify(error)}]`);
    }
    endLoading();
    return Promise.reject(error);
  },
);

axios.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => {
    if (DEBUG && ReadConsoleInfo) {
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
    if (DEBUG && ReadConsoleInfo) {
      console.error(`
                [method] [${error.response?.config.method}]
                [mappedServiceUrl] [${error.response?.config.url}]
                [responseStatusCode] [${error.response?.status}]
            `);
    }

    const exception = new AxiosServiceError(error);

    endLoading();
    return Promise.reject({ error, payload: exception });
  },
);

// get, post, put, delete
const getRequest = <T>(url: string, params?: any): AxiosPromise<T> => {
  return axios.get<T>(url, params);
};

const postRequest = <T>(url: string, params: any): AxiosPromise<T> => {
  return axios.post<T>(url, params);
};

const putRequest = <T>(url: string, params: any): AxiosPromise<T> => {
  return axios.put<T>(url, params);
};

const deleteRequest = <T>(url: string): AxiosPromise<T> => {
  return axios.delete<T>(url);
};

export { getRequest, postRequest, putRequest, deleteRequest };
