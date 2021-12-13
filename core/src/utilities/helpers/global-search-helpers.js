/* istanbul ignore file */
class GlobalSearchHelperClass {
  constructor() {}

  handleVisibilityGlobalSearch() {
    const globalSearchCtn = document.querySelector('.lui-global-search');
    const condition = globalSearchCtn.offsetWidth <= 384;
    globalSearchCtn.classList.toggle('lui-global-search-toggle', condition);
  }
}

export const GlobalSearchHelper = new GlobalSearchHelperClass();
