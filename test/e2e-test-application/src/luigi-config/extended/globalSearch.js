class GlobalSearch {
  searchProvider = {
    onInput: () => {
      console.log('searchValue ', Luigi.globalSearch().getSearchString());
      let searchResult = [];
      for (let i = 0; i < 10; i++) {
        let searchResultItem = {
          pathObject: {
            path: 'overview',
            params: {} // can be used by linkmanager.navigate(path).withParams(params)
          },
          label: 'label' + i,
          description: 'description' + i,
          onActivate() {}
        };
        searchResult.push(searchResultItem);
      }
      Luigi.globalSearch().showSearchResult(searchResult);
    },
    onEnter: () => {},
    onEscape: () => {},
    customResultRenderer: searchResultItem => {},
    onSearchResultItemSelected: searchResultItem => {}
  };
}

export const globalSearch = new GlobalSearch();
