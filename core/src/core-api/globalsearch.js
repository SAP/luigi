/**
 * Functions to use Luigi Global Search
 * @name GlobalSearch
 */
class LuigiGlobalSearch {
  /**
   * Open the global search field
   * @memberof LuigiGlobalSearch
   * @example Luigi.globalSearch().openSearchField()
   */
  openSearchField() {
    Luigi.openSearchField();
  }

  /**
   * Close the global search field
   * @memberof LuigiGlobalSearch
   * @example Luigi.globalSearch().closeSearchField()
   */
  closeSearchField() {
    Luigi.closeSearchField();
  }

  /**
   * Clear the global search field
   * @memberof LuigiGlobalSearch
   * @example Luigi.globalSearch().clearSearchField()
   */
  clearSearchField() {
    if (document.querySelector('.luigi-search__input')) {
      document.querySelector('.luigi-search__input').value = '';
    }
  }

  /**
              * Open the global search result. By standard it is a popover
              * @memberof LuigiGlobalSearch
              * @param array of search result items
              * @example 
              * Luigi.globalSearch().showSearchResult(
              * [
              *   {
                      pathObject: {
                          path,
                          params: {}// can be used by linkmanager.navigate(path).withParams(params)
                      },
                      label,
                      description,
                      onActivate() { }
                  }
              * ])
              */
  showSearchResult(arr) {}

  /**
   * Close the global search result. By standard it is a popover
   * @memberof LuigiGlobalSearch
   * @example Luigi.globalSearch().closeSearchResult()
   */
  closeSearchResult() {}

  /**
   * Get the value of the search input field
   * @memberof LuigiGlobalSearch
   * @example Luigi.globalSearch().getSearchString()
   */
  getSearchString() {
    return Luigi.getGlobalSearchString();
  }

  /**
   * Set the value of the search input field
   * @memberof LuigiGlobalSearch
   * @example Luigi.globalSearch().getSearchString()
   */
  setSearchString(searchString) {
    Luigi.setGlobalSearchString(searchString);
  }
}
export const globalSearch = new LuigiGlobalSearch();
