import { LuigiInternalMessageID } from '../../src/constants/internal-communication';
import { Events } from '../../src/constants/communication';
import { ContainerService } from '../../src/services/container.service';

describe('Container Service', () => {
  let service: ContainerService;
  let gtcSpy;
  let cw = {};
  let cm ;
  let dispatchedEvent;
  service = new ContainerService();
  cm = service.getContainerManager();    

  beforeEach(() => {
    gtcSpy = jest.spyOn(service, 'getTargetContainer').mockImplementation(() => {
      return {
        iframeHandle: {
          iframe: {
            contentWindow: cw
          }
        },
        dispatchEvent: customEvent => {
          dispatchedEvent = customEvent;
        }
      };
    });
  });

  afterEach(()=>{
    gtcSpy.mockRestore();
  });

  it('test alert request', () => {    
    const event = {

      source: cw,
      data: {
        msg: LuigiInternalMessageID.ALERT_REQUEST,
        data: {
          id: 'navRequest',
        }
      }
    };
    cm.messageListener(event);
    expect(dispatchedEvent.type).toEqual(Events.ALERT_REQUEST);
    expect(dispatchedEvent.detail).toEqual({data: {data: {id: "navRequest"}, msg: "luigi.ux.alert.show"}, source: {}});
   });

  it('test custom message', () => {    
    const event = {
      source: cw,
      data: {
        msg: LuigiInternalMessageID.CUSTOM_MESSAGE,
        data: {
          id: 'custMsgId',
          foo: 'bar'
        }
      }
    };
    cm.messageListener(event);
    expect(dispatchedEvent.type).toEqual(Events.CUSTOM_MESSAGE);
    expect(dispatchedEvent.detail).toEqual({ id: 'custMsgId', _metaData: {}, data: { foo: 'bar' } });
    gtcSpy.mockRestore();
  });

  it('test initialized request', () => {
    const event = {
      source: cw,
      data: {
        msg: LuigiInternalMessageID.INITIALIZED,
        params: 'init'
      }
    };
    cm.messageListener(event);
    expect(dispatchedEvent.type).toEqual(Events.INITIALIZED);
    expect(dispatchedEvent.detail).toEqual('init');
  });

  it('test confirmationModal show request', () => {
    const event = {
      source: cw,
      data: {
        msg: LuigiInternalMessageID.SHOW_CONFIRMATION_MODAL_REQUEST,
        params: 'modal-show'
      }
    };
    cm.messageListener(event);
    expect(dispatchedEvent.type).toEqual(Events.SHOW_CONFIRMATION_MODAL_REQUEST);
  });

  it('test loading indicator show request', () => {
    const event = {
      source: cw,
      data: {
        msg: LuigiInternalMessageID.SHOW_LOADING_INDICATOR_REQUEST,
        params: 'loading-indicator-show'
      }
    };
    cm.messageListener(event);
    expect(dispatchedEvent.type).toEqual(Events.SHOW_LOADING_INDICATOR_REQUEST);
  });

  it('test loading indicator hide request', () => {
    const event = {
      source: cw,
      data: {
        msg: LuigiInternalMessageID.HIDE_LOADING_INDICATOR_REQUEST,
        params: 'loading-indicator-hide'
      }
    };
    cm.messageListener(event);
    expect(dispatchedEvent.type).toEqual(Events.HIDE_LOADING_INDICATOR_REQUEST);
  });

  it('test set locale request', () => {
    const event = {
      source: cw,
      data: {
        msg: LuigiInternalMessageID.SET_CURRENT_LOCALE_REQUEST,
        params: 'set-locale'
      }
    };
    cm.messageListener(event);
    expect(dispatchedEvent.type).toEqual(Events.SET_CURRENT_LOCALE_REQUEST);
  });

  it('test set local storage request', () => {
    const event = {
      source: cw,
      data: {
        msg: LuigiInternalMessageID.LOCAL_STORAGE_SET_REQUEST,
        params: 'set-local-storage'
      }
    };
    cm.messageListener(event);
    expect(dispatchedEvent.type).toEqual(Events.LOCAL_STORAGE_SET_REQUEST);
  });

  it('test runtime error handling request', () => {
    const event = {
      source: cw,
      data: {
        msg: LuigiInternalMessageID.RUNTIME_ERROR_HANDLING_REQUEST,
        params: 'set-runtime-error-request'
      }
    };
    cm.messageListener(event);
    expect(dispatchedEvent.type).toEqual(Events.RUNTIME_ERROR_HANDLING_REQUEST);
  });

  it('test anchor link request', () => {
    const event = {
      source: cw,
      data: {
        msg: LuigiInternalMessageID.SET_ANCHOR_LINK_REQUEST,
        params: 'set-anchor-link-request'
      }
    };
    cm.messageListener(event);
    expect(dispatchedEvent.type).toEqual(Events.SET_ANCHOR_LINK_REQUEST);
  });

  it('test third party cookies request', () => {
    const event = {
      source: cw,
      data: {
        msg: LuigiInternalMessageID.SET_THIRD_PARTY_COOKIES_REQUEST,
        params: 'set-thirdparty-cookies-request'
      }
    };
    cm.messageListener(event);
    expect(dispatchedEvent.type).toEqual(Events.SET_THIRD_PARTY_COOKIES_REQUEST);
  });

  it('test navigation back request', () => {
    const event = {
      source: cw,
      data: {
        msg: LuigiInternalMessageID.BACK_NAVIGATION_REQUEST,
        params: 'back-navigation-request'
      }
    };
    cm.messageListener(event);
    expect(dispatchedEvent.type).toEqual(Events.BACK_NAVIGATION_REQUEST);
  });

  it('test navigation request', () => {
    const event = {
      source: cw,
      data: {
        msg: LuigiInternalMessageID.NAVIGATION_REQUEST,
        params: 'navigation-request'
      }
    };
    cm.messageListener(event);
    expect(dispatchedEvent.type).toEqual(Events.NAVIGATION_REQUEST);
  });

  it('test getCurrentRoute request', () => {
    const event = {
      source: cw,
      data: {
        msg: LuigiInternalMessageID.GET_CURRENT_ROUTE_REQUEST,
        params: 'get-currentroute-request'
      }
    };
    cm.messageListener(event);
    expect(dispatchedEvent.type).toEqual(Events.GET_CURRENT_ROUTE_REQUEST);
  });

  it('test getCurrentRoute request', () => {
    const event = {
      source: cw,
      data: {
        msg: LuigiInternalMessageID.GET_CURRENT_ROUTE_REQUEST,
        params: 'get-currentroute-request'
      }
    };
    cm.messageListener(event);
    expect(dispatchedEvent.type).toEqual(Events.GET_CURRENT_ROUTE_REQUEST);
  });

  it('test navigation completed request', () => {
    const event = {
      source: cw,
      data: {
        msg: LuigiInternalMessageID.NAVIGATION_COMPLETED_REPORT,
        params: 'nav-completed-request'
      }
    };
    cm.messageListener(event);
    expect(dispatchedEvent.type).toEqual(Events.NAVIGATION_COMPLETED_REPORT);
  });

  it('test update modalPath data request', () => {
    const event = {
      source: cw,
      data: {
        msg: LuigiInternalMessageID.UPDATE_MODAL_PATH_DATA_REQUEST,
        params: 'update-modalpathdata-request'
      }
    };
    cm.messageListener(event);
    expect(dispatchedEvent.type).toEqual(Events.UPDATE_MODAL_PATH_DATA_REQUEST);
  });

  it('test check pathExists request', () => {
    const event = {
      source: cw,
      data: {
        msg: LuigiInternalMessageID.CHECK_PATH_EXISTS_REQUEST,
        params: 'update-check-pathexists-request'
      }
    };
    cm.messageListener(event);
    expect(dispatchedEvent.type).toEqual(Events.CHECK_PATH_EXISTS_REQUEST);
  });

  it('test set dirty status request', () => {
    const event = {
      source: cw,
      data: {
        msg: LuigiInternalMessageID.SET_DIRTY_STATUS_REQUEST,
        params: 'set-dirtystatus-request'
      }
    };
    cm.messageListener(event);
    expect(dispatchedEvent.type).toEqual(Events.SET_DIRTY_STATUS_REQUEST);
  });

});
