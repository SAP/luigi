import { LuigiInternalMessageID } from '../../src/constants/internal-communication';
import { Events } from '../../src/constants/communication';
import { ContainerService } from '../../src/services/container.service';

describe('Container Service', () => {
  let service: ContainerService;
  beforeEach(() => {
    service = new ContainerService();
  });

  it('test custom message', () => {
    const cm = service.getContainerManager();
    let dispatchedEvent;
    const cw = {};
    jest.spyOn(service, 'getTargetContainer').mockImplementation(() => {
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
  });
});
