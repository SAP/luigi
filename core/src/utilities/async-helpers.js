const handles = {};

export const keyExistencyTimeout = 2000;
export const keyExistencyCheckInterval = 50;

export const waitForKeyExistency = (obj, name, timeout = keyExistencyTimeout) => {
  const startTimer = Date.now();
  return new Promise((resolve, reject) => {
    handles[name] = setInterval(() => {
      if (obj[name]) {
        return resolve(true);
      }
      if ((Date.now() - startTimer) > timeout) {
        clearInterval(handles[name]);
        return reject(false);
      }
    }, keyExistencyCheckInterval);
  });
}