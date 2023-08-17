import { Events } from '../../src/constants/communication';
import { ContainerService, containerService } from '../../src/services/container.service';
import { WebComponentService } from '../../src/services/webcomponents.service';

describe('Webcomponents Service', () => {
  let service;
  beforeEach(() => {
    service = new WebComponentService();
  });

  it('generateWCId', () => {
    const wcId = service.generateWCId('http://localhost:4200/foo/bar');
    expect(wcId).toEqual('luigi-wc-687474703a2f2f6c6f63616c686f73743a343230302f666f6f2f626172');
  });

  it('test publishEvent custom message', () => {
    const dispatchSpy = jest.spyOn(service.containerService, 'dispatch').mockImplementation(() => {});
    const clientAPI = service.createClientAPI(undefined, 'nodeId', 'wc_id', 'component');

    clientAPI.publishEvent(new CustomEvent('test-event', { detail: 1 }));
    const expectedPayload = {
      id: 'test-event',
      _metaData: {
        nodeId: 'nodeId',
        src: 'component',
        wc_id: 'wc_id'
      },
      data: 1
    };
    expect(dispatchSpy).toHaveBeenCalledWith(Events.CUSTOM_MESSAGE, undefined, expectedPayload, undefined);
  });
});
