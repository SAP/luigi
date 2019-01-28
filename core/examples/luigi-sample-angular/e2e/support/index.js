// This file is processed and loaded automatically before test files.

import './commands';

export const getPath = rawPath => {
  const appWindow = cy.state('window');
  console.log(appWindow.Luigi);
  const { useHashRouting } = appWindow.Luigi.config.routing.useHashRouting;
  return useHashRouting ? '/#' + rawPath : rawPath;
};
