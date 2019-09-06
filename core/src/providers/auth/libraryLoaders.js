/* istanbul ignore file */
export const authLibraries = {
  openIdConnect: () => {
    const oidc = document.createElement('script');
    oidc.setAttribute('type', 'text/javascript');
    oidc.setAttribute('src', '/luigi-core/auth/oidc/oidc-client.min.js');
    document.body.appendChild(oidc);
  }
};
