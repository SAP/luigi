export const getStoredAuthData = () =>
  JSON.parse(localStorage.getItem('luigi.auth'));

export const isLoggedIn = () => {
  const storedAuthData = JSON.parse(localStorage.getItem('luigi.auth'));
  const isAuthValid = () =>
    storedAuthData.accessTokenExpirationDate > Number(new Date());
  return storedAuthData && isAuthValid();
};
