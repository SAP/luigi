class DocSearch {
  init() {
    setTimeout(() => {
      if (this.initialized) {
        console.error('Cannot be initialized multiple times.');
        return;
      }
      this.addSearchField();
      this.registerLogic();
      this.initialized = true;
    });
  }

  addSearchField() {
    const createElementFromHTML = (htmlString) => {
      var div = document.createElement('div');
      div.innerHTML = htmlString.trim();
      // Change this to div.childNodes to support multiple top-level nodes
      return div.firstChild; 
    }
    const searchElement = createElementFromHTML(`<div class="fd-shellbar__action">
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

  registerLogic() {
    docsearch({
      apiKey: '5ab04e0673d89f07c964afcf1522ad3a',
      indexName: 'luigi-project',
      inputSelector: '#docsearch',
      debug: true // Set debug to true if you want to inspect the dropdown
    });
    this.searchHidden = true;
    document.getElementById('lui-search-button').addEventListener('click', (e) => {
      e.preventDefault();
      this.searchHidden = !this.searchHidden;
      document.getElementById('lui-search-button').setAttribute('aria-hidden', this.searchHidden);
      document.getElementById('lui-search-field').setAttribute('aria-hidden', !this.searchHidden);
    });
  }
}

export const search = new DocSearch();