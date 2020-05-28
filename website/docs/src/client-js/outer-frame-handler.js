import { isSearchBot } from './helpers';

/**
 * Redirects to outer frame documentation if the 
 * microfrontend was opened directly without Luigi Core
 * Algolia Search Agent is skipped.
 */

export class OuterFrameHandler {
  init() {
    if (this.outsideIframe() && !isSearchBot) {
      const href = window.location.href;
      let newHref;
      if (href.includes('/docu-microfrontend')) {
        newHref = href.replace('/docu-microfrontend', '').replace('#', '?section=');
      } else {
        newHref = href.replace(':4001', ':4000').replace('#', '?section=');
      }
      window.location.href = newHref;
    }
  }

  outsideIframe() {
    try {
      return window.self === window.top;
    } catch (_) {
      return false;
    }
  }
}