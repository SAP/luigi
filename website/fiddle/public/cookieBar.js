(function() {
    var cAcc = false;
    if(localStorage) {
      cAcc = localStorage.getItem('cookiesAccepted');
    }
    if(!cAcc) {
      var cookiebar = document.createElement("div");
      var cb_style = "position: fixed; bottom: 0; width: 100%; background: rgba(0,0,0,.6); z-index: 1000;"+
        " font-size: 12px; color: white; text-align: center; padding: 5px;"
      cookiebar.setAttribute("style", cb_style);       
      cookiebar.setAttribute("id", "ext-cookiebar");   
      cookiebar.appendChild(document.createTextNode("We use cookies for the best online experience."));

      var priv_link = document.createElement("a");
      priv_link.appendChild(document.createTextNode(" Read our Privacy Statement"));
      priv_link.setAttribute("href", "https://www.sap.com/corporate/en/legal/privacy.html");
      priv_link.setAttribute("target", "_blank");
      cookiebar.appendChild(priv_link);

      var closeBtn = document.createElement("button");
      closeBtn.appendChild(document.createTextNode("Close"));
      closeBtn.setAttribute("onclick", 'if(localStorage) { localStorage.setItem("cookiesAccepted","true"); } '+
                'document.getElementById("ext-cookiebar").remove();');
      closeBtn.setAttribute("style", "background-color: #2deb8a; padding: 5px; margin-left: 20px; border-radius: 5px; cursor: pointer;");
      cookiebar.appendChild(closeBtn);

      document.body.appendChild(cookiebar);
    }
  })();
