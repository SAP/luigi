/** @typedef {import('../../../src/types/connector').LuigiConnector} LuigiConnector */
/** @typedef {import('../../../src/luigi').Luigi} Luigi */

function storeExpandedState(uid, expanded) {
  const stored = localStorage.getItem('luigi.preferences.navigation.expandedCategories');
  try {
    const arr = stored ? JSON.parse(stored) : [];
    arr.push(uid);
    localStorage.setItem('luigi.preferences.navigation.expandedCategories', JSON.stringify(arr));
  } catch (e) {
    // ?
  }
}

function readExpandedState(uid) {
  const stored = localStorage.getItem('luigi.preferences.navigation.expandedCategories');
  try {
    return JSON.parse(stored).includes(uid);
  } catch (e) {
    // ?
  }
  return false;
}

function addShellbarItem(shellbar, item) {
  const itemEl = document.createElement('ui5-shellbar-item');
  itemEl.setAttribute('icon', item.icon);
  itemEl.setAttribute('text', item.label);
  itemEl.setAttribute('luigi-route', item.pathSegment);
  itemEl.addEventListener('click', () => {
    globalThis.Luigi.navigation().navigate(itemEl.getAttribute('luigi-route'));
  });
  shellbar.appendChild(itemEl);
}

/** @type {LuigiConnector} */
const connector = {
  renderMainLayout: () => {
    if (!document.getElementById('app')) {
      const appRoot = document.createElement('div');
      appRoot.id = 'app';
      appRoot.classList.add('tool-layout');
      appRoot.innerHTML = `
        <ui5-shellbar></ui5-shellbar>
        <ui5-side-navigation></ui5-side-navigation>
        <div class="content"></div>
      `;
      document.body.appendChild(appRoot);
    }
  },

  renderTopNav: topNavData => {
    const shellbar = document.querySelector('.tool-layout > ui5-shellbar');
    shellbar.setAttribute('primary-title', topNavData.appTitle);

    if (!shellbar._lastTopNavData) {
      // initial rendering
      let html = '';
      html += '<ui5-button icon="menu" slot="startButton" id="toggle"></ui5-button>';
      if (topNavData.logo) {
        html += `<img
            slot="logo"
            src="${topNavData.logo}"
          />`;
      }
      if (!shellbar._logoEL) {
        shellbar._logoEL = () => {
          globalThis.Luigi.navigation().navigate('/');
        };
        shellbar.addEventListener('logo-click', shellbar._logoEL);
      }
      shellbar.innerHTML = html;

      (topNavData.topNodes || []).forEach(item => {
        addShellbarItem(shellbar, item);
      });
      // ...
    } else {
      // partial update
      if (topNavData.logo !== shellbar._lastTopNavData.logo) {
        shellbar.querySelector('img[slot=logo]').setAttribute('src', topNavData.logo);
      }
      if (topNavData.topNodes !== shellbar._lastTopNavData.topNodes) {
        shellbar.querySelectorAll('ui5-shellbar-item').forEach(item => item.remove());
        (topNavData.topNodes || []).forEach(item => {
          addShellbarItem(shellbar, item);
        });
      }
    }

    shellbar._lastTopNavData = topNavData;
  },
  renderLeftNav: leftNavData => {
    const sidenav = document.querySelector('ui5-side-navigation');
    const burger = document.getElementById('toggle');
    if (sidenav && burger) {
      if (!burger._clickListener) {
        burger._clickListener = () => {
          sidenav.toggleAttribute('collapsed');
        };
        burger.addEventListener('click', burger._clickListener);
      }

      let html = '';

      if (leftNavData.items) {
        console.log(leftNavData);
        leftNavData.items.forEach(item => {
          if (item.node) {
            html += `<ui5-side-navigation-item
                                    text="${item.node.label}"
                                    icon="${item.node.icon}"
                                    luigi-route="${leftNavData.basePath + '/' + item.node.pathSegment}"
                                    ${item.selected ? 'selected' : ''}
                                    ></ui5-side-navigation-item>`;
          } else if (item.category?.nodes?.length > 0) {
            html += `<ui5-side-navigation-item
                                    text="${item.category.label}"
                                    icon="${item.category.icon}"
                                    category-uid="${leftNavData.basePath + ':' + item.category.id}"
                                    ${
                                      readExpandedState(leftNavData.basePath + ':' + item.category.id) ? 'expanded' : ''
                                    }>`;

            item.category.nodes.forEach(item => {
              html += `<ui5-side-navigation-sub-item
                                    text="${item.node.label}"
                                    icon="${item.node.icon}"
                                    luigi-route="${leftNavData.basePath + '/' + item.node.pathSegment}"
                                    ${item.selected ? 'selected' : ''}
                                    ></ui5-side-navigation-sub-item>`;
            });

            html += '</ui5-side-navigation-item>';
          }
        });
      }

      document.body.classList.toggle('left-nav-hidden', !(leftNavData.items?.length > 0));
      sidenav.innerHTML = html;

      const items = sidenav.querySelectorAll('[luigi-route]');
      if (items) {
        items.forEach(item => {
          item.addEventListener('click', () => {
            globalThis.Luigi.navigation().navigate(item.getAttribute('luigi-route'));
          });
        });
      }

      if (!sidenav._observer) {
        sidenav._observer = new MutationObserver(mutations => {
          mutations.forEach(function(mutation) {
            if (mutation.type === 'attributes') {
              const uid = mutation.target.getAttribute('category-uid');
              storeExpandedState(uid, mutation.target.hasAttribute('expanded'));
            }
          });
        });

        sidenav._observer.observe(sidenav, {
          attributes: true,
          subtree: true,
          attributeFilter: ['expanded']
        });
      }
      const categories = sidenav.querySelectorAll('[category-uid]');
      if (categories) {
        categories.forEach(item => {
          item.addEventListener('click', event => {
            if (event instanceof CustomEvent) {
              event.target.toggleAttribute('expanded');
            }
            event.stopImmediatePropagation();
            event.stopPropagation();
            event.preventDefault();
            return true;
          });
        });
      }
    }
  },
  getContainerWrapper: () => {
    return document.querySelector('.tool-layout > .content');
  },
  renderModal: (lc, modalSettings) => {
    const dialog = document.createElement('ui5-dialog');
    dialog.classList.add('lui-dialog');
    dialog.setAttribute('header-text', modalSettings?.title);
    dialog.appendChild(lc);

    const bar = document.createElement('ui5-bar');
    bar.setAttribute('slot', 'header');
    bar.innerHTML = `<ui5-title level="H5" slot="startContent">${modalSettings?.title}</ui5-title>`;
    dialog.appendChild(bar);
    const btn = document.createElement('ui5-button');
    btn.innerHTML = 'X';
    btn.onclick = () => {
      dialog.open = false;
    };
    btn.setAttribute('slot', 'endContent');
    bar.appendChild(btn);

    document.body.appendChild(dialog);
    dialog.addEventListener('close', () => {
      console.log('close');
      //document.body.removeChild(dialog);
    });
    dialog.open = true;
  },
  renderTabNav: () => {
    // TBD
  }
};

// eslint-disable-next-line no-undef
Luigi.bootstrap(connector);
