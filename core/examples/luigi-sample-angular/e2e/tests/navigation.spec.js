describe('Navigation', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200');
    cy.login('tets@email.com', 'tets');
  });

  it('Click around using navigation', () => {
    // projects page
    cy.get('.fd-ui__header')
      .contains('Projects')
      .click();

    //projects page
    cy.get('.fd-app__sidebar').should('contain', 'Project One');
    cy.get('.fd-app__sidebar').should('contain', 'Project Two');
    cy.get('.fd-app__sidebar')
      .contains('Project One')
      .click();

    //project one page
    cy.location().should(loc => {
      expect(loc.hash).to.eq('#/projects/pr1');
    });
    cy.get('.fd-app__sidebar').should('not.contain', 'Project One');
    cy.get('.fd-app__sidebar').should('contain', 'Miscellaneous2');
    cy.get('.fd-app__sidebar')
      .contains('Default Child node Example')
      .click();

    //default child node example
    cy.location().should(loc => {
      expect(loc.hash).to.eq('#/projects/pr1/dps/dps2');
    });
    cy.get('.fd-app__sidebar').should('contain', 'First Child');
    cy.get('.fd-app__sidebar').should('contain', 'Second Child');
  });

  describe('features', () => {
    it('keepSelectedForChildren', () => {
      // keep selected for children example
      cy.get('.fd-ui__header')
        .contains('Overview')
        .click();

      // dig into the iframe
      cy.wait(150);
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
          .contains('keepSelectedForChildren')
          .click();

        // on route change we need to refresh the contents() reference
        iframeBody = $element.contents().find('body');
        // wrap this body with cy so as to do cy actions inside iframe elements
        cyIframe = cy.wrap(iframeBody);
        cyIframe
          .find('.fd-list-group__item')
          .contains('Thor')
          .click();
      });

      cy.location().should(loc => {
        expect(loc.hash).to.eq('#/projects/pr1/avengers/thor');
      });

      cy.get('.fd-app__sidebar').should('contain', 'Keep Selected Example');
    });

    it('Node with link to another node', () => {
      const goToAnotherNodeFeature = () => {
        cy.get('.fd-ui__header')
          .contains('Overview')
          .click();

        cy.wait(150);
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

      goToAnotherNodeFeature();
      cy.get('.fd-app__sidebar .fd-side-nav__item')
        .contains('Go to absolute path')
        .click();

      cy.location().should(loc => {
        expect(loc.hash).to.eq('#/settings');
      });

      goToAnotherNodeFeature();
      cy.get('.fd-app__sidebar .fd-side-nav__item')
        .contains('Go to relative path')
        .click();

      cy.location().should(loc => {
        expect(loc.hash).to.eq('#/projects/pr2/dps/dps1');
      });
    });
  });
});
