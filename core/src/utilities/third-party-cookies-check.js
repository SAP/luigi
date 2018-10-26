window.addEventListener(
  'message',
  function(e) {
    if (e.data === 'luigi.3pcDisabled') {
      console.warn(
        'Third party cookies are not supported! Silent token renewal might not work!'
      );
    }
  },
  false
);
