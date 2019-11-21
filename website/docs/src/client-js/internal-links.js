import LuigiClient from '@kyma-project/luigi-client';

export class InternalLinksHandler {
  init() {
    LuigiClient.addInitListener((ctx) => {
      if(this.initDone) { return; }
      this.initDone = true;

      // modify internal links to be valid links for users and still make sapper happy 
      // since leaving them "wrong" (as local iframe links) in the first place
      const links = document.querySelectorAll('a[data-linktype]');
      if (links) {
        links.forEach((link, index) => {
          if (link.getAttribute('data-linktype') === 'internal') {
            const url = new URL(link.href);
            let newHref = ctx.coreBaseUrl + url.pathname.replace('.md', '').replace('/docu-microfrontend', '') + url.hash.toLowerCase();
            link.setAttribute('href', newHref);
          }
        });
      }

      // register click handler
      window.navigateInternal = (evt, elem) => {
        evt.preventDefault();
        evt.stopPropagation();
        let url;
        try {
          url = new URL(elem.getAttribute('href'));
        } catch (error) {
          console.debug('navigateInternal URL parse error', elem, elem.getAttribute('href'), error);
        }
        const urlWithPath = url.pathname.replace(ctx.coreBaseUrl, '').replace('.md', '').replace('/docu-microfrontend', '');
        if (url.hash) {
          LuigiClient.linkManager().withParams({hash: url.hash.toLowerCase()}).navigate(urlWithPath);
        } else {
          LuigiClient.linkManager().navigate(urlWithPath);
        }
      }
    });
  }
}
