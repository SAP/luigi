/* istanbul ignore file */
class GlobalSearchHelperClass {
  constructor() {}

  handleVisibilityGlobalSearch() {
    const globalSearchCtn = document.querySelector('.lui-global-search');
    if (globalSearchCtn.offsetWidth <= 384) {
      globalSearchCtn.classList.add('lui-global-search-toggle');
    } else {
      globalSearchCtn.classList.remove('lui-global-search-toggle');
    }
  }
}

export const GlobalSearchHelper = new GlobalSearchHelperClass();
