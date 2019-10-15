window.onload = function () {
    const redirectUrl = decodeURIComponent(window.location.href.match(/redirect_uri=(.*?)(&|$)/)[1]);
    if(redirectUrl.indexOf('https://fiddle.luigi-project.io/') == 0) {        
        const state = decodeURIComponent(window.location.href.match(/state=(.*?)(&|$)/)[1]);
        const expiresIn = 3600;
        const goTo = `${redirectUrl}#
          expires_in=${expiresIn}&
          state=${state}&
          access_token=thisisanaccesstokenthatisnotreallyneeded&
          id_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
          eyJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjQyMDAiLCJzdWIiOiJtYXNrb3BhdG9sIiwiZXhwIjoxNjQzNzY0OTIwLCJhe
          nAiOiJtYXNrb3BhdG9sIiwibm9uY2UiOiJidE5rWVZzc1FldVlWNmEyR1RVZm1wWVFFelBRN3c1ZENCbU54SG54IiwiZW
          1haWwiOiJsdWlnaXVzZXJAa3ltYS5jeCJ9.80GanA3z-Rl67VQAb-lvMNpDZKcVI32CQZIoM9imF5w&
          token_type=bearer`;
        const loginButton = document.getElementById('login-button');
        loginButton.addEventListener('click', function (ev) {
            ev.preventDefault();
            window.location = removeIndent(goTo);
        });
    } else {
        loginButton.addEventListener('click', function (ev) {
            ev.preventDefault();
            alert('Invalid redirect_uri: ' + redirectUrl);
        });
    }
    function removeIndent(goToString) {
        return goToString.replace(/\s\s+/g, '');
    }
};
