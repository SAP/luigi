describe('Navigation', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200');
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
    cy.location().should(loc => {
      expect(loc.pathname).to.eq('/projects/pr1');
    });
    cy.get('.fd-app__sidebar').should('not.contain', 'Project One');
    cy.get('.fd-app__sidebar').should('contain', 'Miscellaneous2');
    cy.get('.fd-app__sidebar')
      .contains('Default Child node Example')
      .click();

    //default child node example
    cy.location().should(loc => {
      expect(loc.pathname).to.eq('/projects/pr1/dps/dps2');
    });
    cy.get('.fd-app__sidebar').should('contain', 'First Child');
    cy.get('.fd-app__sidebar').should('contain', 'Second Child');
  });

  it('Icon instead of label in TopNav', () => {
    cy.visit('http://localhost:4200/');
    cy.get('button[title="Settings"]>.fd-top-nav__icon').should('exist');
    cy.get('button[title="Settings"]').should('contain', '');
  });

  it('Icon instead of label in LeftNav', () => {
    cy.visit('http://localhost:4200/projects/pr1');
    cy.get('.fd-side-nav__sublink')
      .contains('Project Settings')
      .find('.fd-side-nav__icon')
      .should('exist');
  });

  describe('features', () => {
    it('keepSelectedForChildren', () => {
      // keep selected for children example
      cy.get('.fd-shellbar')
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
        cy.wait(50);
        iframeBody = $element.contents().find('body');
        // wrap this body with cy so as to do cy actions inside iframe elements
        cyIframe = cy.wrap(iframeBody);
        cyIframe
          .find('.fd-list-group__item')
          .contains('Thor')
          .click();
      });

      cy.location().should(loc => {
        expect(loc.pathname).to.eq('/projects/pr1/avengers/thor');
      });

      cy.get('.fd-app__sidebar').should('contain', 'Keep Selected Example');
    });

    it('Node with link to another node', () => {
      const goToAnotherNodeFeature = () => {
        cy.get('.fd-shellbar')
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

      //go to absolute path
      goToAnotherNodeFeature();
      cy.get('.fd-app__sidebar .fd-side-nav__item')
        .contains('Go to absolute path')
        .click();

      cy.location().should(loc => {
        expect(loc.pathname).to.eq('/settings');
      });

      //go to relative path from the parent node
      goToAnotherNodeFeature();
      cy.get('.fd-app__sidebar .fd-side-nav__item')
        .contains('Go to relative path')
        .click();

      cy.location().should(loc => {
        expect(loc.pathname).to.eq('/projects/pr2/dps/dps1');
      });

      //go to relative path from node that is a sibiling
      goToAnotherNodeFeature();
      cy.get('.fd-app__sidebar .fd-side-nav__item')
        .contains('Keep Selected Example')
        .click();

      cy.location().should(loc => {
        expect(loc.pathname).to.eq('/projects/pr2/avengers');
      });

      cy.get('.fd-app__sidebar .fd-side-nav__item')
        .contains('Go to relative path')
        .click();

      cy.location().should(loc => {
        expect(loc.pathname).to.eq('/projects/pr2/dps/dps1');
      });
    });

    it('Left navigation hidden', () => {
      cy.visit('http://localhost:4200/projects/pr1/hideSideNav');
      cy.get('.no-side-nav').should('exist');
      cy.get('.fd-app__sidebar').should('not.be.visible');
    });
  });
});
