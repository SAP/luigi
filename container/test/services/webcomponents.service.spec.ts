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

  it('checkWCUrl', () => {
   const returnVal = service.checkWCUrl('http://localhost:4200/foo/bar');
    expect(returnVal).toEqual(true);
  });

  it('processViewUrl', () => {
    const viewUrl = 'http://localhost:4200/foo/bar';
    const returnVal = service.processViewUrl(viewUrl);
     expect(returnVal).toEqual(viewUrl);
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


describe('attachWC', () => {
  let service;
  // setup data
  const wc_id = 'span';
  const wcItemPlaceholder = document.createElement('div');
  const wc_container = document.createElement('div');
  wc_container.appendChild(wcItemPlaceholder);
  const viewUrl = '/path/to/component';
  const nodeId = 'node123';

      
  beforeEach(() => {
    service = new WebComponentService();
  });

  afterEach(() => {
    jest.resetAllMocks()
  });

  it('wc_container contains wcItemPlaceholder and nodeId is provided', () => {
    const innerWCElement = document.createElement(wc_id);
    innerWCElement.setAttribute('nodeId', nodeId);

    // Mock methods to spy on them
    const dispatchEventSpy = jest.spyOn(wc_container, 'dispatchEvent');
    const createElementSpy = jest.spyOn(document, 'createElement');
    service.initWC = jest.fn();
    wc_container.replaceChild = jest.fn();

    // Act
    service.attachWC(wc_id, wcItemPlaceholder, wc_container, null, viewUrl, nodeId);

    // Assert
    expect(service.initWC).toHaveBeenCalled();
    expect(createElementSpy).toHaveBeenCalledWith(wc_id);
    expect(wc_container.replaceChild).toHaveBeenCalledWith(innerWCElement, wcItemPlaceholder);
    expect(dispatchEventSpy).toHaveBeenCalledWith(new Event('wc_ready'));
  });

  it('wc_container does NOT contain wcItemPlaceholder', () => {
    const wc_container_ = document.createElement('div');

    // Mock methods to spy on them
    const replaceChildSpy = jest.spyOn(wc_container_, 'replaceChild');
    const dispatchEventSpy = jest.spyOn(wc_container_, 'dispatchEvent');
    const createElementSpy = jest.spyOn(document, 'createElement');

    // Act
    service.attachWC(wc_id, wcItemPlaceholder, wc_container_, null, viewUrl, nodeId);

    // Assert
    expect(createElementSpy).not.toHaveBeenCalledWith(wc_id);
    expect(replaceChildSpy).not.toHaveBeenCalled();
    expect(dispatchEventSpy).not.toHaveBeenCalled();
  });

  it('nodeId not provided', () => {
    const innerWCElement = document.createElement(wc_id);
    
    // Mock methods to spy on them
    const dispatchEventSpy = jest.spyOn(wc_container, 'dispatchEvent');
    wc_container.replaceChild = jest.fn();

    // Act
    service.attachWC(wc_id, wcItemPlaceholder, wc_container, null, viewUrl, undefined);

    // Assert
    expect(wc_container.replaceChild).toHaveBeenCalledWith(innerWCElement, wcItemPlaceholder);
    expect(dispatchEventSpy).toHaveBeenCalledWith(new Event('wc_ready'));
  });

});


