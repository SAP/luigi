describe('Luigi client lifecycle manager features', () => {
  beforeEach(() => {
    cy.visitLoggedIn('/');
  });

  it('setAnchor with wc luigi client', () => {
    cy.visitLoggedIn('/projects/pr1/webcomponent');
    cy.expectPathToBe('/projects/pr1/webcomponent');
    cy.url().should('not.contain', 'LuigiRocks');
    cy.get(
      '.wcContainer luigi-wc-687474703a2f2f6c6f63616c686f73743a343230302f6173736574732f68656c6c6f576f726c6457432e6a733f656e'
    )
      .shadow()
      .contains('setAnchor')
      .click();
    cy.url().should('include', 'LuigiRocks');
  });

  it('get/add node params with wc luigi client', () => {
    const stub = cy.stub().as('alertStub');

    cy.on('window:alert', stub);
    cy.visitLoggedIn('/projects/pr1/webcomponent');
    cy.expectPathToBe('/projects/pr1/webcomponent');
    cy.get(
      '.wcContainer luigi-wc-687474703a2f2f6c6f63616c686f73743a343230302f6173736574732f68656c6c6f576f726c6457432e6a733f656e'
    )
      .shadow()
      .contains('addNodeParams')
      .click();
    cy.url().should('include', '?%7ELuigi=rocks');
    cy.get(
      '.wcContainer luigi-wc-687474703a2f2f6c6f63616c686f73743a343230302f6173736574732f68656c6c6f576f726c6457432e6a733f656e'
    )
      .shadow()
      .contains('getNodeParams')
      .click();
    cy.get('@alertStub').should('be.calledOnceWith', '{"Luigi":"rocks"}');
  });

  it('getCoreSearchParams', () => {
    const stub = cy.stub().as('alertStub');

    cy.on('window:alert', stub);
    cy.visitLoggedIn('/projects/pr1/webcomponent2?testParam=searchParam1');
    cy.expectPathToBe('/projects/pr1/webcomponent2');

    cy.get(
      '.wcContainer luigi-wc-687474703a2f2f6c6f63616c686f73743a343230302f6173736574732f68656c6c6f576f726c6457432e6a733f656e'
    )
      .shadow()
      .contains('getCoreSearchParams')
      .click();
    cy.get('@alertStub').should('be.calledOnceWith', '{"testParam":"searchParam1"}');
  });

  it('getClientPermissions', () => {
    const stub = cy.stub().as('alertStub');

    cy.on('window:alert', stub);
    cy.visitLoggedIn('/projects/pr1/webcomponent2');
    cy.expectPathToBe('/projects/pr1/webcomponent2');

    cy.get(
      '.wcContainer luigi-wc-687474703a2f2f6c6f63616c686f73743a343230302f6173736574732f68656c6c6f576f726c6457432e6a733f656e'
    )
      .shadow()
      .contains('getClientPermissions')
      .click();
    cy.get('@alertStub').should(
      'be.calledOnceWith',
      '{"changeCurrentLocale":true,"urlParameters":{"testParam":{"read":true}}}'
    );
  });
});
