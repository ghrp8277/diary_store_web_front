import { allDeleteCookie } from './cookies';
import { useStore } from '@/stores/main';
import { storeToRefs } from 'pinia';

export function logout() {
  const store = useStore();

  const { username, token, refreshToken } = storeToRefs(store);

  username.value = '';
  token.value = '';
  refreshToken.value = '';

  allDeleteCookie();
}
