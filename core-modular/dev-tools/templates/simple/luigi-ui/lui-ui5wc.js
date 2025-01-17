/** @typedef {import('../../../../src/types/connector').LuigiConnector} LuigiConnector */
/** @typedef {import('../../../../src/luigi').Luigi} Luigi */

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

function renderProductSwitcherItems(productSwitcherConfig) {
  document.querySelector('.tool-layout > #productswitch-popover')?.remove();
  const productSwitchPopover = document.createElement('ui5-popover');
  const productSwitch = document.createElement('ui5-product-switch');
  productSwitchPopover.setAttribute('id', 'productswitch-popover');
  productSwitchPopover.setAttribute('placement', 'Bottom');
  productSwitchPopover.appendChild(productSwitch);
  productSwitcherConfig.items?.forEach((item) => {
    const productSwitchItem = document.createElement('ui5-product-switch-item');
    item.altText && productSwitchItem.setAttribute('alt', item.altText);
    item.label && productSwitchItem.setAttribute('title-text', item.label);
    item.icon && productSwitchItem.setAttribute('icon', item.icon);
    item.testId && productSwitchItem.setAttribute('data-testid', item.testId);
    item.subTitle && productSwitchItem.setAttribute('subtitle-text', item.subTitle);
    if (item.link) {
      productSwitchItem.setAttribute('luigi-route', item.link);
    } else if (item.externalLink?.url) {
      productSwitchItem.setAttribute('luigi-external-route', item.externalLink.url);
      item.externalLink.sameWindow ??
        productSwitchItem.setAttribute('luigi-external-route-samewindow', item.externalLink.sameWindow);
    }
    productSwitch.appendChild(productSwitchItem);
  });

  document.querySelector('.tool-layout').appendChild(productSwitchPopover);
}

function onProductSwitcherClick(event) {
  const popover = document.getElementById('productswitch-popover');
  if (popover.open) {
    popover.open = false;
  } else {
    event.preventDefault();
    popover.opener = event.detail.targetRef;
    popover.open = true;
  }
}

