window.onload = function () {
    const loginButton = document.getElementById('login-button');
    const expiresIn = 3600;
    const goTo = `/auth/callback.html#
      expires_in=${expiresIn}&
      state=somestate&
      access_token=thisisanaccesstokenthatisnotreallyneeded&
      id_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
      eyJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjQyMDAiLCJzdWIiOiJtYXNrb3BhdG9sIiwiZXhwIjoxNjQzNzY0OTIwLCJhe
      nAiOiJtYXNrb3BhdG9sIiwibm9uY2UiOiJidE5rWVZzc1FldVlWNmEyR1RVZm1wWVFFelBRN3c1ZENCbU54SG54IiwiZW
      1haWwiOiJsdWlnaXVzZXJAa3ltYS5jeCJ9.80GanA3z-Rl67VQAb-lvMNpDZKcVI32CQZIoM9imF5w&
      token_type=bearer`;

    loginButton.addEventListener('click', function (ev) {
        ev.preventDefault();
        window.location.replace('');
    });
};
