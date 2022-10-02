import { instance } from '@/apis';

// 로그인
export async function fetchLogin(
  username: string,
  password: string,
): Promise<{ accessToken: string; refreshToken: string }> {
  const params = new URLSearchParams();
  params.append('username', username);
  params.append('password', password);

  const { data } = await instance.auth.post('signin', params, {
    // withCredentials: true,
  });

  return data;
}

// 회원가입
export async function fetchSignUp(authCredentialsDto: {
  username: string;
  password: string;
  email: string;
}) {
  const params = new URLSearchParams();
  params.append('username', authCredentialsDto.username);
  params.append('password', authCredentialsDto.password);
  params.append('email', authCredentialsDto.email);

  const { data } = await instance.auth.post('signup', params);

  return data;
}

// 토큰 검증
export async function fetchRefreshToken(token: string): Promise<string> {
  const params = new URLSearchParams();
  params.append('token', token);

  const { data } = await instance.auth.post('refresh', params);

  return data;
}

// 이메일 중복 확인
export async function fetchEmailCheck(email: string) {
  const params = new URLSearchParams();
  params.append('email', email);

  const { data } = await instance.auth.post('email/check', params);

  return data;
}

// 이메일 인증
export async function fetchAuthEmail(email: string): Promise<boolean> {
  const params = new URLSearchParams();
  params.append('email', email);

  const { data } = await instance.auth.post('email', params);

  return data;
}

// 이메일 인증번호 확인
export async function fetchAuthNumber(
  email: string,
  number: string,
): Promise<boolean> {
  const params = new URLSearchParams();
  params.append('email', email);

  const { data } = await instance.auth.post(`email/${number}`, params);

  return data;
}

// 아이디 찾기
export async function fetchFindUsername(username: string) {
  const { data } = await instance.auth.get(`user/${username}/check`);

  return data;
}
