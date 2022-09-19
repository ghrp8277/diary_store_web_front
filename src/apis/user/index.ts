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

// 로그아웃
export async function fetchLogout(token: string): Promise<void> {
  await instance.auth.delete('logout', {
    data: {
      token,
    },
  });
}

// 토큰 검증
export async function fetchRefreshToken(token: string): Promise<string> {
  const params = new URLSearchParams();
  params.append('token', token);

  const { data } = await instance.auth.post('token', params);

  return data;
}
