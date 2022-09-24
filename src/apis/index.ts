import axios from 'axios';
import { setInterceptors } from './common/interceptors';
import { setAxiosSetting } from './common/settings';
import { useStore } from '@/stores/main';
import { storeToRefs } from 'pinia';

function createInstanceWithAuth(url: string) {
  const store = useStore();
  const { token } = storeToRefs(store);

  const instance = axios.create({
    baseURL: `${process.env.VUE_APP_API_BASE_URL}${url}/`,
    headers: {
      Authorization: token.value,
    },
  });

  setAxiosSetting(instance);

  return setInterceptors(instance);
}

export const instance = {
  store: createInstanceWithAuth('store'),
  auth: createInstanceWithAuth('auth'),
};
