describe('Simple Examples Iframe Container Test', () => {
  beforeEach(() => {
    // cy.visit('http://localhost:2222');
    cy.visit('http://localhost:8080');
    // cy.visit('http://localhost:2222/container-wc/index.html');
  });

  // it('Iframe Container Test', () => {
  //   cy.visit('http://localhost:2222/container-iframe/index.html');

  //   cy.get('luigi-container')
  //     .shadow()
  //     .get('iframe')
  //     .then(iframe => {
  //       const $body = iframe.contents().find('body');
  //       cy.wrap($body).contains('This is an iframe based microfrontend container');
  //     });
  // });

  it.only('test - same as wc-container', () => {
    // cy.visit('http://localhost:2222/container-wc/index.html');

    cy.get('.testCl')
    .contains('Test001')

    cy.wait(10000);
    cy.get('[data-test-id="luigi-client-api-test-01"]')
      .shadow()
      // .get('main')
      // .get('main', {timeout: 50000})
      // .children()
      // .first()
      // .shadow()
      // .shadow(undefined, { timeout: 50000 })
      // .find('h2')
      // .should('contain.text', 'This is a webcomponent based microfrontend container ');
      .contains('This is a webcomponent based microfrontend container');
  });

  it(
    'WebComponent Container Test- get main exist',
    {
      defaultCommandTimeout: 10000
    },
    () => {
      cy.visit('http://localhost:2222/container-wc/index.html');

      // cy.get('[data-test-id="luigi-container-element"]')
      // .shadow()
      // .contains('This is a webcomponent based microfrontend container  -- some content --')

      cy.wait(1000);

      // cy.get('luigi-container', { timeout: 50000 })

      cy.get('luigi-container')
        .shadow()
        .get('main')
        .should('exist');
    }
  );

  it(
    'WebComponent Container Test - get main children exist',
    {
      defaultCommandTimeout: 10000
    },
    () => {
      cy.visit('http://localhost:2222/container-wc/index.html');

      // cy.get('[data-test-id="luigi-container-element"]')
      // .shadow()
      // .contains('This is a webcomponent based microfrontend container  -- some content --')

      cy.wait(1000);

      // cy.get('luigi-container', { timeout: 50000 })

      cy.get('luigi-container')
        .shadow()
        .get('main')
        .children()
        .should('exist');
    }
  );

  it(
    'WebComponent Container Test - get main children first exist first',
    {
      defaultCommandTimeout: 10000
    },
    () => {
      cy.visit('http://localhost:2222/container-wc/index.html');

      // cy.get('[data-test-id="luigi-container-element"]')
      // .shadow()
      // .contains('This is a webcomponent based microfrontend container  -- some content --')

      cy.wait(1000);

      // cy.get('luigi-container', { timeout: 50000 })

      cy.get('luigi-container')
        .shadow()
        .get('main')
        .children()
        .first()
        .should('exist');
    }
  );

  it(
    'WebComponent Container Test - children get main children exist',
    {
      defaultCommandTimeout: 10000
    },
    () => {
      cy.visit('http://localhost:2222/container-wc/index.html');

      // cy.get('[data-test-id="luigi-container-element"]')
      // .shadow()
      // .contains('This is a webcomponent based microfrontend container  -- some content --')

      cy.wait(1000);

      // cy.get('luigi-container', { timeout: 50000 })

      cy.get('luigi-container')
        .shadow()
        .children()
        .get('main')
        .children()
        .should('exist');
    }
  );

  it(
    'WebComponent Container Test - children get main children shadow exist',
    {
      defaultCommandTimeout: 10000
    },
    () => {
      cy.visit('http://localhost:2222/container-wc/index.html');

      // cy.get('[data-test-id="luigi-container-element"]')
      // .shadow()
      // .contains('This is a webcomponent based microfrontend container  -- some content --')

      cy.wait(1000);

      // cy.get('luigi-container', { timeout: 50000 })

      cy.get('luigi-container')
        .shadow()
        .children()
        .get('main')
        .children()
        // .shadow()
        .should('exist');
    }
  );

  it(
    'WebComponent Container Test - children get main children shadow exist -find h2',
    {
      defaultCommandTimeout: 10000
    },
    () => {
      cy.visit('http://localhost:2222/container-wc/index.html');

      // cy.get('[data-test-id="luigi-container-element"]')
      // .shadow()
      // .contains('This is a webcomponent based microfrontend container  -- some content --')

      cy.wait(1000);

      // cy.get('luigi-container', { timeout: 50000 })

      cy.get('luigi-container')
        .shadow()
        .children()
        .get('main')
        .children()
        .find('h2');
    }
  );

  it(
    'WebComponent Container Test - children get main children shadow exist -find h2 - contains no shadow',
    {
      defaultCommandTimeout: 10000
    },
    () => {
      cy.visit('http://localhost:2222/container-wc/index.html');

      // cy.get('[data-test-id="luigi-container-element"]')
      // .shadow()
      // .contains('This is a webcomponent based microfrontend container  -- some content --')

      cy.wait(1000);

      // cy.get('luigi-container', { timeout: 50000 })

      cy.get('luigi-container')
        .shadow()
        .children()
        .get('main')
        .children()
        .contains('his is a webcomponent based microfrontend container');
    }
  );

  it(
    'WebComponent Container Test - children get main children shadow exist -find h2 + shadow + cotnains',
    {
      defaultCommandTimeout: 10000
    },
    () => {
      cy.visit('http://localhost:2222/container-wc/index.html');

      // cy.get('[data-test-id="luigi-container-element"]')
      // .shadow()
      // .contains('This is a webcomponent based microfrontend container  -- some content --')

      cy.wait(1000);

      // cy.get('luigi-container', { timeout: 50000 })

      cy.get('luigi-container')
        .shadow()
        .children()
        .get('main')
        .children()
        .shadow()
        .contains('his is a webcomponent based microfrontend container');
    }
  );

  it(
    'WebComponent Container Test - cotnain text',
    {
      defaultCommandTimeout: 10000
    },
    () => {
      cy.visit('http://localhost:2222/container-wc/index.html');

      cy.get('luigi-container')
        .shadow()
        .get('main')
        // .get('main', {timeout: 50000})
        .children()
        .first()
        .shadow()
        // .shadow(undefined, { timeout: 50000 })
        // .find('h2')
        .should('contain.text', 'This is a webcomponent based microfrontend container  -- some content --');
    }
  );
});
