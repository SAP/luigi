import docsearch from 'docsearch.js';
class GlobalSearch {
  enabled = true;
  docSearchConfig = {
    apiKey: '5ab04e0673d89f07c964afcf1522ad3a',
    indexName: 'luigi-project',
    inputSelector: '.fd-shellbar__action--desktop .luigi-search__input',
    debug: true
  };
  docSearchConfigMobile = {
    apiKey: '5ab04e0673d89f07c964afcf1522ad3a',
    indexName: 'luigi-project',
    inputSelector: '.fd-shellbar__action--mobile .luigi-search__input',
    debug: true
  };
  search = {
    customSearch: e => {
      return new Promise((resolve, reject) => {
        if (e.keyCode === 13) {
          return resolve(['search something crazy']);
        }
      });
    },
    //algolia
    initDocSearch: () => {
      console.log(
        document.querySelector(
          '.fd-shellbar__action--desktop .luigi-search__input'
        )
      );
      docsearch(this.docSearchConfig);
      console.log(
        document.querySelector(
          '.fd-shellbar__action--mobile .luigi-search__input'
        )
      );
      docsearch(this.docSearchConfigMobile);
    }
  };
}

export const globalSearch = new GlobalSearch();
