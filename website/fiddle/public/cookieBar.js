(function() {
  var cAcc = false;
  if (localStorage) {
    cAcc = localStorage.getItem('cookiesAccepted');
  }
  if (!cAcc) {
    var cookiebar = document.createElement('div');
    cookiebar.setAttribute('id', 'ext-cookiebar');
    cookiebar.appendChild(document.createTextNode('We use cookies for the best online experience. '));

    var priv_link = document.createElement('a');
    priv_link.appendChild(document.createTextNode('Read our Privacy Statement'));
    priv_link.setAttribute('href', 'https://www.sap.com/about/legal/impressum.html');
    priv_link.setAttribute('target', '_blank');
    cookiebar.appendChild(priv_link);

    var closeBtn = document.createElement('button');
    closeBtn.appendChild(document.createTextNode('Close'));
    closeBtn.setAttribute(
      'onclick',
      'if(localStorage) { localStorage.setItem("cookiesAccepted","true"); } ' +
        'document.getElementById("ext-cookiebar").remove();'
    );
    closeBtn.setAttribute(
      'style',
      'background-color: #2deb8a; padding: 5px; margin: 0 0 0 20px; border-radius: 5px; cursor: pointer; border-style: none;'
    );
    cookiebar.appendChild(closeBtn);

    document.body.appendChild(cookiebar);
  }
})();
