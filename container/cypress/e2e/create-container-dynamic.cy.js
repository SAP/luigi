// describe('Create container dynamically', () => {
//     const tetsPage = 'http://localhost:8080/index3.html';
//     describe('luigi container', () => {
//         it('luigi container webcomponent object selfRegistered', () => {
//             cy.once('uncaught:exception', () => false);
//             const scriptCode = `
//             const lc = document.querySelector('#lc');
//             lc.viewurl = "./helloWorldWCSelfRegistered.js";
//             lc.webcomponent = { "selfRegistered": "true" };
//             lc.context = { title: 'Nested' }
//             `;

//             const htmlCode = `
//             <luigi-container id="lc" data-test-id="luigi-container"></luigi-container>
//               <script>${scriptCode}</script>
//             `;


//             const stub = cy.stub();
//             cy.on('window:alert', stub);
//             cy.visit(tetsPage);
//             cy.get('.content').invoke('append', htmlCode);
//             cy.get('[data-test-id="luigi-container"]')
//                 .shadow()
//                 .find(
//                     'luigi-wc-687474703a2f2f6c6f63616c686f73743a383038302f68656c6c6f576f726c64574353656c66526567697374657265642e6a73'
//                 )
//                 .shadow()
//                 .find('section')
//                 .should('contain.text', 'Hello World (self registered)!');
//         });
//         it('luigi container webcomponent is true', () => {
//             cy.once('uncaught:exception', () => false);
//             const scriptCode = `
//             const lc = document.querySelector('#lc');
//             lc.viewurl = "./helloWorldWC.js";
//             lc.webcomponent = true;
//             lc.context = { title: 'Nested' }
//             `;

//             const htmlCode = `
//             <luigi-container id="lc" data-test-id="luigi-container"></luigi-container>
//               <script>${scriptCode}</script>
//             `;

//             const stub = cy.stub();
//             cy.on('window:alert', stub);
//             cy.visit(tetsPage);
//             cy.get('.content').invoke('append', htmlCode);
//             cy.get('[data-test-id="luigi-container"]')
//                 .shadow()
//                 .find('luigi-wc-687474703a2f2f6c6f63616c686f73743a383038302f68656c6c6f576f726c6457432e6a73')
//                 .shadow()
//                 .find('section')
//                 .should('contain.text', 'Nested');
//         });
//         it('luigi container webcomponent invalid value for attributes e.g. client-permissions ', () => {
//             const scriptCode = `
//             const lc = document.querySelector('#lc');
//             lc.viewurl = "./helloWorldWCSelfRegistered.js";
//             lc.webcomponent = { "selfRegistered": "true" };
//             `;

//             const htmlCode = `
//             <luigi-container id="lc" data-test-id="luigi-container" client-permissions="value should be an object"></luigi-container>
//               <script>${scriptCode}</script>
//             `;

//             const stub = cy.stub();
//             cy.on('window:alert', stub);
//             cy.visit(tetsPage);
//             cy.get('.content').invoke('append', htmlCode);
//             cy.get('[data-test-id="luigi-container"]')
//                 .shadow()
//                 .find(
//                     'luigi-wc-687474703a2f2f6c6f63616c686f73743a383038302f68656c6c6f576f726c64574353656c66526567697374657265642e6a73'
//                 )
//                 .should('not.exist');
//         });
//     });
//     describe('luigi compound container', () => {
//         it('luigi compound container webcomponent object selfRegistered', () => {
//             const scriptCode = `
//             <script>
//                 const content = document.querySelector('.content');
//                 const wc = document.createElement('luigi-compound-container');
//                 wc.context = { title: 'Nested' }
//                 wc.viewurl = 'https://luigiwebcomponents.gitlab.io/nested2.js';


//                 wc.compoundConfig = {
//                     eventListeners: [
//                         {
//                             source: "*",
//                             name: 'buttonPressed',
//                             action: 'changeColor',
//                             dataConverter: (data) => {
//                                 var rd = () => {
//                                     return Math.round(Math.random() * 255);
//                                 };

