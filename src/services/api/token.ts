export function isTokenExists(): boolean {
  return Boolean(localStorage.getItem('accessToken'));
}
