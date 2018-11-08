let status = 'not_checked';

window.addEventListener(
  'message',
  function(e) {
    if (e.data === 'luigi.tpcDisabled') {
      console.warn(
        'Third party cookies are not supported! Silent token renewal might not work!'
      );
      status = 'disabled';
    } else if (e.data === 'luigi.tpcEnabled') {
      status = 'enabled';
    }
  },
  false
);

export function thirdPartyCookiesStatus() {
  return status;
}
