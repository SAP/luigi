const containerSelector = '[id^="luigi-debug-vis-cnt"]';

describe('Luigi Mock Engine', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8181/', {
      onBeforeLoad: (win) => {
        win.parent = win;
      }
    });
  });

  /**
   * Testing Luigi Client UX Manager features
   */
  describe('Test Luigi Client UX Manager functionality', () => {
    it('Check LuigiClient.uxManager().alert', () => {
      cy.get('[id^=uxbutton1]').click();

      cy.get(containerSelector)
        .children()
        .contains('"msg":"luigi.ux.alert.show"');
    });

    it('Check LuigiClient.uxManager().confirmModal', () => {
      cy.get('[id^=uxbutton2]').click();

      cy.get(containerSelector)
        .children()
        .contains('"msg":"luigi.ux.confirmationModal.show"');
    });

    it('Check LuigiClient.uxManager().loadIndicator', () => {
      cy.get('[id^=uxbutton3]').click();

      cy.get(containerSelector)
        .children()
        .contains('"msg":"luigi.show-loading-indicator"');
    });

    it('Check LuigiClient.uxManager().setCurrentLocale', () => {
      cy.get('[id^=uxbutton4]').click();

      cy.get(containerSelector)
        .children()
        .contains('"msg":"luigi.current-locale-changed"');
    });
  });

  /**
   * Testing Luigi Client Link Manager features
   */
  describe('Test Luigi Client Link Manager functionality', () => {
    it('Check LuigiClient.linkManager().openAsModal', () => {
      cy.get('[id^=button1]').click();

      cy.get(containerSelector)
        .children()
        .contains('"msg":"luigi.navigate.ok"');
    });

    it('Check LuigiClient.linkManager().split', () => {
      cy.get('[id^=button2]').click();

      cy.get(containerSelector).contains('"msg":"luigi.navigate.ok"');
    });

    it('Check LuigiClient.linkManager().drawer', () => {
      cy.get('[id^=button3]').click();

      cy.get(containerSelector).contains('"msg":"luigi.navigate.ok"');
    });

    it('Check LuigiClient.linkManager().pathExists', () => {
      cy.get('[id^=button4]').click();

      cy.get(containerSelector).contains('"msg":"luigi.navigation.pathExists.answer"');
    });
  });
});
