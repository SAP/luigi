Cypress.Commands.add(
  'login',
  (email, password, skipReturnPathCheck = false) => {
    cy.get('.form-input')
      .first()
      .clear()
      .type('tets@email.com')
      .should('have.value', 'tets@email.com');

    cy.get('.form-input')
      .last()
      .clear()
      .type('tets')
      .should('have.value', 'tets');

    cy.get('#login-button').click();

    if (!skipReturnPathCheck) {
      cy.get('.fd-shellbar').contains('Overview');
      cy.expectPathToBe('/overview');
    }
  }
);

Cypress.Commands.add('goToUxManagerMethods', iframe => {
  cy.wrap(iframe)
    .contains('uxManager()')
    .click();

  cy.expectPathToBe('/projects/pr1');

  cy.wrap(iframe).should('contain', 'LuigiClient uxManager methods');
});

Cypress.Commands.add('goToLinkManagerMethods', iframe => {
  cy.wait(0);
  cy.wrap(iframe)
    .contains('linkManager()')
    .click();

  cy.expectPathToBe('/projects/pr2');
  cy.wrap(iframe).should('contain', 'LuigiClient linkManager methods');
});

Cypress.Commands.add('goToOverviewPage', () => {
  cy.get('button')
    .contains('Overview')
    .click();
});

Cypress.Commands.add('goToProjectsPage', () => {
  cy.get('button')
    .contains('Projects')
    .click();
});

Cypress.Commands.add('selectContextSwitcherItem', (item, currentLabel) => {
  // default label
  cy.get('.fd-product-menu')
    .contains(currentLabel || 'Select Environment ...')
    .click();

  // click an action
  cy.get('.fd-product-menu .fd-popover__body')
    .contains(item)
    .click();
});

const isHashRoutingOn = () => {
  const appWindow = cy.state('window');
  const { useHashRouting } =
    appWindow && appWindow.Luigi && appWindow.Luigi.config
      ? appWindow.Luigi.config.routing
      : false;
  return useHashRouting;
};

Cypress.Commands.add('expectPathToBe', (pathWithoutHash, timeout = undefined) =>
  cy.location({ timeout }).should(location => {
    const useHashRouting = isHashRoutingOn();
    const actualPath = useHashRouting ? location.hash : location.pathname;
    const pathToCheck = useHashRouting
      ? '#' + pathWithoutHash
      : pathWithoutHash;
    expect(actualPath).to.eq(pathToCheck);
  })
);

Cypress.Commands.add('expectSearchToBe', (searchString, a) => {
  // notice that location.hash DOES keep url params ('?a=b') while location.pathname does NOT
  cy.location().should(locationContext => {
    const useHashRouting = isHashRoutingOn();
    const actualPath = useHashRouting
      ? locationContext.hash
      : locationContext.pathname;
    if (useHashRouting) {
      expect('?' + actualPath.split('?')[1]).to.eq(searchString);
    } else {
      expect(locationContext.search).to.eq(searchString);
    }
  });
});

Cypress.Commands.add(
  'historyBack',
  {
    prevSubject: ['window']
  },
  (subject, eventName, options) => {
    console.log('historyBack', subject, eventName, options);
    subject.history.back();
  }
);

/**
  * iframe
  * Basically what it is doing is checking if the iframe has loaded, if
  * the iframe has loaded it will do $iframe.contents().find("body");.
  * If it has not loaded it will hook that same code into the load event
  * so it will run as soon as the iframe loads.
  *
    usage: 
    cy.get('iframe').iframe().then(modal => {
        cy.wrap(modal)
            .contains('Go back')
            .click();
    });
 */

Cypress.Commands.add('iframe', { prevSubject: 'element' }, $iframe => {
  Cypress.log({
    name: 'iframe',
    consoleProps() {
      return {
        iframe: $iframe
      };
    }
  });
  return new Cypress.Promise(resolve => {
    onIframeReady(
      $iframe,
      () => {
        resolve($iframe.contents().find('body'));
      },
      () => {
        $iframe.on('load', () => {
          resolve($iframe.contents().find('body'));
        });
      }
    );
  });
});

function onIframeReady($iframe, successFn, errorFn) {
  try {
    const iCon = $iframe.first()[0].contentWindow,
      bl = 'about:blank',
      compl = 'complete';
    const callCallback = () => {
      try {
        const $con = $iframe.contents();
        if ($con.length === 0) {
          // https://git.io/vV8yU
          throw new Error('iframe inaccessible');
        }
        successFn($con);
      } catch (e) {
        // accessing contents failed
        errorFn();
      }
    };
    const observeOnload = () => {
      $iframe.on('load.jqueryMark', () => {
        try {
          const src = $iframe.attr('src').trim(),
            href = iCon.location.href;
          if (href !== bl || src === bl || src === '') {
            $iframe.off('load.jqueryMark');
            callCallback();
          }
        } catch (e) {
          errorFn();
        }
      });
    };
    if (iCon.document.readyState === compl) {
      const src = $iframe.attr('src').trim(),
        href = iCon.location.href;
      if (href === bl && src !== bl && src !== '') {
        observeOnload();
      } else {
        callCallback();
      }
    } else {
      observeOnload();
    }
  } catch (e) {
    // accessing contentWindow failed
    errorFn();
  }
}
