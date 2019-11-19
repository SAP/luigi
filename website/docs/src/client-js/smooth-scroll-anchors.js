import LuigiClient from '@kyma-project/luigi-client';

export class ScrollAnchorsHandler {
  init() {
    // register .lui-scroll links
    document.addEventListener('click', (e) => {
      // If it isn't an anchor element, don't even bother...
      if (e.target.tagName !== 'A') return;
      if ((e.target.href && e.target.href.indexOf('#') != -1) && ((e.target.pathname == location.pathname) || ('/' + e.target.pathname == location.pathname)) && (e.target.search == location.search)) {
        this.scrollAnchors(e, e.target);
      }
    });

    // scroll if navigate param found
    LuigiClient.addInitListener((ctx) => {
      if(this.initDone) { return; }
      this.initDone = true;
      if (LuigiClient.getNodeParams().hash) {
        this.scrollAnchors(null, LuigiClient.getNodeParams().hash);
      }
    });
  }
  
  // Vanilla JavaScript Scroll to Anchor
  // @ https://perishablepress.com/vanilla-javascript-scroll-anchor/
  // modified so respond could be also just a string with the #hash
  scrollAnchors(e, respond = null) {
    const scrollOffset = 30;
    const distanceToTop = el => Math.floor(el.getBoundingClientRect().top - scrollOffset);
    let targetID;
    if (e) {
      e.preventDefault();
      targetID = (respond) ? respond.getAttribute('href') : this.getAttribute('href');
      targetID = `#${targetID.split('#').pop()}`;
    } else {
      targetID = respond;
    }

    const targetAnchor = document.querySelector(targetID);
    if (!targetAnchor) return;
    const originalTop = distanceToTop(targetAnchor);
    window.scrollBy({ top: originalTop, left: 0, behavior: 'smooth' });
    const checkIfDone = setInterval(function() {
      const atBottom = window.innerHeight + window.pageYOffset >= document.body.offsetHeight - 2;
      if (distanceToTop(targetAnchor) === 0 || atBottom) {
        targetAnchor.tabIndex = '-1';
        targetAnchor.focus();
        window.history.pushState('', '', targetID);
        clearInterval(checkIfDone);
      }
    }, 100);
  }
}