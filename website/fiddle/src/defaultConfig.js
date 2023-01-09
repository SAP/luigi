let defaultConfig = `

Luigi.setConfig({
    navigation: { 
            validWebcomponentUrls:['.*?'],
            nodes: [{ 
                pathSegment: 'home', 
                label: 'h', 
                hideFromNav: true, 
                children: [{ 
                    pathSegment: 'overview', 
                    label: 'Overview', 
                    icon: 'home',
                    viewUrl: '/examples/microfrontends/multipurpose.html',
                    context: {
                        title: 'Welcome to Luigi Fiddle!',
                        content: 'Click on "Modify Config" at the bottom right and play around with your Luigi configuration'
                    }
                },{ 
                    pathSegment: 'empty', 
                    label: 'Empty Page', 
                    category: {
                        label: 'Fundamental Demo Pages',
                        icon: 'dimension',
                        collapsible: true
                    },
                    loadingIndicator: {
                        enabled: false
                    },
                    viewUrl: '/examples/microfrontends/fundamental/empty-demo-page.html'
                },{ 
                    pathSegment: 'table', 
                    label: 'Table', 
                    category: 'Fundamental Demo Pages',
                    loadingIndicator: {
                        enabled: false
                    },
                    viewUrl: '/examples/microfrontends/fundamental/table-demo-page.html'
                },{ 
                    pathSegment: 'tree', 
                    label: 'Tree', 
                    category: 'Fundamental Demo Pages',
                    loadingIndicator: {
                        enabled: false
                    },
                    viewUrl: '/examples/microfrontends/fundamental/tree-demo-page.html'
                },{ 
                    pathSegment: 'ui5qs', 
                    label: 'Quickstart', 
                    category: {
                        label: 'UI5 Demo Pages',
                        icon: 'sap-ui5',
                        collapsible: true
                    },
                    viewUrl: '/examples/microfrontends/ui5qs/'
                },{ 
                    pathSegment: 'ui5sc', 
                    label: 'Shopping Cart', 
                    category:  'UI5 Demo Pages',
                    hideSideNav: true,
                    loadingIndicator: {
                        enabled: false
                    },
                    viewUrl: 'https://sapui5.netweaver.ondemand.com/test-resources/sap/m/demokit/cart/webapp/index.html'
                },{ 
                    pathSegment: 'wc1', 
                    label: 'WC Editable List', 
                    loadingIndicator: { enabled: false },
                    category: {
                        label: 'Web Component',
                        icon: 'cloud',
                        collapsible: true
                    },
                    viewUrl: '/wc/list.js',
                    webcomponent: true,
                    openNodeInModal: false
                },{ 
                    pathSegment: 'wc2', 
                    label: 'WC Luigi Client', 
                    category:  'Web Component',
                    loadingIndicator: {
                        enabled: false
                    },
                    viewUrl: '/wc/luigiExampleWC.js',
                    webcomponent: true,
                    openNodeInModal: false
               
                },
                { 
                    pathSegment: 'wc3', 
                    label: 'WC UI5 Web Components', 
                    category:  'Web Component',
                    loadingIndicator: {
                        enabled: false
                    },
                    viewUrl: '/wc/ui5/ui5example.js',
                    webcomponent: true,
                    openNodeInModal: false
               
                }
                ] 
            },{ 
                pathSegment: 'foo', 
                label: 'Some Action',
                icon: 'favorite-list',
                viewUrl: '/examples/microfrontends/multipurpose.html',
                hideSideNav: true,
                context: {
                    title: 'Left navigation hidden',
                    content: 'for pages needing more space or wanting to handle navigation internally'  
                }
            },{ 
                pathSegment: 'help', 
                label: 'Help',
                icon: 'sys-help',
                viewUrl: '/examples/microfrontends/multipurpose.html',
                context: {
                    title: 'Help Section',
                    content: 'Find some useful links on the left'  
                },
                children: [{
                    label: 'Back',
                    link: '/',
                    icon: 'nav-back'
                },{
                    label: 'Luigi Github Page',
                    externalLink : { 
                        url: 'https://github.com/SAP/luigi'
                    }
                },{
                    label: 'Fundamental Library',
                    externalLink : { 
                        url: 'https://sap.github.io/fundamental-styles'
                    }
                },{
                    label: 'Fundamental Icons',
                    externalLink : { 
                        url: 'https://sap.github.io/fundamental-styles/components/icon.html'
                    }
                }]
            }],
            productSwitcher: {
                items: [{
                    icon: 'https://raw.githubusercontent.com/SAP/luigi/master/website/landingpage/public/assets/img/logos/sap.svg',
                    label: 'SAP homepage',
                    externalLink: {
                      url: 'https://www.sap.com',
                      sameWindow: false
                    }
                },{
                    icon: 'https://svelte.technology/favicon.ico',
                    label: 'Svelte',
                    externalLink: {
                      url: 'https://svelte.technology',
                      sameWindow: false
                    }
                }]
            } 
        }, 
        
        // uncomment if you want to use our mock oidc idp
        /**
        auth: {
            // We have registered the following provider at the window object:
            // OAuth2 Implicit Grant: window.LuigiAuthOAuth2 - Docs: https://docs.luigi-project.io/docs/authorization-configuration?section=oauth2-implicit-grant-configuration
            // OIDC Implicit Grant: window.LuigiAuthOIDC - Docs: https://docs.luigi-project.io/docs/authorization-configuration/?section=openid-connect-configuration
 
            use: 'myOAuth2',
            myOAuth2: {
                idpProvider: window.LuigiAuthOAuth2,
                authorizeUrl: '/auth/idpmock/implicit.html',
                logoutUrl: '/auth/idpmock/logout.html',
                post_logout_redirect_uri: '/auth/logout.html',
                authorizeMethod: 'GET',
                oAuthData: {
                  client_id: 'egDuozijY5SVr0NSIowUP1dT6RVqHnlp',
                  redirect_uri: '/auth/callback.html'
                }
            }
        },
        */
        routing: { 
            useHashRouting: true 
        }, 
        settings: { 
            responsiveNavigation: 'semiCollapsible',
            header: { 
                logo: 'img/luigi.png', 
                title: 'Luigi Fiddle'
            },
            burgerTooltip: {
                navExpanded: 'Collapse navigation',
                navCollapsed: 'Expand navigation'
            }
        }
    });    
`;
export default defaultConfig;
