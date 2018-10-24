export const authLibraries = {
  openIdConnect: () => {
    const oidc = document.createElement('script');
    oidc.setAttribute('type', 'text/javascript');
    oidc.setAttribute('src', '/luigi-core/oidc-client.js');
    document.body.appendChild(oidc);
  }
};
