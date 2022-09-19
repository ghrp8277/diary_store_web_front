import { deleteCookie, saveAccessTokenToCookie } from './cookies';
import { useStore } from '@/stores/main';
import { storeToRefs } from 'pinia';
import axios, { AxiosError, AxiosRequestHeaders } from 'axios';
import { fetchLogout, fetchRefreshToken } from '@/apis/user';

export async function logout() {
  const store = useStore();

  const { username, token, refreshToken } = storeToRefs(store);

  await fetchLogout(refreshToken.value);

  username.value = '';
  token.value = '';
  refreshToken.value = '';

  deleteCookie('til_access');
  deleteCookie('til_refresh');
  deleteCookie('til_user');
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