//                                 return {
//                                     color1: "251,244,199",
//                                     color2: "255,149,219"
//                                 }
//                             }
//                         }
//                     ],
//                     children: [{
//                         viewUrl: 'https://luigiwebcomponents.gitlab.io/layouts/panelHeader.js',
//                         context: {
//                             title: 'My Awesome Grid',
//                             description: 'Really awesome'
//                         },
//                         layoutConfig: {
//                             slot: "header"
//                         },
//                         eventListeners: [{
//                             source: 'input1',
//                             name: 'sendInput',
//                             action: 'update',
//                             dataConverter: (data) => {
//                                 return 'new text: ' + data;
//                             }
//                         }]
//                     }, {
//                         viewUrl: 'https://luigiwebcomponents.gitlab.io/layouts/panelFooter.js',
//                         context: {
//                             footer: 'This is the end of awesomeness'
//                         },
//                         layoutConfig: {
//                             slot: "footer"
//                         }
//                     }, {
//                         viewUrl: 'https://luigiwebcomponents.gitlab.io/luigiwebcomponentmf/main.js',
//                         layoutConfig: {
//                             slot: "content"
//                         },
//                         context: {
//                             label: 'I am nested!'
//                         }
//                     }, {
//                         viewUrl: 'https://team-phteven.gitlab.io/joke-of-the-day-wc/main.js',
//                         context: {
//                             apiUrl: 'https://edenhauser.com/stupidb/?db=unijokes_db&random',
//                             fontScale: '0.5'
//                         },
//                         eventListeners: [{
//                             source: "*",
//                             name: 'buttonPressed',
//                             action: 'update'
//                         }]
//                     }, {
//                         viewUrl: 'https://luigiwebcomponents.gitlab.io/luigi-wc-mfe/main.js',
//                         context: {
//                             label: 'Update Joke',
//                             showAlert: false
//                         }
//                     }]
//                 };
//                 content.appendChild(wc);
//                 </script>
//            `;
//             const stub = cy.stub();
//             cy.on('window:alert', stub);
//             cy.visit(tetsPage);
//             cy.get('.content').invoke('append', scriptCode);
//             cy.get('luigi-compound-container')
//                 .shadow()
//                 .then($container => {
//                     return cy
//                         .wrap($container)
//                         .find(
//                             'luigi-wc-68747470733a2f2f6c75696769776562636f6d706f6e656e74732e6769746c61622e696f2f6e6573746564322e6a73'
//                         )
//                         .shadow();
//                 })
//                 .then($innerContainer => {
//                     cy.wrap($innerContainer)
//                         .get(
//                             'luigi-wc-68747470733a2f2f6c75696769776562636f6d706f6e656e74732e6769746c61622e696f2f6c756967692d77632d6d66652f6d61696e2e6a73'
//                         )
//                         .should('exist')
//                         .shadow()
//                         .find('section')
//                         .should('contain.text', 'This is a luigi micro frontend, based on web components.');
//                 });
//         });
//         it('luigi compound container invalid JSON in context property', () => {
//             const scriptCode = `
//             <script>
//                 const content = document.querySelector('.content');
//                 const wc = document.createElement('luigi-compound-container');
//                 wc.context = '{"invalid": "JSON}'
//                 wc.viewurl = 'https://luigiwebcomponents.gitlab.io/nested2.js';


//                 wc.compoundConfig = {
//                     eventListeners: [
//                         {
//                             source: "*",
//                             name: 'buttonPressed',
//                             action: 'changeColor',
//                             dataConverter: (data) => {
//                                 var rd = () => {
//                                     return Math.round(Math.random() * 255);
//                                 };

//                                 return {
//                                     color1: "251,244,199",
//                                     color2: "255,149,219"
//                                 }
//                             }
//                         }
//                     ],
//                     children: [{
//                         viewUrl: 'https://luigiwebcomponents.gitlab.io/layouts/panelHeader.js',
//                         context: {
//                             title: 'My Awesome Grid',
//                             description: 'Really awesome'
//                         },
//                         layoutConfig: {
//                             slot: "header"
//                         },
//                         eventListeners: [{
//                             source: 'input1',
//                             name: 'sendInput',
//                             action: 'update',
//                             dataConverter: (data) => {
//                                 return 'new text: ' + data;
//                             }
//                         }]
//                     }, {
//                         viewUrl: 'https://luigiwebcomponents.gitlab.io/layouts/panelFooter.js',
//                         context: {
//                             footer: 'This is the end of awesomeness'
//                         },
//                         layoutConfig: {
//                             slot: "footer"
//                         }
//                     }, {
//                         viewUrl: 'https://luigiwebcomponents.gitlab.io/luigiwebcomponentmf/main.js',
//                         layoutConfig: {
//                             slot: "content"
//                         },
//                         context: {
//                             label: 'I am nested!'
//                         }
//                     }, {
//                         viewUrl: 'https://team-phteven.gitlab.io/joke-of-the-day-wc/main.js',
//                         context: {
//                             apiUrl: 'https://edenhauser.com/stupidb/?db=unijokes_db&random',
//                             fontScale: '0.5'
//                         },
//                         eventListeners: [{
//                             source: "*",
//                             name: 'buttonPressed',
//                             action: 'update'
//                         }]
//                     }, {
//                         viewUrl: 'https://luigiwebcomponents.gitlab.io/luigi-wc-mfe/main.js',
//                         context: {
//                             label: 'Update Joke',
//                             showAlert: false
//                         }
//                     }]
//                 };
//                 content.appendChild(wc);
//                 </script>
//            `;
//             const stub = cy.stub();
//             cy.on('window:alert', stub);
//             cy.visit(tetsPage);
//             cy.get('.content').invoke('append', scriptCode);

//             cy.get('luigi-compound-container')
//                 .shadow()
//                 .then($container => {
//                     cy.wrap($container)
//                         .find(
//                             'luigi-wc-68747470733a2f2f6c75696769776562636f6d706f6e656e74732e6769746c61622e696f2f6e6573746564322e6a73'
//                         )
//                         .should('not.exist');
//                 });
//         });
//     });
// });
