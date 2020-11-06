
import ResultRender from './resultRender'
import {algoliaSearcher} from './algoliaSearcher'

class GlobalSearch {

  constructor() {
    this.minSearchLength = 3;
  }

  searchProvider = {
    onInput: () => {
      let query = Luigi.globalSearch().getSearchString();
      if (query.length < this.minSearchLength){
        //to short to be searched, please grow up
        return;
      }
      algoliaSearcher.executeSearch(query);
    },

    onEnter: () => {
       //Nothing to do
    },

    onEscape: () => {
      Luigi.globalSearch().closeSearchResult();
      Luigi.globalSearch().clearSearchField();
    },

    customSearchResultRenderer: (searchResults, slot, searchApiObj) => {
      let query = searchResults.shift();
      let resultRender = new ResultRender(query, searchResults);
      let resultSpan = resultRender.buildDomResults();
      slot.appendChild(resultSpan);
    },

    disableInputHandlers: {
      type: false
    }
  }
}

export const globalSearch = new GlobalSearch();

