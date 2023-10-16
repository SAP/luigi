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
});
