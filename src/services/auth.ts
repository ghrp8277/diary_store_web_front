import { allDeleteCookie, saveAccessTokenToCookie } from './cookies';
import { useStore } from '@/stores/main';
import { storeToRefs } from 'pinia';
import axios, { AxiosError, AxiosRequestHeaders } from 'axios';
import { fetchRefreshToken } from '@/apis/user';

export function logout() {
  const store = useStore();

  const { username, token, refreshToken } = storeToRefs(store);

  username.value = '';
  token.value = '';
  refreshToken.value = '';

  allDeleteCookie();
}

export async function refreshTokenVerify(error: AxiosError<unknown, any>) {
  const store = useStore();

  const { token, refreshToken } = storeToRefs(store);

  // const config = error.config;
  // const headers = config.headers as AxiosRequestHeaders;

  const data = await fetchRefreshToken(refreshToken.value);

  token.value = data;

  saveAccessTokenToCookie(token.value);

  // headers.Authorization = token.value;

  // await axios.request(config);
}
