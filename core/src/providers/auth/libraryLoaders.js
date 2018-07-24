export const authLibraries = {
  openIdConnect: () => {
    const oidc = document.createElement('script');
    oidc.setAttribute('type', 'text/javascript');
    oidc.setAttribute('src', 'https://cdnjs.cloudflare.com/ajax/libs/oidc-client/1.5.1/oidc-client.min.js');
    document.body.appendChild(oidc);
  }
}