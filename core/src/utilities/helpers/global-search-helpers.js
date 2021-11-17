/* istanbul ignore file */
class GlobalSearchHelperClass {
  constructor() {}

  handleVisibilityGlobalSearch() {
    const globalSearchCtn = document.querySelector('.lui-global-search');
    if (globalSearchCtn.offsetWidth <= 384) {
      globalSearchCtn.classList.add('lui-global-search-toogle');
    } else {
      globalSearchCtn.classList.remove('lui-global-search-toogle');
    }
  }
}

export const GlobalSearchHelper = new GlobalSearchHelperClass();
