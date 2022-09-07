import axios from 'axios';
import { setInterceptors } from './common/interceptors';
import { setAxiosSetting } from './common/settings';

function createInstance() {
  const instance = axios.create({
    baseURL: process.env.VUE_APP_API_BASE_URL,
  });

  setAxiosSetting(instance);

  return setInterceptors(instance);
}

const instance = createInstance();

export { instance };
