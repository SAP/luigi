/** @typedef {import('../../../src/types/connector').LuigiConnector} LuigiConnector */
/** @typedef {import('../../../src/luigi').Luigi} Luigi */

/** @type {LuigiConnector} */
const connector = {
  renderTopNav: topNavData => {
    const shellbar = document.querySelector('.tool-layout > ui5-shellbar');
    shellbar.setAttribute('primary-title', topNavData.appTitle);
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
    (topNavData.topNodes || []).forEach(n => {
      html += `<ui5-shellbar-item icon="${n.icon}" text="${n.label}" luigi-route="${n.pathSegment}"></ui5-shellbar-item>`;
    });
    shellbar.innerHTML = html;
    const items = shellbar.querySelectorAll('ui5-shellbar-item');
    if (items) {
      items.forEach(item => {
        item.addEventListener('click', () => {
          globalThis.Luigi.navigation().navigate(item.getAttribute('luigi-route'));
        });
      });
    }
    // ...
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
                                    >`;

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
    }
  },
  getContainerWrapper: () => {
    return document.querySelector('.tool-layout > .content');
  }
};

// eslint-disable-next-line no-undef
Luigi.bootstrap(connector);
