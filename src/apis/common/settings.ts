import { AxiosInstance } from 'axios';

export function setAxiosSetting(instance: AxiosInstance) {
  // axios setting
  instance.defaults.timeout = 60 * 1000;
  instance.defaults.xsrfCookieName = 'csrftoken';
  instance.defaults.xsrfHeaderName = 'X-CSRFTOKEN';
}
