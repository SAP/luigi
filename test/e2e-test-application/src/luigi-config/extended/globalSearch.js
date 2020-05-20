class GlobalSearch {
  // searchResultItem = {
  //   pathObject: {
  //     path: 'projects/pr1',
  //     params: {} // can be used by linkmanager.navigate(path).withParams(params)
  //   },
  //   label: 'Project 1',
  //   description: 'You can find info about project one',
  //   onActivate() { }
  // }
  searchProvider = {
    onInput: () => {}
  };
  onEnter = () => {};
  onEscape = () => {};
  customResultRenderer = searchResultItem => {};
  onSearchResultItemSelected = searchResultItem => {};
}

export const globalSearch = new GlobalSearch();
