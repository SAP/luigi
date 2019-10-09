let defaultConfig = `Luigi.setConfig({
    navigation: { 
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
                    pathSegment: 'tiles', 
                    label: 'Tiles', 
                    category: 'Fundamental Demo Pages',
                    loadingIndicator: {
                        enabled: false
                    },
                    viewUrl: '/examples/microfrontends/fundamental/tiles-demo-page.html'
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
                }] 
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
                        url: 'https://github.com/kyma-project/luigi'
                    }
                },{
                    label: 'SAP Fiori Fundamentals',
                    externalLink : { 
                        url: 'https://sap.github.io/fundamental/index.html'
                    }
                },{
                    label: 'Fiori Icons',
                    externalLink : { 
                        url: 'https://sap.github.io/fundamental/components/icon.html'
                    }
                }]
            }],
            productSwitcher: {
                items: [{
                    icon: 'https://raw.githubusercontent.com/kyma-project/kyma/master/logo.png',
                    label: 'Kyma on github',
                    externalLink: {
                      url: 'https://github.com/kyma-project',
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
        /***
        // uncomment if you want to use our mocked oidc idp
        auth: {
            use: 'mockAuth',
            mockAuth: {
                authorizeUrl: '/auth/idpmock/implicit.html',
                logoutUrl: '/auth/idpmock/logout.html',
                post_logout_redirect_uri: '/auth/logout.html',
                authorizeMethod: 'GET',
                oAuthData: {
                  client_id: 'egDuozijY5SVr0NSIowUP1dT6RVqHnlp',
                  redirect_uri: '/auth/callback.html'
                }
            }
        },*/
        routing: { 
            useHashRouting: true 
        }, 
        settings: { 
            responsiveNavigation: 'semiCollapsible',
            header: { 
                logo: 'img/luigi.png', 
                title: 'Luigi Fiddle'
            } 
        } 
    });    
`;
export default defaultConfig;


