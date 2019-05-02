describe('Navigation', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.login('tets@email.com', 'tets');
  });

  it('Click around using navigation', () => {
    // projects page
    cy.get('.fd-shellbar')
      .contains('Projects')
      .click();

    //projects page
    cy.get('.fd-app__sidebar').should('contain', 'Project One');
    cy.get('.fd-app__sidebar').should('contain', 'Project Two');
    cy.get('.fd-app__sidebar')
      .contains('Project One')
      .click();

    //project one page
    cy.expectPathToBe('/projects/pr1');

    cy.get('.fd-app__sidebar').should('not.contain', 'Project One');
    cy.get('.fd-app__sidebar').should('contain', 'Miscellaneous2');
    cy.get('.fd-app__sidebar')
      .contains('Default Child node Example')
      .click();

    //default child node example
    cy.expectPathToBe('/projects/pr1/dps/dps2');

    cy.get('.fd-app__sidebar').should('contain', 'First Child');
    cy.get('.fd-app__sidebar').should('contain', 'Second Child');
  });

  it('Icon instead of label in TopNav', () => {
    cy.visit('/');
    cy.get('button[title="Settings"]>.fd-top-nav__icon').should('exist');
    cy.get('button[title="Settings"]').should('contain', '');
  });

  it('Icon with label in LeftNav', () => {
    cy.get('.fd-shellbar')
      .contains('Projects')
      .click();
    cy.get('.fd-app__sidebar .fd-side-nav__item')
      .contains('Project One')
      .click();

    cy.get('.fd-side-nav__subitem')
      .contains('Project Settings')
      .find('.fd-side-nav__icon')
      .should('exist');
  });

  it('Shows Kyma version in LeftNav', () => {
    // projects page
    cy.get('.fd-shellbar')
      .contains('Projects')
      .click();

    cy.get('.fd-app__sidebar .lui-sideNavFooter')
      .contains('Version 1.2.3')
      .should('be.visible');
  });

  // Disabled, since it only works if autologin is false
  /*
  it('Anonymous content', () => {
    cy.get('.fd-shellbar')
      .contains('Visible for all users')
      .should('exist');

    cy.get('.fd-shellbar')
      .contains('Visible for anonymous users only')
      .should('not.exist');
  });
  */

  describe('features', () => {
    it('keepSelectedForChildren', () => {
      // keep selected for children example
      Cypress.currentTest.retries(3);
      cy.get('.fd-shellbar')
        .contains('Overview')
        .click();

      cy.wait(500);
      // dig into the iframe

      cy.get('iframe').then(function($element) {
        let iframeBody, cyIframe;
        // this gets the body of your iframe
        iframeBody = $element.contents().find('body');
        // wrap this body with cy so as to do cy actions inside iframe elements
        cyIframe = cy.wrap(iframeBody);
        //now you can forget about that you are in iframe. you can do necessary actions finding the elements inside the iframe
        cyIframe
          .find('.fd-list-group__item')
          .contains('keepSelectedForChildren')
          .click();
        cy.wait(500);
      });

      cy.expectPathToBe('/projects/pr1/avengers');

      //the iframe is has been replaced with another one, we need to "get" it again
      cy.get('iframe').then(function($element) {
        const iframeBody = $element.contents().find('body');
        // wrap this body with cy so as to do cy actions inside iframe elements
        const cyIframe = cy.wrap(iframeBody);

        cyIframe
          .find('.fd-list-group__item')
          .contains('Thor')
          .click();
        cy.wait(500);
      });
      cy.expectPathToBe('/projects/pr1/avengers/thor');

      cy.get('.fd-app__sidebar').should('contain', 'Keep Selected Example');
    });

    it('Node with link to another node', () => {
      const goToAnotherNodeFeature = () => {
        cy.get('.fd-shellbar')
          .contains('Overview')
          .click();

        cy.wait(500);
        cy.get('iframe').then(function($element) {
          let iframeBody, cyIframe;
          // this gets the body of your iframe
          iframeBody = $element.contents().find('body');
          // wrap this body with cy so as to do cy actions inside iframe elements
          cyIframe = cy.wrap(iframeBody);
          //now you can forget about that you are in iframe. you can do necessary actions finding the elements inside the iframe
          // {cyElement is the cypress object here}
          cyIframe
            .find('.fd-list-group__item strong')
            .contains('Node with link to another node')
            .click();
        });
      };

      //go to absolute path
      goToAnotherNodeFeature();
      cy.get('.fd-app__sidebar .fd-side-nav__item')
        .contains('Go to absolute path')
        .click();

      cy.expectPathToBe('/settings');

      //go to relative path from the parent node
      goToAnotherNodeFeature();
      cy.get('.fd-app__sidebar .fd-side-nav__item')
        .contains('Go to relative path')
        .click();

      cy.expectPathToBe('/projects/pr2/dps/dps1');

      //go to relative path from node that is a sibiling
      goToAnotherNodeFeature();
      cy.get('.fd-app__sidebar .fd-side-nav__item')
        .contains('Keep Selected Example')
        .click();

      cy.expectPathToBe('/projects/pr2/avengers');

      cy.get('.fd-app__sidebar .fd-side-nav__item')
        .contains('Go to relative path')
        .click();

      cy.expectPathToBe('/projects/pr2/dps/dps1');
    });

    it('Left navigation hidden', () => {
      cy.get('.fd-shellbar')
        .contains('Projects')
        .click();
      cy.get('.fd-app__sidebar .fd-side-nav__item')
        .contains('Project One')
        .click();

      cy.get('.fd-app__sidebar')
        .contains('Hide left navigation')
        .click();

      cy.get('.no-side-nav').should('exist');
      cy.get('.fd-app__sidebar').should('not.be.visible');
    });
  });
});
