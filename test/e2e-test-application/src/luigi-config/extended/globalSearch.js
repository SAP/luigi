class GlobalSearch {
  constructor() {
    this.searchResult = [];
  }

  searchProvider = {
    onInput: () => {
      if (Luigi.globalSearch().getSearchString() === '') {
        this.searchResult = [];
        Luigi.globalSearch().closeSearchResult();
      }
    },
    onEnter: () => {
      let nodes = Luigi.getConfigValue('navigation.nodes');
      for (let i = 0; i < nodes.length; i++) {
        if (
          nodes[i].label &&
          nodes[i].label.includes(Luigi.globalSearch().getSearchString())
        ) {
          let searchResultItem = {
            pathObject: {
              path: nodes[i].pathSegment ? nodes[i].pathSegment : '',
              params: {} // can be used by linkmanager.navigate(path).withParams(params)
            },
            label: nodes[i].label,
            description: nodes[i].viewUrl ? nodes[i].viewUrl : '',
            onActivate() {}
          };
          this.searchResult.push(searchResultItem);
        }
      }
      if (this.searchResult.length > 0) {
        Luigi.globalSearch().showSearchResult(this.searchResult);
      } else {
        Luigi.globalSearch().showSearchResult([
          {
            pathObject: {
              path: '',
              params: {} // can be used by linkmanager.navigate(path).withParams(params)
            },
            label: 'Nothing found',
            description: '',
            onActivate() {}
          }
        ]);
      }
    },
    onEscape: () => {
      Luigi.globalSearch().closeSearchResult();
      Luigi.globalSearch().clearSearchField();
      this.searchResult = [];
    },
    customResultRenderer: searchResultItem => {},
    onSearchResultItemSelected: searchResultItem => {}
  };
}

export const globalSearch = new GlobalSearch();
