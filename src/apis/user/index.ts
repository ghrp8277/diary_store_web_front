import { instance } from '@/apis';

// 로그인
export async function fetchLogin(
  username: string,
  password: string,
): Promise<{ accessToken: string; refreshToken: string }> {
  const params = new URLSearchParams();
  params.append('username', username);
  params.append('password', password);

  const { data } = await instance.auth.post('signin', params);

  return data;
}