const replacePlaceholdersWithUI5Links = (text, linksObj) => {
  const container = document.createElement('div');
  container.innerHTML = text;

  for (const key in linksObj) {
    const linkKey = `{${key}}`;
    const linkData = linksObj[key];

    if (container.innerHTML.includes(linkKey)) {
      const ui5Link = document.createElement('ui5-link');
      ui5Link.setAttribute('luigiAlertLink', key);
      ui5Link.innerText = linkData.text;
      container.innerHTML = container.innerHTML.replace(linkKey, ui5Link.outerHTML);
    }
  }

  return container.innerHTML;
};

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
        <div class="content-wrapper">
          <ui5-tabcontainer collapsed fixed></ui5-tabcontainer>
          <div class="content"></div>
        </div>
        <div class="luigi-alert--overlay"><div> 
      `;
      document.body.appendChild(appRoot);
    }
  },

  renderTopNav: (topNavData) => {
    const shellbar = document.querySelector('.tool-layout > ui5-shellbar');
    shellbar.setAttribute('primary-title', topNavData.appTitle);

    if (topNavData.productSwitcher) {
      console.log('testesafasdf');
      shellbar.removeEventListener('product-switch-click', onProductSwitcherClick);
      shellbar.setAttribute('show-product-switch', '');
      renderProductSwitcherItems(topNavData.productSwitcher);
      shellbar.addEventListener('product-switch-click', onProductSwitcherClick);
      [...document.querySelectorAll('ui5-toggle-button')].forEach((el) => {
        el.addEventListener('click', (event) => {
          const toggleButton = event.target;
          toggleButton.icon = toggleButton.pressed ? 'sap-icon://da-2' : 'sap-icon://da';
        });
      });
      const items = document.querySelector('ui5-product-switch').querySelectorAll('[luigi-route]');
      if (items) {
        items.forEach((item) => {
          item.addEventListener('click', () => {
            globalThis.Luigi.navigation().navigate(item.getAttribute('luigi-route'));
            document.getElementById('productswitch-popover').open = false;
          });
        });
      }
      const itemsExternalLink = document.querySelector('ui5-product-switch').querySelectorAll('[luigi-external-route]');
      if (itemsExternalLink) {
        itemsExternalLink.forEach((item) => {
          item.addEventListener('click', () => {
            const sameWindow = item.getAttribute('luigi-external-route-samewindow');
            window.open(item.getAttribute('luigi-external-route'), sameWindow ? '_self' : '_blank').focus();
          });
        });
      }
    }

    // if(topNavData.profile){
    //   console.log('topNavData.profile', topNavData.profile);
    // }

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
      // html+=`<ui5-avatar slot="profile" shape="Circle" size="M" initials="CI" color-scheme="Accent7"></ui5-avatar>`;
      // shellbar.addEventListener('profile-click', Profile)
      shellbar.innerHTML = html;

      (topNavData.topNodes || []).forEach((item) => {
        addShellbarItem(shellbar, item);
      });
      // ...
    } else {
      // partial update
      if (topNavData.logo !== shellbar._lastTopNavData.logo) {
        shellbar.querySelector('img[slot=logo]').setAttribute('src', topNavData.logo);
      }
      if (topNavData.topNodes !== shellbar._lastTopNavData.topNodes) {
        shellbar.querySelectorAll('ui5-shellbar-item').forEach((item) => item.remove());
        (topNavData.topNodes || []).forEach((item) => {
          addShellbarItem(shellbar, item);
        });
      }
    }

    shellbar._lastTopNavData = topNavData;
  },
  renderLeftNav: (leftNavData) => {
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
        leftNavData.items.forEach((item) => {
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

            item.category.nodes.forEach((item) => {
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
        items.forEach((item) => {
          item.addEventListener('click', () => {
            globalThis.Luigi.navigation().navigate(item.getAttribute('luigi-route'));
          });
        });
      }

      if (!sidenav._observer) {
        sidenav._observer = new MutationObserver((mutations) => {
          mutations.forEach(function (mutation) {
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
        categories.forEach((item) => {
          item.addEventListener('click', (event) => {
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
    return document.querySelector('.tool-layout > .content-wrapper > .content');
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

  renderTabNav: (tabNavData) => {
    const tabcontainer = document.querySelector('ui5-tabcontainer');
    if (tabcontainer) tabcontainer.innerHTML = '';
    if (Object.keys(tabNavData).length === 0) {
      document.querySelector('.content-wrapper > ui5-tabcontainer')?.classList.add('ui5-tabcontainer-hidden');
      return;
    }
    document.querySelector('.content-wrapper > ui5-tabcontainer')?.classList.remove('ui5-tabcontainer-hidden');
    tabcontainer?.addEventListener('tab-select', (event) => {
      const customEvent = event;
      const selectedTab = customEvent.detail.tab;
      if (selectedTab.getAttribute('luigi-route'))
        globalThis.Luigi.navigation().navigate(selectedTab.getAttribute('luigi-route'));
    });
    tabNavData.items.forEach((item) => {
      const tab = document.createElement('ui5-tab');
      if (item.node) {
        tab.setAttribute('text', `${item.node.label}`);
        tab.setAttribute('luigi-route', tabNavData.basePath + '/' + item.node.pathSegment);
        item.selected ? item.selected && tab.setAttribute('selected', '') : '';
      } else if (item.category) {
        tab.setAttribute('text', item.category.label || item.category.id);
        item.category.nodes?.forEach((subItem) => {
          const subTab = document.createElement('ui5-tab');
          subTab.setAttribute('slot', 'items');
          subTab.setAttribute('text', subItem.node?.label || subItem.node?.pathSegment || '');
          subItem.selected ? subItem.selected && subTab.setAttribute('selected', '') : '';
          subTab.setAttribute('luigi-route', tabNavData.basePath + '/' + subItem.node?.pathSegment);
          tab.appendChild(subTab);
        });
      }
      tabcontainer?.appendChild(tab);
    });
  },

  renderAlert(alertSettings, alertHandler) {
      const alertContainer = document.querySelector('.luigi-alert--overlay');
      const alertTypeMap = {
        info: 'Information',
        success: 'Positive',
        warning: 'Critical',
        error: 'Negative'
      };
      const messageStrip = document.createElement('ui5-message-strip');
      messageStrip.setAttribute('design', `${alertTypeMap[alertSettings.type]}`);
      messageStrip.innerHTML = replacePlaceholdersWithUI5Links(
        alertSettings.text,
        alertSettings.links
      );

      alertContainer?.appendChild(messageStrip);
      const luigiAlertLinks = messageStrip.querySelectorAll('[luigiAlertLink]');
      luigiAlertLinks?.forEach((luigiAlertLink) => {
        luigiAlertLink.addEventListener('click', (event) => {
          event.preventDefault();
          const linkKey = luigiAlertLink.getAttribute('luigiAlertLink');
          alertHandler.link(linkKey) && alertContainer.removeChild(messageStrip);
        });
      });
      messageStrip.addEventListener('close', () => {
        alertHandler.close(true);
        alertContainer.removeChild(messageStrip);
      });

      if (alertSettings.closeAfter) {
        setTimeout(() => {
          alertHandler.close(true);
          if (messageStrip.parentElement === alertContainer) {
            alertContainer.removeChild(messageStrip);
          }
        }, alertSettings.closeAfter);
      }
  },
  renderConfirmationModal(settings) {
    return new Promise((resolve) => {
      const iconMapping = {
        confirmation: 'None',
        information: 'Information',
        warning: 'Negative',
        error: 'Critical',
        success: 'Positive'
      };
      'None' | 'Positive' | 'Critical' | 'Negative' | 'Information';

      if (!settings || settings == {})
        settings = {
          icon: 'question-mark',
          header: 'Confirmation',
          body: 'Are you sure you want to do this?',
          buttonDismiss: 'No',
          buttonConfirm: 'Yes',
          type: 'confirmation'
        };
      const dialog = document.createElement('ui5-dialog');
      dialog.classList.add('lui-confirmation-modal');
      dialog.setAttribute('header-text', settings?.header);
      dialog.setAttribute('state', `${iconMapping[settings.icon || 'confirmation']}`);

      const text = document.createElement('p');
      text.innerHTML = settings.body || '';
      dialog.appendChild(text);

      const ui5Toolbar = document.createElement('ui5-toolbar');
      ui5Toolbar.setAttribute('slot', 'footer');
      const ui5ToolBarBtnConfirm = document.createElement('ui5-toolbar-button');
      settings.buttonConfirm && ui5ToolBarBtnConfirm.setAttribute('text', settings.buttonConfirm);
      ui5ToolBarBtnConfirm.addEventListener('click', () => {
        resolve(true);
        document.body.removeChild(dialog);
      });
      const ui5ToolBarBtnDismiss = document.createElement('ui5-toolbar-button');
      settings.buttonDismiss && ui5ToolBarBtnDismiss.setAttribute('text', settings.buttonDismiss);
      ui5ToolBarBtnDismiss.addEventListener('click', () => {
        resolve(false);
        document.body.removeChild(dialog);
      });
      ui5Toolbar.appendChild(ui5ToolBarBtnConfirm);
      ui5Toolbar.appendChild(ui5ToolBarBtnDismiss);
      dialog.appendChild(ui5Toolbar);
      document.body.appendChild(dialog);
      dialog.open = true;
    });
  }
};

// eslint-disable-next-line no-undef
Luigi.bootstrap(connector);
