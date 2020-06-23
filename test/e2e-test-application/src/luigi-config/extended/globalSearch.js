class GlobalSearch {
  constructor() {
    this.searchResult = [];
  }

  searchProvider = {
    onInput: () => {},
    onEnter: () => {},
    onEscape: () => {},
    customSearchResultRenderer: (searchResults, slot, searchApiObj) => {},
    customSearchResultItemRenderer: (
      searchResultItem,
      slot,
      searchApiObj
    ) => {},
    onSearchResultItemSelected: searchResultItem => {}
  };
}

export const globalSearch = new GlobalSearch();
