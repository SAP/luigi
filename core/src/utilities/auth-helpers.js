export const getStoredAuthData = () =>
  JSON.parse(localStorage.getItem('luigi.auth'));
