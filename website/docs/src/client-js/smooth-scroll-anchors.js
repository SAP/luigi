import LuigiClient from '@kyma-project/luigi-client';


export class ScrollAnchorsHandler {
  init() {
    // scroll if navigate param found
    LuigiClient.addInitListener((ctx) => {
      if(this.initDone) { return; }
      this.initDone = true;
      if (LuigiClient.getNodeParams().hash) {
        this.scrollAnchor(null, LuigiClient.getNodeParams().hash);
      }
    });
  }
  
  // Vanilla JavaScript Scroll to Anchor
  // @ https://perishablepress.com/vanilla-javascript-scroll-anchor/
  // modified so respond could be also just a string with the #hash
  scrollAnchor(e, respond = null) {
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
    targetAnchor.scrollIntoView({ 
      behavior: 'smooth' 
    });
  }
}