(function() {
  setTimeout(function(){
    try {
      let a = document.createElement('a');
      const linkText = document.createTextNode("Privacy Policy");
      a.appendChild(linkText);
      a.href = "https://www.sap.com/about/legal/privacy.html";
      a.target = "_blank";
      const parent = document.getElementsByClassName("lui-side-nav__footer--text")[0];
      const child = document.getElementsByClassName("lui-side-nav__footer--text")[0].firstChild;
      parent.removeChild(child);
      document.getElementsByClassName("lui-side-nav__footer--text")[0].appendChild(a);
    } catch(e) {
      console.error('Something went wrong!', e);
    }
  }, 1000);
})();