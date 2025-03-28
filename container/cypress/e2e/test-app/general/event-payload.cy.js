import { Events } from '../../../../src/constants/communication';


function checkPayload(eventId, payloadDataResolver, expectedValue) {
  cy.get(`#actions [event_id=${eventId}]`)
    .click()
    .then(() => {
      cy.get(`#results [restype=${eventId}] [cnt_type=iframe]`)
        .then((el) => {
          expect(payloadDataResolver(el.get(0).payload)).to.equal(expectedValue);
        });
      cy.get(`#results [restype=${eventId}] [cnt_type=wc]`)
        .first().then((el) => {
          expect(payloadDataResolver(el.get(0).payload)).to.equal(expectedValue);
        });
    });
}

describe('Event payload Test', () => {
  let stub;

  beforeEach(() => {
    cy.visit('http://localhost:8080/xtest.html');
    stub = cy.stub();
    cy.get('body[iframe_init][wc_init]');
  });

  describe('Client root API', () => {
    it(Events.SET_VIEW_GROUP_DATA_REQUEST, () => {
      checkPayload(Events.SET_VIEW_GROUP_DATA_REQUEST,
        (payload) => { return payload.vg1; },
        'Luigi rocks'
      );
    });

    it(Events.SET_ANCHOR_LINK_REQUEST, () => {
      checkPayload(Events.SET_ANCHOR_LINK_REQUEST,
        (payload) => { return payload; },
        'myAnchor'
      );
    });

    // it(Events.ADD_NODE_PARAMS_REQUEST, () => {
    //   checkPayload(Events.ADD_NODE_PARAMS_REQUEST,
    //     (payload) => { return payload.luigi; },
    //     'rocks'
    //   );
    // });

    // it(Events.ADD_SEARCH_PARAMS_REQUEST, () => {
    //   checkPayload(Events.ADD_SEARCH_PARAMS_REQUEST,
    //     (payload) => { return payload.luigi; },
    //     'rocks'
    //   );
    // });

    it(Events.CUSTOM_MESSAGE, () => {
      checkPayload(Events.CUSTOM_MESSAGE,
        (payload) => { return payload.id; },
        'myId'
      );
    });
  });

  describe('Client uxManager API', () => {
    it(Events.ALERT_REQUEST, () => {
      checkPayload(Events.ALERT_REQUEST,
        (payload) => { return payload.text; },
        'test text'
      );
    });

    it(Events.SHOW_CONFIRMATION_MODAL_REQUEST, () => {
      checkPayload(Events.SHOW_CONFIRMATION_MODAL_REQUEST,
        (payload) => { return payload.text; },
        'test text'
      );
    });

    it(Events.ADD_BACKDROP_REQUEST, () => {
      checkPayload(Events.ADD_BACKDROP_REQUEST,
        (payload) => { return payload._dontcare; },
        undefined
      );
    });

    it(Events.REMOVE_BACKDROP_REQUEST, () => {
      checkPayload(Events.REMOVE_BACKDROP_REQUEST,
        (payload) => { return payload._dontcare; },
        undefined
      );
    });

    // it(Events.SET_CURRENT_LOCALE_REQUEST, () => {
    //   checkPayload(Events.SET_CURRENT_LOCALE_REQUEST,
    //     (payload) => { return payload; },
    //     'de_DE'
    //   );
    // });

    // it(Events.SET_DIRTY_STATUS_REQUEST, () => {
    //   checkPayload(Events.SET_DIRTY_STATUS_REQUEST,
    //     (payload) => { return payload; },
    //     true
    //   );
    // });
  });

  describe('Client linkManager API', () => {
    it(Events.NAVIGATION_REQUEST, () => {
      checkPayload(Events.NAVIGATION_REQUEST,
        (payload) => { return payload.link; },
        '/foo/bar'
      );
    });

    it(Events.GO_BACK_REQUEST, () => {
      checkPayload(Events.GO_BACK_REQUEST,
        (payload) => { return payload.go; },
        'back'
      );
    });

    it(Events.GET_CURRENT_ROUTE_REQUEST, () => {
      checkPayload(Events.GET_CURRENT_ROUTE_REQUEST,
        (payload) => { return payload._dontcare; },
        undefined
      );
    });

    it(Events.CHECK_PATH_EXISTS_REQUEST, () => {
      checkPayload(Events.CHECK_PATH_EXISTS_REQUEST,
        (payload) => { return payload.link; },
        'some/path'
      );
    });

    // it(Events.UPDATE_MODAL_PATH_DATA_REQUEST, () => {
    //   checkPayload(Events.UPDATE_MODAL_PATH_DATA_REQUEST,
    //     (payload) => { return payload.link; },
    //     'some/path'
    //   );
    // });

    // it(Events.UPDATE_MODAL_SETTINGS_REQUEST, () => {
    //   checkPayload(Events.UPDATE_MODAL_SETTINGS_REQUEST,
    //     (payload) => { return payload.updatedModalSettings.title; },
    //     'bar'
    //   );
    // });
  });

  // describe('Client storageManager API', () => {
  //   it(Events.LOCAL_STORAGE_SET_REQUEST, () => {
  //     checkPayload(Events.LOCAL_STORAGE_SET_REQUEST,
  //       (payload) => { return payload.key; },
  //       'storageKey'
  //     );
  //   });
  // });
});
