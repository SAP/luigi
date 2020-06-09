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
      // for (let i = 0; i < nodes.length; i++) {
      //   if (
      //     nodes[i] && nodes[i].label &&
      //     nodes[i].label.includes(Luigi.globalSearch().getSearchString())
      //   ) {
      //     let searchResultItem = {
      //       pathObject: {
      //         path: nodes[i].pathSegment ? '/' + nodes[i].pathSegment : nodes[i].link,
      //         params: { 'foo': 'bar' } // can be used by linkmanager.navigate(path).withParams(params)
      //       },
      //       label: nodes[i].label,
      //       description: nodes[i].viewUrl ? nodes[i].viewUrl : '',
      //       onActivate() {
      //         Luigi.globalSearch().closeSearchResult();
      //       }
      //     };
      //     if (nodes[i].externalLink && nodes[i].externalLink.url) {
      //       searchResultItem.pathObject.externalLink = {};
      //       searchResultItem.pathObject.externalLink.url = nodes[i].externalLink.url
      //     }
      //     this.searchResult.push(searchResultItem);
      //   }
      // }
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
        label: 'Settings ohne params',
        description: 'settings',
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
