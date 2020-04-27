import docsearch from 'docsearch.js';
class GlobalSearch {
  enabled = true;
  docsearchOBj = {
    apiKey: '5ab04e0673d89f07c964afcf1522ad3a',
    indexName: 'luigi-project',
    inputSelector: '#luigi-globalSearch',
    debug: true
  };
  search = {
    customSearch: e => {
      return new Promise((resolve, reject) => {
        if (e.keyCode === 13) {
          return resolve(['search something crazy', 'more crazy stuff']);
        }
      });
    },
    //algolia
    triggerDocSearch: () => {
      console.log('test');
      docsearch(this.docsearchOBj);
    }
  };
}

export const globalSearch = new GlobalSearch();
