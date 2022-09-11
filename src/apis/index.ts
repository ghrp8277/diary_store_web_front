import axios from 'axios';
import { setInterceptors } from './common/interceptors';
import { setAxiosSetting } from './common/settings';

function createInstanceWithAuth(url: string) {
  const instance = axios.create({
    baseURL: `${process.env.VUE_APP_API_BASE_URL}${url}/`,
  });

  setAxiosSetting(instance);

  return setInterceptors(instance);
}

export const instance = {
  store: createInstanceWithAuth('store'),
  auth: createInstanceWithAuth('auth'),
};
