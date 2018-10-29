let status = 'not_checked';

window.addEventListener(
  'message',
  function(e) {
    if (e.data === 'luigi.3pcDisabled') {
      console.warn(
        'Third party cookies are not supported! Silent token renewal might not work!'
      );
      status = 'disabled';
    } else if (e.data === 'luigi.3pcEnabled') {
      status = 'enabled';
    }
  },
  false
);

export function thirdPartyCookiesStatus() {
  return status;
}
