import fiddleConfig from '../configs/default';

const setAcceptedCookies = win => {
  win.localStorage.setItem('cookiesAccepted', 'true');
};

const setLoggedIn = win => {
  const newTime = Date.now() + 6e4;
  const newLuigiAuth = {
    accessToken: 'thisisanaccesstokenthatisnotreallyneeded',
    accessTokenExpirationDate: newTime,
    idToken:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjQyMDAiLCJzdWIiOiJtYXNrb3BhdG9sIiwiZXhwIjoxNjQzNzY0OTIwLCJhenAiOiJtYXNrb3BhdG9sIiwibm9uY2UiOiJidE5rWVZzc1FldVlWNmEyR1RVZm1wWVFFelBRN3c1ZENCbU54SG54IiwiZW1haWwiOiJsdWlnaXVzZXJAa3ltYS5jeCIsIm5hbWUiOiJMdWlnaSBVc2VyIn0.YUBE3tufmmNIJHwzKRXlImteuh_qDeuwGjkzN3Z0erg'
  };
  const key = 'luigi.auth';
  win.localStorage.setItem(key, JSON.stringify(newLuigiAuth));
};

const setLuigiConfig = (win, config) => {
  const intv = setInterval(function() {
    if (win.Luigi) {
      win.Luigi.setConfig(config);
      clearInterval(intv);
    }
  }, 20);
};

Cypress.Commands.add(
  'visitWithFiddleConfig',
  (path = '/', config = fiddleConfig) => {
    cy.visit(`http://localhost:8080/#${path}`, {
      onBeforeLoad: win => {
        win.localStorage.clear();
        win.sessionStorage.clear();
        setAcceptedCookies(win);
        setLuigiConfig(win, config);
      }
    });
  }
);
Cypress.Commands.add(
  'visitWithFiddleConfigString',
  (path = '/', config = fiddleConfig) => {
    cy.visit(`http://localhost:8080/#${path}`, {
      onBeforeLoad: win => {
        win.localStorage.clear();
        win.sessionStorage.clear();
        setAcceptedCookies(win);
        // Not using setLuigiConfig(win, config);
        const strConfig =
          typeof config === 'object' ? JSON.stringify(config) : config;
        win.sessionStorage.setItem('fiddle', `Luigi.setConfig(${strConfig})`);
        win.localStorage.setItem('fiddle', `Luigi.setConfig(${strConfig})`);
      }
    });
  }
);

Cypress.Commands.add(
  'visitLoggedInWithFiddleConfig',
  (path = '/', config = fiddleConfig) => {
    cy.visit(`http://localhost:8080/#${path}`, {
      onBeforeLoad: win => {
        win.localStorage.clear();
        win.sessionStorage.clear();
        setAcceptedCookies(win);
        setLoggedIn(win);

        const strConfig =
          typeof config === 'object' ? JSON.stringify(config) : config;
        win.sessionStorage.setItem('fiddle', `Luigi.setConfig(${strConfig})`);
        win.localStorage.setItem('fiddle', `Luigi.setConfig(${strConfig})`);
      }
    });
  }
);

Cypress.Commands.add('visitLoggedIn', (path = '/') => {
  cy.visit(path, {
    onBeforeLoad: win => {
      win.localStorage.clear();
      win.sessionStorage.clear();
      setAcceptedCookies(win);
      setLoggedIn(win);
    }
  });
});

Cypress.Commands.add(
  'login',
  (email, password, skipReturnPathCheck = false) => {
    cy.get('.fd-input')
      .first()
      .clear()
      .type(email)
      .should('have.value', email);

    cy.get('.fd-input')
      .last()
      .clear()
      .type(password)
      .should('have.value', password);

    cy.get('.fd-button').click();

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
  cy.wrap(iframe)
    .contains('linkManager()')
    .click();

  cy.expectPathToBe('/projects/pr2');
  cy.wrap(iframe).should('contain', 'LuigiClient linkManager methods');
});

Cypress.Commands.add('goToOverviewPage', () => {
  cy.get('button[data-testid="overview_overview"]')
    .should('exist')
    .click();
});

Cypress.Commands.add('goToProjectsPage', () => {
  cy.get('button[data-testid="projects_projects"]')
    .should('exist')
    .click();
});

Cypress.Commands.add('selectContextSwitcherItem', (item, currentLabel) => {
  // default label
  cy.get('[data-testid="luigi-contextswitcher-button"]')
    .contains(currentLabel || 'Select Environment ...')
    .click();

  // click an action
  cy.get('[data-testid="luigi-contextswitcher-popover"]')
    .contains(item)
    .click();
});

Cypress.Commands.add(
  'getIframeBody',
  (getIframeOpts = {}, index = 0, containerSelector = '.iframeContainer') => {
    return cy
      .get(`${containerSelector} iframe`, getIframeOpts)
      .eq(index)
      .iframe();
  }
);

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

Cypress.Commands.add('splitViewButtons', iframeBody => {
  return cy
    .wrap(iframeBody)
    .find('[data-testid="split-view-controls"]')
    .find('button');
});
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

/**
  * iframeWindow
  * Basically what it is doing is checking if the iframe has loaded, if
  * the iframe has loaded it will do $iframe.
  * If it has not loaded it will hook that same code into the load event
  * so it will run as soon as the iframe loads.
  *
    usage: 
    cy.get('iframe').iframeWindow().then(modal => {
        win.LuigiClient....
    });
 */
Cypress.Commands.add('iframeWindow', { prevSubject: 'element' }, $iframe => {
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
        resolve($iframe);
      },
      () => {
        $iframe.on('load', () => {
          resolve($iframe);
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

Cypress.Commands.add('getModalWindow', () => {
  cy.get('[data-testid="modal-mf"] iframe')
    .iframeWindow()
    .its('0.contentWindow');
});