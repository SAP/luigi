const connector = {
    renderTopNav: (topNavData) => {
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
        (topNavData.topNodes || []).forEach(n => {
            html += `<ui5-shellbar-item icon="${n.icon}" text="${n.label}" luigi-route="${n.pathSegment}"></ui5-shellbar-item>`;
        });
        shellbar.innerHTML = html;
        const items = shellbar.querySelectorAll('ui5-shellbar-item');
        if (items) {
            items.forEach(item => {
                item.addEventListener('click', () => {
                    Luigi.navigation().navigate(item.getAttribute('luigi-route'));
                });
            });
        }
        //...
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
                leftNavData.items.forEach(item => {
                    if (item.node) {
                        html += `<ui5-side-navigation-item
                                    text="${item.node.label}"
                                    icon="${item.node.icon}"
                                    luigi-route="${leftNavData.basePath + '/' + item.node.pathSegment}"
                                    ${item.selected ? 'selected' : ''}
                                    ></ui5-side-navigation-item>`;
                    } else if (item.category) {
                        // tbd
                    }
                });
            }

            document.body.classList.toggle('left-nav-hidden', !(leftNavData.items?.length > 0));
            sidenav.innerHTML = html;

            const items = sidenav.querySelectorAll('[luigi-route]');
            if (items) {
                items.forEach(item => {
                    item.addEventListener('click', () => {
                        Luigi.navigation().navigate(item.getAttribute('luigi-route'));
                    });
                });
            }
        }
    },
    renderContent: (navNode) => {
        const contentContainer = document.querySelector('.tool-layout > .content');
        contentContainer.innerHTML = '';
        const lc = document.createElement('luigi-container');
        lc.setAttribute('viewUrl', navNode.viewUrl);
        lc.webcomponent = navNode.webcomponent;
        lc.context = navNode.context;
        contentContainer.appendChild(lc);
    }
};

// eslint-disable-next-line no-undef
Luigi.bootstrap(connector);
