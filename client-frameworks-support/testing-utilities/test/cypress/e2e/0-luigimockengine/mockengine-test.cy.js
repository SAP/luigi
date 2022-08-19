describe('Luigi Mock Engine', () => {
  beforeEach(() => {
    cy.visit("localhost:8080");
  });

  /** 
  * Testing Luigi Client UX Manager features
  */
  describe('Test Luigi Client UX Manager functionality', () => {
    it('Check LuigiClient.uxManager().alert', () => {
      cy.get('[id^=uxbutton1]')
      .click();

      cy.get('[id^="luigi-debug-vis-cnt"]')
      .contains('contain', '{"msg":"luigi.ux.alert.show","data":{"settings":{"text":"This is just a test alert for external micro frontend.","type":"success","id":689942344}}}');
    });    
 
    it('Check LuigiClient.uxManager().confirmModal', () => {
      cy.get('[id^=uxbutton2]')
      .click();

      cy.get('[id^="luigi-debug-vis-cnt"]')
      .contains('contain', '{"msg":"luigi.ux.confirmationModal.show","data":{"settings":{"type":"confirmation","header":"Confirmation","body":"Are you sure you want to do this?","buttonConfirm":"Yes","buttonDismiss":"No"}}}');
    });    

    it('Check LuigiClient.uxManager().loadIndicator', () => {
      cy.get('[id^=uxbutton3]')
      .click();

      cy.get('[id^="luigi-debug-vis-cnt"]')
      .contains('contain', '{"msg":"luigi.show-loading-indicator"}');
    });    

    it('Check LuigiClient.uxManager().setCurrentLocale', () => {
      cy.get('[id^=uxbutton4]')
      .click();

      cy.get('[id^="luigi-debug-vis-cnt"]')
      .contains('contain', '{"msg":"luigi.current-locale-changed","currentLocale":"/","emulated":true}');
    }); 
  });

  /** 
   * Testing Luigi Client Link Manager features
  */
  describe('Test Luigi Client Link Manager functionality', () => {
    it('Check LuigiClient.linkManager().openAsModal', () => {
      cy.get('[id^=button1]')
      .click();

      cy.get('[id^="luigi-debug-vis-cnt"]')
      .contains('contain', '{"msg":"luigi.navigate.ok","data":{"msg":"luigi.navigation.open","sessionId":0,"params":{"preserveView":true,"nodeParams":{},"errorSkipNavigation":false,"fromContext":null,"fromClosestContext":false,"fromVirtualTreeRoot":false,"fromParent":false,"relative":true,"link":"projects/pr1/users","newTab":false,"preserveQueryParams":false,"anchor":"","preventContextUpdate":false,"preventHistoryEntry":false,"intent":false,"modal":{"title":"Users","size":"m"}}},"emulated":true}');
    });    

    it('Check LuigiClient.linkManager().split', () => {
      cy.get('[id^=button2]')
      .click();

      cy.get('[id^="luigi-debug-vis-cnt"]')
      .contains('contain', '{"msg":"luigi.navigate.ok","data":{"msg":"luigi.navigation.open","sessionId":0,"params":{"preserveView":true,"nodeParams":{},"errorSkipNavigation":false,"fromContext":null,"fromClosestContext":false,"fromVirtualTreeRoot":false,"fromParent":false,"relative":true,"link":"projects/pr1/logs","newTab":false,"preserveQueryParams":false,"anchor":"","preventContextUpdate":false,"preventHistoryEntry":false,"intent":false,"splitView":{"title":"Logs","size":40,"collapsed":true}}},"emulated":true}');
    });    

    it('Check LuigiClient.linkManager().drawer', () => {
      cy.get('[id^=button3]')
      .click();

      cy.get('[id^="luigi-debug-vis-cnt"]')
      .contains('contain', '{"msg":"luigi.navigate.ok","data":{"msg":"luigi.navigation.open","sessionId":0,"params":{"preserveView":true,"nodeParams":{},"errorSkipNavigation":false,"fromContext":null,"fromClosestContext":false,"fromVirtualTreeRoot":false,"fromParent":false,"relative":true,"link":"projects/pr1/drawer","newTab":false,"preserveQueryParams":false,"anchor":"","preventContextUpdate":false,"preventHistoryEntry":false,"intent":false,"drawer":{"header":true,"backdrop":true,"size":"s"}}},"emulated":true}');
    });   
    
    it('Check LuigiClient.linkManager().pathExists', () => {
      cy.get('[id^=button4]')
      .click();

      cy.get('[id^="luigi-debug-vis-cnt"]')
      .contains('contain', '{"msg":"luigi.navigation.pathExists.answer","data":{"correlationId":3203961480,"pathExists":false},"emulated":true}');
    });   
  });
});
