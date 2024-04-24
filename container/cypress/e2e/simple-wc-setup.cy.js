describe('Simple Examples Iframe Container Test', () => {
  beforeEach(() => {
    cy.visit('http://localhost:2222');
  });

  it('WebComponent Container Test', () => {
    cy.visit('http://localhost:2222/container-wc/index.html');

    // // cy.get('luigi-container').shadow();
    // const a = cy
    //   .get('luigi-container')
    //   .shadow()
    //   .then(t => {
    //     console.log('luigi-container', t);

    //     console.log('luigi-container[0]', t[0]);

    //     console.log('luigi-container[0].innerHtml', t[0].innerHTML);
    //     console.log('luigi-container[0].children[1]', t[0].children[1]);
    //   });

    // // console.log(
    // //   JSON.stringify(a)
    // //   )

    cy.get('luigi-container')
      .shadow()
      .find('main');

    cy.get('luigi-container')
      .shadow()
      .find('h2')
      .should('contain.text', 'This is a webcomponent based microfrontend container  -- some content --');
  });
});
