describe('create luigi-compound-container dynamically', () => {
  const tetsPage = 'http://localhost:8080/compound/dynamic.html';

  it('luigi compound container webcomponent object selfRegistered', () => {
    const scriptCode = `
        <script>
            const content = document.querySelector('.content');
            const wc = document.createElement('luigi-compound-container');
            wc.context = { title: 'Nested' }
            wc.viewurl = 'https://luigiwebcomponents.gitlab.io/nested2.js';

            wc.compoundConfig = {
                eventListeners: [
                    {
                        source: "*",
                        name: 'buttonPressed',
                        action: 'changeColor',
                        dataConverter: (data) => {
                            var rd = () => {
                                return Math.round(Math.random() * 255);
                            };

                            return {
                                color1: "251,244,199",
                                color2: "255,149,219"
                            }
                        }
                    }
                ],
                children: [{
                    viewUrl: 'https://luigiwebcomponents.gitlab.io/layouts/panelHeader.js',
                    context: {
                        title: 'My Awesome Grid',
                        description: 'Really awesome'
                    },
                    layoutConfig: {
                        slot: "header"
                    },
                    eventListeners: [{
                        source: 'input1',
                        name: 'sendInput',
                        action: 'update',
                        dataConverter: (data) => {
                            return 'new text: ' + data;
                        }
                    }]
                }, {
                    viewUrl: 'https://luigiwebcomponents.gitlab.io/layouts/panelFooter.js',
                    context: {
                        footer: 'This is the end of awesomeness'
                    },
                    layoutConfig: {
                        slot: "footer"
                    }
                }, {
                    viewUrl: 'https://luigiwebcomponents.gitlab.io/luigiwebcomponentmf/main.js',
                    layoutConfig: {
                        slot: "content"
                    },
                    context: {
                        label: 'I am nested!'
                    }
                }, {
                    viewUrl: 'https://luigiwebcomponents.gitlab.io/luigi-wc-mfe/main.js',
                    context: {
                        label: 'Update Joke',
                        showAlert: false
                    }
                }]
            };
            content.appendChild(wc);
            </script>
       `;
    const stub = cy.stub();
    cy.on('window:alert', stub);
    cy.visit(tetsPage);
    cy.get('.content').invoke('append', scriptCode);
    cy.get('luigi-compound-container')
      .shadow()
      .then($container => {
        return cy
          .wrap($container)
          .find(
            'luigi-wc-68747470733a2f2f6c75696769776562636f6d706f6e656e74732e6769746c61622e696f2f6e6573746564322e6a73'
          )
          .shadow();
      })
      .then($innerContainer => {
        cy.wrap($innerContainer)
          .get(
            'luigi-wc-68747470733a2f2f6c75696769776562636f6d706f6e656e74732e6769746c61622e696f2f6c756967692d77632d6d66652f6d61696e2e6a73'
          )
          .should('exist')
          .shadow()
          .should('not.exist'); // ShadowRoot in 'closed' mode
      });
  });
  it('luigi compound container invalid JSON in context property', () => {
    const scriptCode = `
        <script>
            const content = document.querySelector('.content');
            const wc = document.createElement('luigi-compound-container');
            wc.context = '{"invalid": "JSON}'
            wc.viewurl = 'https://luigiwebcomponents.gitlab.io/nested2.js';

            wc.compoundConfig = {
                eventListeners: [
                    {
                        source: "*",
                        name: 'buttonPressed',
                        action: 'changeColor',
                        dataConverter: (data) => {
                            var rd = () => {
                                return Math.round(Math.random() * 255);
                            };

                            return {
                                color1: "251,244,199",
                                color2: "255,149,219"
                            }
                        }
                    }
                ],
                children: [{
                    viewUrl: 'https://luigiwebcomponents.gitlab.io/layouts/panelHeader.js',
                    context: {
                        title: 'My Awesome Grid',
                        description: 'Really awesome'
                    },
                    layoutConfig: {
                        slot: "header"
                    },
                    eventListeners: [{
                        source: 'input1',
                        name: 'sendInput',
                        action: 'update',
                        dataConverter: (data) => {
                            return 'new text: ' + data;
                        }
                    }]
                }, {
                    viewUrl: 'https://luigiwebcomponents.gitlab.io/layouts/panelFooter.js',
                    context: {
                        footer: 'This is the end of awesomeness'
                    },
                    layoutConfig: {
                        slot: "footer"
                    }
                }, {
                    viewUrl: 'https://luigiwebcomponents.gitlab.io/luigiwebcomponentmf/main.js',
                    layoutConfig: {
                        slot: "content"
                    },
                    context: {
                        label: 'I am nested!'
                    }
                }, {
                    viewUrl: 'https://luigiwebcomponents.gitlab.io/luigi-wc-mfe/main.js',
                    context: {
                        label: 'Update Joke',
                        showAlert: false
                    }
                }]
            };
            content.appendChild(wc);
            </script>
       `;
    const stub = cy.stub();
    cy.on('window:alert', stub);
    cy.visit(tetsPage);
    cy.get('.content').invoke('append', scriptCode);

    cy.get('luigi-compound-container')
      .shadow()
      .should('not.exist');
  });
  it('luigi compound container with no shadow dom', () => {
    const scriptCode = `
        <script>
            const content = document.querySelector('.content');
            const wc = document.createElement('luigi-compound-container');
            wc.context = { title: 'Nested' }
            wc.viewurl = 'https://luigiwebcomponents.gitlab.io/nested2.js';
            wc.noShadow = true;
            wc.compoundConfig = {
                eventListeners: [
                    {
                        source: "*",
                        name: 'buttonPressed',
                        action: 'changeColor',
                        dataConverter: (data) => {
                            var rd = () => {
                                return Math.round(Math.random() * 255);
                            };

                            return {
                                color1: "251,244,199",
                                color2: "255,149,219"
                            }
                        }
                    }
                ],
                children: [{
                    viewUrl: 'https://luigiwebcomponents.gitlab.io/layouts/panelHeader.js',
                    context: {
                        title: 'My Awesome Grid',
                        description: 'Really awesome'
                    },
                    layoutConfig: {
                        slot: "header"
                    },
                    eventListeners: [{
                        source: 'input1',
                        name: 'sendInput',
                        action: 'update',
                        dataConverter: (data) => {
                            return 'new text: ' + data;
                        }
                    }]
                }, {
                    viewUrl: 'https://luigiwebcomponents.gitlab.io/layouts/panelFooter.js',
                    context: {
                        footer: 'This is the end of awesomeness'
                    },
                    layoutConfig: {
                        slot: "footer"
                    }
                }, {
                    viewUrl: 'https://luigiwebcomponents.gitlab.io/luigiwebcomponentmf/main.js',
                    layoutConfig: {
                        slot: "content"
                    },
                    context: {
                        label: 'I am nested!'
                    }
                }, {
                    viewUrl: 'https://luigiwebcomponents.gitlab.io/luigi-wc-mfe/main.js',
                    context: {
                        label: 'Update Joke',
                        showAlert: false
                    }
                }]
            };
            content.appendChild(wc);
            </script>
       `;
    const stub = cy.stub();
    cy.on('window:alert', stub);
    cy.visit(tetsPage);
    cy.get('.content').invoke('append', scriptCode);
    cy.get('luigi-compound-container')
      .shadow()
      .should('not.exist');
  });
});
