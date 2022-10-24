export function saveAccessTokenToCookie(token: string) {
  document.cookie = `til_access=${token}; path=/`;
}

export function saveRefreshTokenToCookie(token: string) {
  document.cookie = `til_refresh=${token}; path=/`;
}

export function saveUserToCookie(username: string) {
  document.cookie = `til_user=${username}; path=/`;
}

export function getAccessFromCookie() {
  return document.cookie.replace(
    /(?:(?:^|.*;\s*)til_access\s*=([^;]*).*$)|^.*$/,
    '$1',
  );
}

export function getRefreshFromCookie() {
  return document.cookie.replace(
    /(?:(?:^|.*;\s*)til_refresh\s*=([^;]*).*$)|^.*$/,
    '$1',
  );
}

export function getUserFromCookie() {
  return document.cookie.replace(
    /(?:(?:^|.*;\s*)til_user\s*=([^;]*).*$)|^.*$/,
    '$1',
  );
}

export function deleteCookie(value: string) {
  document.cookie = `${value}=; expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
}

export function allDeleteCookie() {
  const cookies = document.cookie.split('; ');

  for (const [index, cookie] of cookies.entries()) {
    const pattern = /^[^=]+/;

    const value = (pattern.exec(cookie) as any[])[0];

    document.cookie = `${value}=; expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
  }
}
