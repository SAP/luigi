import { wrap } from "module";


describe('Luigi Client linkManager Modal', () => {
  beforeEach(() => {
    cy.visitLoggedIn('/');
  });

    it('print stuff out so, I can check what functions are available etc.', () => {
      cy.window().then(win => {
        cy.log(win)
        cy.log("----win.Luigi----")
        cy.log(win.Luigi)
        cy.log("----win.Luigi.navigation()----")
        cy.log(win.Luigi.navigation())
        cy.log("----win.Luigi.navigation().openAsModal() without cy.wrap----")
        cy.log(win.Luigi.navigation().openAsModal('/projects/pr2'))

        const p = win.Luigi.navigation().openAsModal('/projects/pr2')
        cy.wrap(p).then((res, rej) => {   // Question: if .then() is only executed after the promise is fulfilled, why is this part executed even though the modal has not been closed yet?
          cy.log(res)   // = PromiseResult?
        })
        cy.log("------------------------win.Luigi.ux()----------------------")
        cy.log(win.Luigi.ux())
        

      });
    });
    it('1 Open and Close Modal with Close Button', () => {
      cy.window().then(win => {
        const p = win.Luigi.navigation().openAsModal('/projects/pr2', {
          title: "opened with openAsModal()",
          closebtn_data_testid: 'closeButtonId'  // value for the close button of the modal window.
        });
        cy.get('[data-testid = closeButtonId]')
          .click()
          .then(() => {
            cy.wrap(p).then((res) => {
              expect(res).to.equal(true);   // Question: what is the res of the promise supposed to be? Should it be true?
            });
          });
      });
    });
    it('2 Open and Close Modal With linkManager.goBack()', () => {
      cy.window().then(win => {
        const p = win.Luigi.navigation().openAsModal('/projects/pr2/settings', {
          title: "opened with openAsModal()",
          size: 'l',
          keepPrevious: true
        })
        cy.log(win.Luigi.navigation().hasBack())      // returns false
        cy.wrap(p).then((res) => {
          // cy.log(win.Luigi.navigation())
          cy.log(win.Luigi.navigation().hasBack())    // returns true
          win.Luigi.navigation().goBack()             // Question: Why does this not close the modal?
          cy.log(win.Luigi.navigation().hasBack())    // still returns true
        })
      })
    });

    it('5 Open and Close Modal With uxManager.closeCurrentModal()', () => {
      cy.window().then(win => {
        const p = win.Luigi.navigation().openAsModal('/projects/pr2/settings', {
          title: "opened with openAsModal()",
          size: 'l',
          keepPrevious: true
        })
        cy.wrap(p).then((res) => {
          //win.Luigi.ux().closeCurrentModal()    // Question: In Cypress: uxManager.closeCurrentModal() is not available, but other functions like uxManager.removeBackdrop() or uxManager.showConfirmationModal() are
                                                  // which functions are available in Cypress and which are not?
        })
      })
    });
  });

  // promise test
  function delay(ms) {
    console.log('delay start')
    return new Promise(function (resolve) {
      setTimeout(function () {
        console.log('delay stop')
        resolve(42)
      }, ms)
    })
  }
  
  it('delays by 2 seconds', function () {
    cy.visit('/')
      .then(function () {
        // create the promise only after the visit
        // has finished. Promises are eager
        // so this promise starts running right away
        // By returning it from the Cypress .then command
        // you make Cypress wait for the promise to resolve
        return delay(2000)
      })
      // the resolved value of the promise is passed
      // to the assertion here
      .should('eq', 42)
  })

  