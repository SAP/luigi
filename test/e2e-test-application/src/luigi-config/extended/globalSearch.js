class GlobalSearch {
  constructor() {
    this.searchResult = [];
  }
  searchFieldCentered= true;
  searchProvider = {
    // onInput: () => {},
    // onEnter: () => {},
    // onEscape: () => {},
    // customSearchResultRenderer: (searchResults, slot, searchApiObj) => {},
    // customSearchResultItemRenderer: (
    //   searchResultItem,
    //   slot,
    //   searchApiObj
    // ) => {},
    // onSearchResultItemSelected: searchResultItem => {},

    inputPlaceholder: 'Digit here text to search....',
    // inputPlaceholder: () => 'Digit here text to search....',
    // inputPlaceholder: {
    //   en: 'Digit here text to search....'
    // },

    toggleSearch: (inputElem, fieldVisible) => {
      // Luigi.showAlert({
      //   text: `In toggleSearch: element visible=${fieldVisible}`,
      //   type: 'info',
      //   closeAfter: 1500
      // });
      inputElem.setAttribute('data-toggleSearch', fieldVisible ? 'open' : 'close');
    },

    onInput: () => {
      if (Luigi.globalSearch().getSearchString() === '') {
        this.searchResult = [];
        Luigi.globalSearch().closeSearchResult();
      } else {
        this.searchResult = [];
        let searchResultItem1 = {
          pathObject: {
            link: '/settings',
            params: { foo: 'bar' }
          },
          label: 'Settings',
          description: 'settings',
          onActivate() {
            Luigi.globalSearch().closeSearchResult();
          }
        };
        let searchResultItem1a = {
          pathObject: {
            link: '/settings'
          },
          label: 'Settings w/o parameters',
          description: 'Testing a label description which has a long text to fit on mobile nicely',
          onActivate() {
            Luigi.globalSearch().closeSearchResult();
          }
        };
        let searchResultItem2 = {
          pathObject: {
            link: '/projects'
          },
          label: 'Projects',
          description: 'projects',
          onActivate() {
            Luigi.globalSearch().closeSearchResult();
          }
        };
        let searchResultItem3 = {
          pathObject: {
            link: '/projects/pr2'
          },
          label: 'Projects 2',
          description: 'projects 2',
          onActivate() {
            Luigi.globalSearch().closeSearchResult();
          }
        };
        let searchResultItem4 = {
          pathObject: {
            externalLink: {
              url: 'https://www.hybris.com',
              sameWindow: false
            }
          },
          label: 'hybris GmbH',
          description: 'hybris',
          onActivate() {
            Luigi.globalSearch().closeSearchResult();
          }
        };
        this.searchResult.push(
          searchResultItem1,
          searchResultItem1a,
          searchResultItem2,
          searchResultItem3,
          searchResultItem4
        );
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
      }
    },
    onEnter: () => {},
    onEscape: () => {
      Luigi.globalSearch().closeSearchResult();
      Luigi.globalSearch().clearSearchField();
      this.searchResult = [];
    },
    // customSearchResultRenderer: (searchResults, slot, searchApiObj) => {
    //   let div = document.createElement('div');
    //   div.setAttribute(
    //     'class',
    //     'fd-popover__body fd-popover__body--right luigi-search__popover__body'
    //   );
    //   let nav = document.createElement('nav');
    //   nav.setAttribute('class', 'fd-menu');
    //   let ul = document.createElement('ul');
    //   ul.setAttribute('class', 'fd-menu__list fd-menu__list--top');
    //   for (let i = 0; i < searchResults.length; i++) {
    //     let li = document.createElement('li');
    //     li.setAttribute('class', 'fd-menu__item');
    //     li.setAttribute(
    //       'style',
    //       'background-color:green;border:1px solid red;'
    //     );
    //     let a = document.createElement('a');
    //     a.addEventListener('click', e => {
    //       console.log('e', e);
    //       searchApiObj.fireItemSelected(searchResults[i]);
    //     });
    //     a.setAttribute('class', 'fd-menu__link');
    //     let span = document.createElement('span');
    //     span.setAttribute('class', 'fd-menu__title');
    //     span.innerHTML = searchResults[i].label;
    //     a.appendChild(span);
    //     li.appendChild(a);
    //     ul.appendChild(li);
    //   }
    //   nav.appendChild(ul);
    //   div.appendChild(nav);
    //   slot.appendChild(div);
    // },
    // customSearchResultItemRenderer(searchResultItem, slot, searchApiObj) {
    //   let a = document.createElement('a');
    //   a.setAttribute('class', 'fd-menu__link');
    //   a.setAttribute('style', 'fd-menu__link" style="background-color:yellow;border:1px solid blue;');
    //   a.addEventListener('click', () => {
    //     searchApiObj.fireItemSelected(searchResultItem);
    //   })
    //   let span = document.createElement('span');
    //   span.setAttribute('class', "fd-menu__title");
    //   span.innerHTML = searchResultItem.label;
    //   a.appendChild(span);
    //   slot.appendChild(a);
    // },
    onSearchResultItemSelected: searchResultItem => {
      var self = this;
      if (searchResultItem.pathObject.externalLink) {
        window.open(searchResultItem.pathObject.externalLink.url, '_blank');
      } else if (searchResultItem.pathObject.link && !searchResultItem.pathObject.params) {
        Luigi.navigation().navigate(searchResultItem.pathObject.link);
      } else if (searchResultItem.pathObject.link && searchResultItem.pathObject.params) {
        Luigi.navigation()
          .withParams(searchResultItem.pathObject.params)
          .navigate(searchResultItem.pathObject.link);
      }
      Luigi.globalSearch().closeSearchResult();
      Luigi.globalSearch().clearSearchField();
      this.searchResult = [];
    }
  };
}

export const globalSearch = new GlobalSearch();
