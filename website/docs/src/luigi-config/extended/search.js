class DocSearch {
  init() {
    this.isDevelop = parseInt(window.location.port) === 4000;
    console.log('isDevelop', this.isDevelop, window.location.port);
    this.coreBaseUrl = window.location.origin;

    this.initialized = false;
    this.inputActive = false;
    setTimeout(() => {
      if (this.initialized) {
        console.error('Cannot be initialized multiple times.');
        return;
      }
      this.addSearchField();
      this.initDocSearch();
      this.attachHandlers();
      this.initialized = true;
    });
  }

  addSearchField() {
    const createElementFromHTML = htmlString => {
      var div = document.createElement('div');
      div.innerHTML = htmlString.trim();
      // Change this to div.childNodes to support multiple top-level nodes
      return div.firstChild;
    };
    const searchElement = createElementFromHTML(`
      <div class="fd-shellbar__action">
        <div class="fd-search-input fd-search-input--closed">
          <div class="fd-popover">
            <div class="fd-popover__control fd-search-input__control">
              <button class="sap-icon--search fd-button--shell" id="lui-search-button" aria-controls="lui-search-field" aria-expanded="false"
                aria-haspopup="true"></button>
              <div class="fd-search-input__closedcontrol" id="lui-search-field" aria-hidden="true">
                <div class="fd-search-input__controlinput" aria-controls="f7erK342" aria-expanded="false"
                  aria-haspopup="false">
                  <input type="text" class="fd-input" id="docsearch" placeholder="Search Documentation">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>`);
    const shellBar = Luigi.elements().getShellbarActions();
    shellBar.insertBefore(searchElement, shellBar.firstChild);
  }

  initDocSearch() {
    const transformData = suggestions => {
      return suggestions.map(sg => {
        if (this.isDevelop) {
          sg.url = sg.url.replace(
            'https://docs.luigi-project.io',
            this.coreBaseUrl
          );
        }
        sg.url = sg.url.replace('/docu-microfrontend', '');
        return sg;
      });
    };

    const handleSelected = (_, event) => {
      if (
        !event ||
        !event._args ||
        !Array.isArray(event._args) ||
        !event._args[0] ||
        !event._args[0].url
      ) {
        console.debug('Error routing', event);
        return;
      }
      const url = new URL(event._args[0].url);
      const urlWithPath = url.pathname
        .replace(this.coreBaseUrl, '')
        .replace('.md', '')
        .replace('/docu-microfrontend', '');
      if (url.hash) {
        Luigi.navigation()
          .withParams({ section: url.hash.substring(1).toLowerCase() })
          .navigate(urlWithPath);
      } else {
        Luigi.navigation().navigate(urlWithPath);
      }
    };

    const createAlgoliaOptions = () => {
      const algoliaOptions = {
        hitsPerPage: 8
      };

      return {
        apiKey: '5ab04e0673d89f07c964afcf1522ad3a',
        indexName: 'luigi-project',
        inputSelector: '#docsearch',
        autocompleteOptions: {
          debug: this.isDevelop,
          openOnFocus: false,
          autoselect: true,
          hint: true,
          clearOnSelected: true
        },
        algoliaOptions,
        transformData,
        handleSelected
      };
    };
    docsearch(createAlgoliaOptions());
  }

  attachHandlers() {
    const inputEl = document.getElementById('lui-search-field');

    const focusSearch = () => {
      let inputField = document.getElementById('docsearch');
      if (this.inputActive) {
        setTimeout(() => {
          inputField.focus();
        }, 200);
      } else {
        inputField.value = '';
      }
    };

    const toggleInputActive = () => {
      this.inputActive = !this.inputActive;
      const searchButton = document.getElementById('lui-search-button');
      searchButton.setAttribute('aria-hidden', this.inputActive);
      searchButton.setAttribute('aria-expanded', !this.inputActive);
      inputEl.setAttribute('aria-hidden', !this.inputActive);
    };

    document
      .getElementById('lui-search-button')
      .addEventListener('click', e => {
        e.preventDefault();
        toggleInputActive();
        focusSearch();
      });
  }
}

export const search = new DocSearch();
