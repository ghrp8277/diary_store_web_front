import { instance } from '@/apis';

// 로그인
export async function fetchLogin(
  username: string,
  password: string,
): Promise<any> {
  const params = new URLSearchParams();
  params.append('username', username);
  params.append('password', password);

  // const { data } = await instance.auth.post('auth/signin', params);
  // return data;
}
