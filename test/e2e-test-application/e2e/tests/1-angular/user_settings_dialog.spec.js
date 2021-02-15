describe('Navigation', () => {
  const clearStorage = () =>
    cy.clearLocalStorage('luigi.preferences.userSettings');

  const openSettingsDialogBox = () => {
    //Click on User Icon (top menu right)
    cy.get('[data-testid="luigi-topnav-profile-btn"]')
      .should('exist')
      .click();

    //Click on Setting link and open Dialog Box
    cy.get('[data-testid="settings-link"]')
      .should('exist')
      .click();

    //Check Dialog is open
    cy.get('.lui-usersettings-dialog').should('exist');

    //Check we have 3 left bar items
    cy.get('.lui-usersettings-body .fd-nested-list__link')
      .children()
      .should('have.length', 5);
  };

  const saveSettings = () => {
    //Check save button and click
    cy.get('.lui-usersettings-dialog [data-testid="lui-us-saveBtn"]')
      .should('exist')
      .click();

    //Check settings dialog box is closed...
    cy.get('.lui-usersettings-dialog').should('not.exist');
  };

  const closeSettings = () => {
    //Check cancel button and click
    cy.get('.lui-usersettings-dialog [data-testid="lui-us-dismissBtn"]')
      .should('exist')
      .click();

    //Check settings dialog box is closed...
    cy.get('.lui-usersettings-dialog').should('not.exist');
  };

  beforeEach(() => {
    clearStorage();
    cy.visitLoggedIn('/');
    openSettingsDialogBox();
  });

  describe('User Account Configuration', () => {
    const setting_name = 'name_' + new Date().getTime();
    const setting_date_format = 'df_' + new Date().getTime();
    const setting_privacy_policy = 'privacy_policy_' + new Date().getTime();

    it('Fill Account and save; reopen and check saved value', () => {
      //Click on User Account
      cy.get('.lui-usersettings-body .fd-nested-list__link')
        .eq(0)
        .click();

      //Check User Account is selected
      cy.get('.lui-usersettings-body .fd-nested-list__link')
        .eq(0)
        .should('have.class', 'is-selected');

      //Check Name Input field and type a new name
      cy.get('[data-testid="lui-us-input0"]')
        .should('exist')
        .type(setting_name);

      //Email Input field should be disabled and a usual text
      cy.get('[data-testid="lui-us-input1"]')
        .should('exist')
        .should('have.class', 'lui-form-text');

      cy.get('[data-testid="lui-us-label-switch_checkbox"]')
        .should('exist')
        .click();

      //Check Checkbox is checked
      cy.get('[data-testid="lui-us-checkbox-switch_checkbox"]').should(
        'be.checked'
      );

      //Save Settings
      saveSettings();

      //Re-open Setting Dialog Box
      openSettingsDialogBox();

      //Check Name Input field and type a new name
      cy.get('[data-testid="lui-us-input0"]').should(
        'have.value',
        setting_name
      );

      //Check Checkbox is checked
      cy.get('[data-testid="lui-us-checkbox-switch_checkbox"]').should(
        'be.checked'
      );

      //Close settings
      closeSettings();
    });

    it('Fill Language and Reason and save; reopen and check saved values', () => {
      //Click on Language & Region
      cy.get('.lui-usersettings-body .fd-nested-list__link')
        .eq(1)
        .click();

      //Check Language & Region is selected
      cy.get('.lui-usersettings-body .fd-nested-list__link')
        .eq(1)
        .should('have.class', 'is-selected');

      //Check Language & Region Input field exist
      cy.get('[data-testid="lui-us-input0"]').should('exist');

      //Open button to show enumeration list options
      cy.get('.lui-usersettings-content .fd-page__content .fd-form-item')
        .eq(0)
        .find('.fd-input-group__button')
        .click();

      //Check we should have 4 options
      cy.get('.lui-usersettings-content .fd-page__content .fd-form-item')
        .eq(0)
        .find(' .fd-list--dropdown .fd-list__item')
        .children()
        .should('have.length', 4);

      //Click on Spanish list item
      cy.get('[data-testid="lui-us-option0_2"]')
        .should('exist')
        .click();

      //Check Placeholder of input field is Spanish
      cy.get('[data-testid="lui-us-input0"]')
        .should('exist')
        .should('have.attr', 'placeholder', 'Spanish');

      //Check Date Formant Input field and type a new format
      cy.get('[data-testid="lui-us-input1"]')
        .should('exist')
        .type(setting_date_format);

      //Save Settings
      saveSettings();

      //Re-open Setting Dialog Box
      openSettingsDialogBox();

      //Click on Language & Region (left menu)
      cy.get('.lui-usersettings-body .fd-nested-list__link')
        .eq(1)
        .click();

      //Check Placeholder of input field is Spanish
      cy.get('[data-testid="lui-us-input0"]')
        .should('exist')
        .should('have.attr', 'placeholder', 'Spanish');

      //Check Name Input field and type a new name
      cy.get('[data-testid="lui-us-input1"]').should(
        'have.value',
        setting_date_format
      );

      //Close settings
      closeSettings();
    });

    it('Fill Privacy and save; reopen and check saved value', () => {
      //Click on Privacy
      cy.get('.lui-usersettings-body .fd-nested-list__link')
        .eq(2)
        .click();

      //Check Private Policy Input field exist and placeholder is
      cy.get('[data-testid="lui-us-input0"]')
        .should('exist')
        .should('have.attr', 'placeholder', 'Field placeholder text');

      //Check Private Policy Input field exist and placeholder is
      cy.get('[data-testid="lui-us-input0"]').type(setting_privacy_policy);

      //Check Time Format has two buttons with no selected class
      cy.get(
        '.lui-usersettings-content .enum-buttons-container-time .lui-fd-enum-button'
      )
        .eq(0)
        .should('not.have.class', 'fd-button--emphasized');
      cy.get(
        '.lui-usersettings-content .enum-buttons-container-time .lui-fd-enum-button'
      )
        .eq(1)
        .should('not.have.class', 'fd-button--emphasized');

      //Click Time Format 12h
      cy.get(
        '.lui-usersettings-content .enum-buttons-container-time .lui-fd-enum-button'
      )
        .eq(0)
        .click();

      //Check Time Format 12h is selected
      cy.get(
        '.lui-usersettings-content .enum-buttons-container-time .lui-fd-enum-button'
      )
        .eq(0)
        .should('have.class', 'is-selected');

      //Save Settings
      saveSettings();

      //Re-open Setting Dialog Box
      openSettingsDialogBox();

      //Click on Privacy
      cy.get('.lui-usersettings-body .fd-nested-list__link')
        .eq(2)
        .click();

      //Check Private Policy Input field has saved value
      cy.get('[data-testid="lui-us-input0"]').should(
        'have.value',
        setting_privacy_policy
      );

      //Check Time Format 12h is selected
      cy.get('.lui-usersettings-content .enum-buttons-container-time button')
        .eq(0)
        .should('have.class', 'is-selected');

      //Close settings
      closeSettings();
    });

    it('Fill Theming (which is custom mf) and save; reopen and check saved value', () => {
      let $iframeBody;

      //Click on theming
      cy.get('.lui-usersettings-body .fd-nested-list__link')
        .eq(3)
        .click();
      cy.wait(5000);
      //Check if iframe is loaded and have a red button
      cy.getIframeBody({}, 0, '.iframeUserSettingsCtn').then(result => {
        $iframeBody = result;
        cy.wrap($iframeBody).contains('Red').should('have.class', 'red');
        cy.wrap($iframeBody).contains('Red').should('not.have.class', 'active');
        cy.wrap($iframeBody)
          .contains('Red')
          .click();
      });
      saveSettings();
      openSettingsDialogBox();
      //Click on theming
      cy.get('.lui-usersettings-body .fd-nested-list__link')
        .eq(3)
        .click();
      //Check if iframe has a red button with a active class
      cy.wait(5000);
      cy.getIframeBody({}, 0, '.iframeUserSettingsCtn').then(result => {
        $iframeBody = result;
        cy.wrap($iframeBody).contains('Red').should('have.class', 'active');
      });

    });

    it('Check custom mf without meta data defined in schema', () => {
      let $iframeBody;
      //click on custom
      cy.get('.lui-usersettings-body .fd-nested-list__link')
        .eq(4)
        .click();
      cy.wait(5000);
      //check if iframe is rendered also there are no meta data set in config.
      cy.getIframeBody({}, 0, '.iframeUserSettingsCtn').then(result => {
        $iframeBody = result;
        cy.wrap($iframeBody).contains('Red').should('have.class', 'red');
      });
    });
  });
});
