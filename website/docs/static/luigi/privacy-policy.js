(function() {
  setTimeout(function() {
    try {
      let aPrivacyPolicy = document.createElement('a');
      const linkTextPrivacyPolicy = document.createTextNode('Privacy Policy');
      aPrivacyPolicy.appendChild(linkTextPrivacyPolicy);
      aPrivacyPolicy.href = 'https://www.sap.com/about/legal/privacy.html';
      aPrivacyPolicy.target = '_blank';
      const parent = document.getElementsByClassName('lui-side-nav__footer--text')[0];
      const child = document.getElementsByClassName('lui-side-nav__footer--text')[0].firstChild;
      parent.removeChild(child);
      document.getElementsByClassName('lui-side-nav__footer--text')[0].appendChild(aPrivacyPolicy);
      let aLegal = document.createElement('a');
      const linkTextLegal = document.createTextNode('Legal');
      aLegal.appendChild(linkTextLegal);
      aLegal.href = 'https://www.sap.com/about/legal/impressum.html';
      aLegal.target = '_blank';
      document.getElementsByClassName('lui-side-nav__footer--text')[0].appendChild(aLegal);
    } catch (e) {
      console.error('Something went wrong!', e);
    }
  }, 1000);
})();
