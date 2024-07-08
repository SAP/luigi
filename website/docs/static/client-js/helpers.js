// set to true so all accordions and other data is expanded to allow for better SEO. If not search bot its minimized by default
let predicate = true;

if (typeof window !== 'undefined') {
  // client-only code here
  predicate = /docsearch|algolia|bot|googlebot|crawler|spider|robot|crawling/i.test(navigator.userAgent);
}

export const isSearchBot = predicate;
