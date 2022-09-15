import { deleteCookie } from './cookies';
import stores from '@/stores';
import { storeToRefs } from 'pinia';

export function initUser() {
  const { username, token } = storeToRefs(stores.main);

  username.value = '';
  token.value = '';

  deleteCookie('til_access');
  deleteCookie('til_refresh');
  deleteCookie('til_user');
}

// export function refreshToken
