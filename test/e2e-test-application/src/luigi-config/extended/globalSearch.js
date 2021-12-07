class GlobalSearch {
  constructor() {
    this.searchResult = [];
  }

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

        Luigi.config.navigation.nodes.map(n => {
          if (n.pathSegment && !n.children && n.label) {
            this.searchResult.push({
              pathObject: {
                link: `/${n.pathSegment}`
              },
              label: n.label,
              description: n.label,
              onActivate() {
                Luigi.globalSearch().closeSearchResult();
              }
            });
          } else if (Array.isArray(n.children) && n.label) {
            if (n.children.length > 0) {
              for (let k = 0; k < n.children.length; k++) {
                if (n.label && n.children[k].label) {
                  this.searchResult.push({
                    pathObject: {
                      link: `/${n.pathSegment}/${n.children[k].pathSegment}`
                    },
                    label: `${n.label} ${n.children[k].label}`,
                    description: `${n.label} ${n.children[k].label}`,
                    onActivate() {
                      Luigi.globalSearch().closeSearchResult();
                    }
                  });
                }
              }
            }
          }
        });

        Luigi.config.navigation.nodes[1].children().then(childrens => {
          childrens[0]
            .children('pr1')
            .then(nodes => {
              for (let j = 0; j < nodes.length; j++) {
                if (nodes[j].pathSegment) {
                  this.searchResult.push({
                    pathObject: {
                      link: `/projects/pr1/${nodes[j].pathSegment}`
                    },
                    label: `${nodes[j].label}`,
                    description: `${nodes[j].label}`,
                    onActivate() {
                      Luigi.globalSearch().closeSearchResult();
                    }
                  });
                }
              }
              return this.searchResult;
            })
            .then(r => {
              const result = this.searchResult.filter(res =>
                res.label.toLowerCase().includes(
                  Luigi.globalSearch()
                    .getSearchString()
                    .toLowerCase()
                )
              );

              if (result.length > 0) {
                Luigi.globalSearch().showSearchResult(result);
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
            });
        });
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
