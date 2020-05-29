class GlobalSearch {
  searchProvider = {
    onInput: () => {
      console.log('searchValue ', Luigi.globalSearch().getSearchString());
      // let searchResultItem = {
      //   pathObject: {
      //     path,
      //     params: {} // can be used by linkmanager.navigate(path).withParams(params)
      //   },
      //   label,
      //   description,
      //   onActivate() {}
      // };
      //Luigi.globalSearch().showSearchResult([searchResultItem]);
    },
    onEnter: () => {},
    onEscape: () => {},
    customResultRenderer: searchResultItem => {},
    onSearchResultItemSelected: searchResultItem => {}
  };
}

export const globalSearch = new GlobalSearch();
