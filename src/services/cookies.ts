export function saveAccessTokenToCookie(token: string) {
  document.cookie = `til_access=${token}`;
}

export function saveRefreshTokenToCookie(token: string) {
  document.cookie = `til_refresh=${token}`;
}

export function saveUserToCookie(username: string) {
  document.cookie = `til_user=${username}`;
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
