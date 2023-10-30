import { Events } from '../../src/constants/communication';
import { ContainerService, containerService } from '../../src/services/container.service';
import { WebComponentService } from '../../src/services/webcomponents.service';
import * as helperFunctions from '../../src/services/web-component-helpers';

describe('trivial functions', () => {
  let service;
  beforeEach(() => {
    service = new WebComponentService();
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
});

describe('attachWC', () => {
  // setup data
  let service;
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

  it('_luigi_node provided', () => {
    const innerWCElement = document.createElement(wc_id);
    
    // Mock methods to spy on them
    const dispatchEventSpy = jest.spyOn(wc_container, 'dispatchEvent');
    wc_container.replaceChild = jest.fn();
    (wc_container as any)._luigi_node = {test: 'node'};

    // Act
    service.attachWC(wc_id, wcItemPlaceholder, wc_container, null, viewUrl, undefined);

    // Assert
    expect(wc_container.replaceChild).toHaveBeenCalledWith(innerWCElement, wcItemPlaceholder);
    expect((wc_container as any)._luigi_mfe_webcomponent).toEqual(innerWCElement);

    expect(dispatchEventSpy).toHaveBeenCalledWith(new Event('wc_ready'));
  });

});

describe('dispatchLuigiEvent', () => {
  let service = new WebComponentService();

  it('should call containerService.dispatch with the correct arguments', () => {
    const dispatchSpy = jest.spyOn(service.containerService, 'dispatch').mockImplementation(() => {});

    const msg = 'testMessage';
    const data = { key: 'value' };
    const callback = jest.fn();

    // Act
    service.dispatchLuigiEvent(msg, data, callback);

    // Assert
    expect(dispatchSpy).toHaveBeenCalledWith(msg, service.thisComponent, data, callback);
  });
});

describe('createClientAPI', () => {
  let service;
  beforeEach(() => {
    service = new WebComponentService();
  });

  afterEach(() => {
    jest.resetAllMocks()
  });

  it('test linkManager navigate', () => {
    const route = '/test/route'

    // mock and spy on functions
    service.containerService.dispatch = jest.fn();
    const dispatchEventSpy = jest.spyOn(service, 'dispatchLuigiEvent');

    // act
    const clientAPI = service.createClientAPI(undefined, 'nodeId', 'wc_id', 'component');
    clientAPI.linkManager().navigate(route);

    // assert
    const expectedPayload = { link: route };
    expect(dispatchEventSpy).toHaveBeenCalledWith(Events.NAVIGATION_REQUEST, expectedPayload);
  });

  it('test uxManager showAlert', () => {
    const alertSettings = {
        text: "Some alert text",
        type: 'info',
    }

    // mock and spy on functions
    service.containerService.dispatch = jest.fn();
    const dispatchEventSpy = jest.spyOn(service, 'dispatchLuigiEvent');

    // act
    const clientAPI = service.createClientAPI(undefined, 'nodeId', 'wc_id', 'component');
    clientAPI.uxManager().showAlert(alertSettings);

    // assert
    expect(dispatchEventSpy).toHaveBeenCalledWith(Events.ALERT_REQUEST, alertSettings);
  });

  it('test uxManager getCurrentTheme', () => {
    // mock and spy on data/functions
    service.thisComponent = document.createElement('div');
    service.thisComponent.getAttribute = jest.fn();
    
    // act
    const clientAPI = service.createClientAPI(undefined, 'nodeId', 'wc_id', 'component');
    clientAPI.uxManager().getCurrentTheme();

    // assert
    expect(service.thisComponent.getAttribute).toHaveBeenCalledWith('theme');
  });

  it('test uxManager showConfirmationModal - resolve when data present', async () => {
    // mock and spy on data/functions
    const settings = { confirmationSettings: 'settings' };
    service.containerService.dispatch = jest.fn();

    const mockEventData = { result: 'confirmation data' };

    service.dispatchLuigiEvent = jest.fn((eventType, eventData, callback) => {
      callback(mockEventData);
    });
    
    // act
    const clientAPI = service.createClientAPI(undefined, 'nodeId', 'wc_id', 'component');
    const result = await clientAPI.uxManager().showConfirmationModal(settings);

    // assert
    expect(result).toEqual(mockEventData);
    expect(service.dispatchLuigiEvent).toHaveBeenCalledWith(Events.SHOW_CONFIRMATION_MODAL_REQUEST, settings, expect.any(Function))
  });
  
  it('test uxManager showConfirmationModal - reject when NO data present', async () => {
    // mock and spy on data/functions
    const settings = { confirmationSettings: 'settings' };

    service.dispatchLuigiEvent = jest.fn((eventType, eventData, callback) => {
      callback(null); // Simulate no data from dispatchLuigiEvent
    });

    // Act and Assert
    const clientAPI = service.createClientAPI(undefined, 'nodeId', 'wc_id', 'component');
    await expect(clientAPI.uxManager().showConfirmationModal(settings)).rejects.toThrow('No data');
  });

  it('test getCurrentLocale set value', () => {
    // mock and spy on data/functions
    service.thisComponent = document.createElement('div');
    service.thisComponent.setAttribute('locale', 'en')

    // act
    const clientAPI = service.createClientAPI(undefined, 'nodeId', 'wc_id', 'component');
    const result = clientAPI.getCurrentLocale();

    // assert
    expect(result).toEqual('en');
  });

  it('test getCurrentLocale getAttribute called', () => {
    // mock and spy on data/functions
    service.thisComponent = document.createElement('div');
    service.thisComponent.getAttribute = jest.fn();
    
    // act
    const clientAPI = service.createClientAPI(undefined, 'nodeId', 'wc_id', 'component');
    const result = clientAPI.getCurrentLocale();

    // assert
    expect(service.thisComponent.getAttribute).toHaveBeenCalledWith('locale');
  });

  it('test getCurrentLocale attribute NOT set', () => {
    // mock and spy on data/functions
    service.thisComponent = document.createElement('div');
    
    // act
    const clientAPI = service.createClientAPI(undefined, 'nodeId', 'wc_id', 'component');
    const result = clientAPI.getCurrentLocale();

    // assert
    expect(result).toEqual(null);
  });

  it('test getActiveFeatureToggles set value', () => {
    // mock and spy on data/functions
    service.thisComponent = document.createElement('div');
    service.thisComponent.setAttribute('active-feature-toggle-list', "['ft1','ft2']")

    // act
    const clientAPI = service.createClientAPI(undefined, 'nodeId', 'wc_id', 'component');
    const result = clientAPI.getActiveFeatureToggles();

    // assert
    expect(result).toEqual("['ft1','ft2']");
  });

  it('test getActiveFeatureToggles getAttribute called', () => {
    // mock and spy on data/functions
    service.thisComponent = document.createElement('div');
    service.thisComponent.getAttribute = jest.fn();
    
    // act
    const clientAPI = service.createClientAPI(undefined, 'nodeId', 'wc_id', 'component');
    const result = clientAPI.getActiveFeatureToggles();

    // assert
    expect(service.thisComponent.getAttribute).toHaveBeenCalledWith('active-feature-toggle-list');
  });

  it('test getActiveFeatureToggles attribute NOT set', () => {
    // mock and spy on data/functions
    service.thisComponent = document.createElement('div');
    
    // act
    const clientAPI = service.createClientAPI(undefined, 'nodeId', 'wc_id', 'component');
    const result = clientAPI.getActiveFeatureToggles();

    // assert
    expect(result).toEqual(null);
  });

  it('test publishEvent custom message Defined eventBusElement', () => {
    // mock and spy
    const eventBusElement = {
      eventBus: {
        onPublishEvent: () => {}
      }
    };
    const eventBusPublishEventSpy = jest.spyOn( eventBusElement.eventBus, 'onPublishEvent');
    const dispatchSpy = jest.spyOn(service.containerService, 'dispatch').mockImplementation(() => {});
    const customEvent = new CustomEvent('test-event', { detail: 1 })
    const node_id = 'nodeId';
    const wc_id = 'wc_id';

    // act 
    const clientAPI = service.createClientAPI(eventBusElement, node_id, wc_id, 'component');
    clientAPI.publishEvent(customEvent);
    const expectedPayload = {
      id: 'test-event',
      _metaData: {
        nodeId: 'nodeId',
        src: 'component',
        wc_id: 'wc_id'
      },
      data: 1
    };

    // asert
    expect(eventBusPublishEventSpy).toHaveBeenCalledWith(customEvent, node_id, wc_id);
    expect(dispatchSpy).toHaveBeenCalledWith(Events.CUSTOM_MESSAGE, undefined, expectedPayload, undefined);
  });

  it('test publishEvent custom message with UNDEFINED eventBusElement', () => {
    // mock and spy
    const expectedPayload = {
      id: 'test-event',
      _metaData: {
        nodeId: 'nodeId',
        src: 'component',
        wc_id: 'wc_id'
      },
      data: 1
    };
    const dispatchSpy = jest.spyOn(service.containerService, 'dispatch').mockImplementation(() => {});
    
    // act
    const clientAPI = service.createClientAPI(undefined, 'nodeId', 'wc_id', 'component');
    clientAPI.publishEvent(new CustomEvent('test-event', { detail: 1 }));
    
    // assert
    expect(dispatchSpy).toHaveBeenCalledWith(Events.CUSTOM_MESSAGE, undefined, expectedPayload, undefined);
  });

  it('test luigiClientInit', () => {
    // mock and spy on functions
    service.containerService.dispatch = jest.fn();
    const dispatchEventSpy = jest.spyOn(service, 'dispatchLuigiEvent');

    // act
    const clientAPI = service.createClientAPI(undefined, 'nodeId', 'wc_id', 'component');
    clientAPI.luigiClientInit();

    // assert
    expect(dispatchEventSpy).toHaveBeenCalledWith(Events.INITIALIZED, {});
  });

  it('test addNodeParams isSpecial FALSE', () => {
    // mock and spy on functions
    service.containerService.dispatch = jest.fn();
    const dispatchEventSpy = jest.spyOn(service, 'dispatchLuigiEvent');
    const params = {luigi: 'rocks'}
    const keepBrowserHistory = true;

    // act
    const clientAPI = service.createClientAPI(undefined, 'nodeId', 'wc_id', 'component', false);
    clientAPI.addNodeParams( params, keepBrowserHistory);

    // assert
    expect(dispatchEventSpy).toHaveBeenCalledWith(Events.ADD_NODE_PARAMS_REQUEST, {params, keepBrowserHistory});
  });

  it('test addNodeParams isSpecial TRUE', () => {
    // mock and spy on functions
    service.containerService.dispatch = jest.fn();
    const dispatchEventSpy = jest.spyOn(service, 'dispatchLuigiEvent');

    // act
    const clientAPI = service.createClientAPI(undefined, 'nodeId', 'wc_id', 'component', true);
    clientAPI.addNodeParams();

    // assert
    expect(dispatchEventSpy).not.toHaveBeenCalled();
  });

  it('test getNodeParams isSpecial TRUE', () => {
    // act
    const clientAPI = service.createClientAPI(undefined, 'nodeId', 'wc_id', 'component', true);
   
    // assert
    expect(clientAPI.getNodeParams()).toEqual({});
  });

  it('test getNodeParams isSpecial FALSE, shouldDesanitise true', () => {
    // mock and spy on data/functions
    service.thisComponent = document.createElement('div');
    const paramsRaw = `{ "test": "sum 2+2 &lt; 3+5 and 5 &gt; 1" }`;
    const paramsObject = { "test": 'sum 2+2 &lt; 3+5 and 5 &gt; 1' };
    const paramsResult = { "test": 'sum 2+2 < 3+5 and 5 > 1' };

    service.thisComponent.getAttribute =  jest.fn().mockReturnValue(paramsRaw);
    const ddeSanitizeParamsMapSpy = jest.spyOn(helperFunctions, 'deSanitizeParamsMap');

    // act
    const clientAPI = service.createClientAPI(undefined, 'nodeId', 'wc_id', 'component', false);
    const result = clientAPI.getNodeParams(true);

    // assert
    expect(service.thisComponent.getAttribute).toHaveBeenCalledWith('node-params');
    expect(ddeSanitizeParamsMapSpy).toHaveBeenCalledWith(paramsObject)
    expect(result).toEqual(paramsResult);
  });

  it('test getNodeParams isSpecial FALSE, shouldDesanitise false', () => {
    // mock and spy on data/functions
    service.thisComponent = document.createElement('div');
    const paramsRaw = `{ "test": "luigi" }`;
    const params = { "test": 'luigi' };

    service.thisComponent.getAttribute =  jest.fn().mockReturnValue(paramsRaw);
    const deSanitizeParamsMapSpy = jest.spyOn(helperFunctions, 'deSanitizeParamsMap');

    // act
    const clientAPI = service.createClientAPI(undefined, 'nodeId', 'wc_id', 'component', false);
    const result = clientAPI.getNodeParams(false);

    // assert
    expect(service.thisComponent.getAttribute).toHaveBeenCalledWith('node-params');
    expect(deSanitizeParamsMapSpy).not.toHaveBeenCalled()
    expect(result).toEqual(params);
  });

  // it('test getNodeParams isSpecial FALSE, shouldDesanitise false, NO node-params', () => {
  //   // mock and spy on data/functions
  //   service.thisComponent = document.createElement('div');

  //   service.thisComponent.getAttribute =  jest.fn().mockReturnValue(undefined);
  //   const deSanitizeParamsMapSpy = jest.spyOn(helperFunctions, 'deSanitizeParamsMap');

  //   // act
  //   const clientAPI = service.createClientAPI(undefined, 'nodeId', 'wc_id', 'component', false);
  //   const result = clientAPI.getNodeParams(false);

  //   // assert
  //   expect(service.thisComponent.getAttribute).toHaveBeenCalledWith('node-params');
  //   expect(deSanitizeParamsMapSpy).not.toHaveBeenCalled()
  //   expect(result).toEqual({}); // SHOULD WORK, NEED TO FIX CONTAINER CODE
  // });

  it('test setAnchor isSpecial FALSE', () => {
    // mock and spy on functions
    service.containerService.dispatch = jest.fn();
    const dispatchEventSpy = jest.spyOn(service, 'dispatchLuigiEvent');
    const anchor = 'some-anchor'

    // act
    const clientAPI = service.createClientAPI(undefined, 'nodeId', 'wc_id', 'component', false);
    clientAPI.setAnchor(anchor);

    // assert
    expect(dispatchEventSpy).toHaveBeenCalledWith(Events.SET_ANCHOR_LINK_REQUEST, anchor);
  });

  it('test setAnchor isSpecial TRUE', () => {
    // mock and spy on functions
    service.containerService.dispatch = jest.fn();
    const dispatchEventSpy = jest.spyOn(service, 'dispatchLuigiEvent');
    const anchor = 'some-anchor'

    // act
    const clientAPI = service.createClientAPI(undefined, 'nodeId', 'wc_id', 'component', true);
    clientAPI.setAnchor(anchor);

    // assert
    expect(dispatchEventSpy).not.toHaveBeenCalled();
  });

  it('test getAnchor set value', () => {
    // mock and spy on data/functions
    service.thisComponent = document.createElement('div');
    service.thisComponent.setAttribute('anchor', "home")

    // act
    const clientAPI = service.createClientAPI(undefined, 'nodeId', 'wc_id', 'component');
    const result = clientAPI.getAnchor();

    // assert
    expect(result).toEqual("home");
  });

  it('test getAnchor getAttribute called', () => {
    // mock and spy on data/functions
    service.thisComponent = document.createElement('div');
    service.thisComponent.getAttribute = jest.fn();
    
    // act
    const clientAPI = service.createClientAPI(undefined, 'nodeId', 'wc_id', 'component');
    const result = clientAPI.getAnchor();

    // assert
    expect(service.thisComponent.getAttribute).toHaveBeenCalledWith('anchor');
  });

  it('test getAnchor attribute NOT set', () => {
    // mock and spy on data/functions
    service.thisComponent = document.createElement('div');
    
    // act
    const clientAPI = service.createClientAPI(undefined, 'nodeId', 'wc_id', 'component');
    const result = clientAPI.getAnchor();

    // assert
    expect(result).toEqual('');
  });

  it('test getCoreSearchParams WITH attribute', () => {
    // mock and spy on data/functions
    service.thisComponent = document.createElement('div');
    const paramsRaw = `{ "test": "sum 2+2 = 4" }`;
    const paramsObject = { "test": "sum 2+2 = 4" };
    service.thisComponent.getAttribute =  jest.fn().mockReturnValue(paramsRaw);

    // act
    const clientAPI = service.createClientAPI(undefined, 'nodeId', 'wc_id', 'component', false);
    const result = clientAPI.getCoreSearchParams();

    // assert
    expect(service.thisComponent.getAttribute).toHaveBeenCalledWith('search-params');
    expect(result).toEqual(paramsObject);
  });

  // it('test getCoreSearchParams UNDEFINED attribute', () => {
  //   // mock and spy on data/functions
  //   service.thisComponent = document.createElement('div');
  //   service.thisComponent.getAttribute =  jest.fn().mockReturnValue(undefined);

  //   // act
  //   const clientAPI = service.createClientAPI(undefined, 'nodeId', 'wc_id', 'component', false);
  //   const result = clientAPI.getCoreSearchParams();

  //   // assert
  //   expect(service.thisComponent.getAttribute).toHaveBeenCalledWith('search-params');
  //   expect(result).toEqual({}); // SHOULD WORK, NEED CHANGE CODE
  // });

  it('test getPathParams WITH attribute', () => {
    // mock and spy on data/functions
    service.thisComponent = document.createElement('div');
    const paramsRaw = `{ "pathParam": "sum 2+2 = 4" }`;
    const paramsObject = { "pathParam": "sum 2+2 = 4" };
    service.thisComponent.getAttribute =  jest.fn().mockReturnValue(paramsRaw);

    // act
    const clientAPI = service.createClientAPI(undefined, 'nodeId', 'wc_id', 'component', false);
    const result = clientAPI.getPathParams();

    // assert
    expect(service.thisComponent.getAttribute).toHaveBeenCalledWith('path-params');
    expect(result).toEqual(paramsObject);
  });

  // it('test getPathParams UNDEFINED attribute', () => {
  //   // mock and spy on data/functions
  //   service.thisComponent = document.createElement('div');
  //   service.thisComponent.getAttribute = jest.fn().mockReturnValue(undefined);

  //   // act
  //   const clientAPI = service.createClientAPI(undefined, 'nodeId', 'wc_id', 'component', false);
  //   const result = clientAPI.getPathParams();

  //   // assert
  //   expect(service.thisComponent.getAttribute).toHaveBeenCalledWith('path-params');
  //   expect(result).toEqual({}); // SHOULD WORK, NEED CHANGE CODE
  // });

  
  it('test getClientPermissions WITH attribute', () => {
    // mock and spy on data/functions
    service.thisComponent = document.createElement('div');
    const paramsRaw = `{ "permissions": "lots of permission" }`;
    const paramsObject = { "permissions": "lots of permission" };
    service.thisComponent.getAttribute =  jest.fn().mockReturnValue(paramsRaw);

    // act
    const clientAPI = service.createClientAPI(undefined, 'nodeId', 'wc_id', 'component', false);
    const result = clientAPI.getClientPermissions();

    // assert
    expect(service.thisComponent.getAttribute).toHaveBeenCalledWith('client-permissions');
    expect(result).toEqual(paramsObject);
  });

  it('test getUserSettings WITH attribute', () => {
    // mock and spy on data/functions
    service.thisComponent = document.createElement('div');
    const paramsRaw = `{ "permissions": "lots of permission" }`;
    const paramsObject = { "permissions": "lots of permission" };
    service.thisComponent.getAttribute =  jest.fn().mockReturnValue(paramsRaw);

    // act
    const clientAPI = service.createClientAPI(undefined, 'nodeId', 'wc_id', 'component', false);
    const result = clientAPI.getUserSettings();

    // assert
    expect(service.thisComponent.getAttribute).toHaveBeenCalledWith('user-settings');
    expect(result).toEqual(paramsObject);
  });
});

describe('initWC', () => {
  let service;
  const wc_id = 'someId';
  const eventBusElement = 'eventBusElement';
  const viewUrl = 'https://example.com/some-page';
  const ctx = { some: 'context' };
  const nodeId = 'node123';
  const isSpecialMf = true;

  beforeEach(() => {
    service = new WebComponentService();
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should set context and LuigiClient if wc.__postProcess is not defined', () => {
    // Arrange
    const wc = { context: null, LuigiClient: null };
    const spyClientAPI = jest.spyOn(service, 'createClientAPI')

    // Act
    service.initWC(wc, wc_id, eventBusElement, viewUrl, ctx, nodeId, isSpecialMf);

    // Assert
    expect(wc.context).toEqual(ctx);
    expect(wc.LuigiClient).toBeDefined();
    expect(spyClientAPI).toHaveBeenCalledWith(eventBusElement, nodeId,wc_id,wc,isSpecialMf)
  });

  it('should call wc.__postProcess if wc.__postProcess is defined', () => {
    // Arrange
    const wc = { __postProcess: jest.fn() };

    const clientAPIReturnVal = {
      getCurrentLocale: () =>{}
    }
    const spyClientAPI = jest.spyOn(service, 'createClientAPI').mockReturnValue(clientAPIReturnVal);
  
    const baseURIMocked ='https://example.com/some-page/1'
    jest.spyOn(document, 'baseURI', 'get').mockReturnValue(baseURIMocked);
    const documentOrigin = 'https://example.com/some-page';
    const urlSpyMockData = {
      origin: documentOrigin,
      pathname: '/another-page',
    }
    const urlSpy = jest.spyOn(global as any, 'URL').mockImplementation((url) => (urlSpyMockData));

    // Act
    service.initWC(wc, wc_id, eventBusElement, viewUrl, ctx, nodeId, isSpecialMf);

    // Assert
    expect(spyClientAPI).toHaveBeenCalledWith(eventBusElement, nodeId,wc_id,wc,isSpecialMf);
    expect(wc.__postProcess).toHaveBeenCalledWith(ctx, clientAPIReturnVal, documentOrigin + '/another-page');
    expect(urlSpy).toHaveBeenCalledTimes(4);
    expect(urlSpy).toHaveBeenNthCalledWith(1, baseURIMocked);
    expect(urlSpy).toHaveBeenNthCalledWith(2, documentOrigin, baseURIMocked);
    expect(urlSpy).toHaveBeenNthCalledWith(3, documentOrigin, baseURIMocked);
    expect(urlSpy).toHaveBeenNthCalledWith(4, './', urlSpyMockData);
  });

  
});

describe('generateWCId function', () => {
  let service;

  beforeEach(() => {
    service = new WebComponentService();
  });

  // Test case 1: Testing with a simple view URL
  it('should generate an ID for a simple view URL', () => {
    const URLReturn = '/mocked-URL-return-path';
    jest.spyOn(global as any, 'URL').mockImplementation((viewUrl, base) => ({
        href: URLReturn,
    }));
    const viewUrl = 'https://example.com/page1';
    const expectedId = 'luigi-wc-2f6d6f636b65642d55524c2d72657475726e2d70617468';
    const result = service.generateWCId(viewUrl);
    expect(result).toBe(expectedId);
  });

  // Test case 2: Testing with a URL containing special characters
  it('should generate an ID for a URL with special characters', () => {
    const viewUrl = 'https://example.com/page?name=John&age=30';
    const URLReturn = '/mocked-URL-return-path';
    jest.spyOn(global as any, 'URL').mockImplementation((viewUrl, base) => ({
        href: URLReturn,
    }));
    const expectedId = 'luigi-wc-2f6d6f636b65642d55524c2d72657475726e2d70617468';
    const result = service.generateWCId(viewUrl);
    expect(result).toBe(expectedId);
  });

  // Test case 3: Testing with an empty URL
  it('should generate an ID for an empty view URL', () => {
    const viewUrl = '';
    const URLReturn = '/mocked-URL-return-path';
   jest.spyOn(global as any, 'URL').mockImplementation((viewUrl, base) => ({
        href: URLReturn,
    }));
    const expectedId = 'luigi-wc-2f6d6f636b65642d55524c2d72657475726e2d70617468';
    const result = service.generateWCId(viewUrl);
    expect(result).toBe(expectedId);
  });
});

describe('renderWebComponentCompound', () => {
  let service;
  beforeEach(() => {
    service = new WebComponentService()
  });

  it('resolved', async () => {
    jest.spyOn(helperFunctions, 'resolveRenderer');
    service.createCompoundContainerAsync = jest.fn();
    service.renderWebComponent = jest.fn();
    service.registerEventListeners = jest.fn();


    // Mock createCompoundContainerAsync to return a mock compound container
    const mockCompoundContainer = document.createElement('div');
    service.createCompoundContainerAsync.mockResolvedValue(mockCompoundContainer);

    const navNode = {};
    //   compound: {
    //     children: []
    //   }
    // };
    const wc_container = document.createElement('div');
    const context = {}

    // Call the function
    await service.renderWebComponentCompound(navNode, wc_container, context);

    // Assertions
    expect(helperFunctions.resolveRenderer).toHaveBeenCalledTimes(0);
    expect(service.createCompoundContainerAsync).toHaveBeenCalledTimes(1);
    expect(service.registerEventListeners).toHaveBeenCalledTimes(0);
    expect(service.renderWebComponent).toHaveBeenCalledTimes(0);
    // Additional assertions based on your specific use case

  });

  it('rejected',  () => {
    jest.spyOn(helperFunctions, 'resolveRenderer');
    service.createCompoundContainerAsync = jest.fn();
    service.renderWebComponent = jest.fn();
    service.registerEventListeners = jest.fn();

    // Mock createCompoundContainerAsync to return a mock compound container
    service.createCompoundContainerAsync = jest.fn().mockRejectedValue({});

    const navNode = {};
    const wc_container = document.createElement('div');
    const context = {}
    service.containerService = new ContainerService();
    service.containerService.dispatch = jest.fn();

    // Call the function
    service.renderWebComponentCompound(navNode, wc_container, context);

    // Assertions
    expect(helperFunctions.resolveRenderer).toHaveBeenCalledTimes(0);
    expect(service.createCompoundContainerAsync).toHaveBeenCalledTimes(1);
    expect(service.registerEventListeners).toHaveBeenCalledTimes(0);
    expect(service.renderWebComponent).toHaveBeenCalledTimes(0);
  });
});

describe('createCompoundContainerAsync', () => {
  let service;

  beforeEach(() => {
    service = new WebComponentService();
  });

  afterEach(() => {
    jest.clearAllMocks(); // Clear mock function call history after each test
    jest.resetAllMocks()
  });

  it('should resolve with a web component when renderer has a viewUrl', async () => {
    // Arrange
    const renderer = {
      viewUrl: 'https://example.com/webcomponent',
    };
    const ctx = {}
    const mockGeneratedWCId = 'mocked-wc-id';
    const mockWebComponent = document.createElement(mockGeneratedWCId);
    const navNode = {}

    service.initWC = jest.fn();
    service.registerWCFromUrl = jest.fn().mockResolvedValue(mockWebComponent);
    service.generateWCId = jest.fn().mockReturnValue(mockGeneratedWCId);
    service.containerService.dispatch = jest.fn();

    // Act and Assert
    const result = await service.createCompoundContainerAsync(renderer, ctx, navNode)
    expect(result).toEqual(mockWebComponent);

    // Additional Assertions
    expect(service.generateWCId).toHaveBeenCalledWith(renderer.viewUrl);
    expect(service.registerWCFromUrl).toHaveBeenCalledWith(renderer.viewUrl, mockGeneratedWCId);
    expect(service.initWC).toHaveBeenCalledWith(mockWebComponent, mockGeneratedWCId, mockWebComponent, renderer.viewUrl, ctx, '_root');
  });

  // TODO: NEEDS changing TRY/CATCH not rejecting properly
  // it.only('should reject when there is an error during registration', async () => {
  //   // Arrange
  //   const renderer = {
  //     viewUrl: 'https://example.com/webcomponent',
  //   };
  //   const ctx = {};    
  //   const mockGeneratedWCId = 'mocked-wc-id';
  //   const mockWebComponent = document.createElement(mockGeneratedWCId);
  //   const rejectVal = 'Rejected Reason...';

  //   // service.initWC = jest.fn();
  //   // service.generateWCId = jest.fn().mockReturnValue(mockGeneratedWCId);
  //   service.registerWCFromUrl = jest.fn().mockRejectedValue(rejectVal)
  //   service.containerService.dispatch = jest.fn();
  //   const consoleSpy = jest.spyOn(console, 'warn')

  //   // jest.spyOn(service, 'generateWCId').mockReturnValue(mockGeneratedWCId);
  //   // .mockImplementation((msg) => {
  //   //   return 'Error: ' + rejectVal
  //   // });
  //   console.warn = jest.fn();

  //   // Act and Assert
  //   const result =  service.createCompoundContainerAsync(renderer, ctx);
  //   expect(result).toEqual('Registration error');
  //   expect(consoleSpy).toHaveBeenLastCalledWith('Error: {}')
  // });

  it('should resolve with a compound container when renderer has no viewUrl', async () => {
    // Arrange
    const renderer = {
      createCompoundContainer: jest.fn(),
    };
    const ctx = {};

    // Act and Assert
    await expect(service.createCompoundContainerAsync(renderer, ctx)).resolves.toEqual(renderer.createCompoundContainer());
  });
});

describe('registerWCFromUrl', () => {
  let service;

  beforeEach(() => {
    service = new WebComponentService();
  });

  afterEach(() => {
    jest.clearAllMocks(); // Clear mock function call history after each test
    jest.resetAllMocks()
  });

  it('should successfully register a web component customElements get = UNDEFINED', async () => {
    // Arrange
    const viewUrl = 'valid-view-url';
    const wc_id = 'custom-element-id';

    // Mock the dynamicImport function to return a module with a valid
    const spy = jest.spyOn(window.customElements, 'get').mockReturnValue(undefined)

    service.dynamicImport = jest.fn((viewUrl) =>
      Promise.resolve({
        default: class ValidWebComponent extends HTMLElement {},
      })
    );
    window.customElements.define = jest.fn();

    // act
    const result = await service.registerWCFromUrl(viewUrl, wc_id);

    // Assert
    expect(result).toBe(1); // Registration successful
    expect(service.dynamicImport).toHaveBeenCalledWith('valid-view-url');
    expect(service.dynamicImport).resolves;
    expect(spy).toHaveBeenCalled()
    expect(window.customElements.define).toHaveBeenCalled();


    // expect(window.customElements.define).toHaveBeenCalledWith('custom-element-id', expect.any(Function));
  });

  // it('should reject the promise when registration fails', async () => {
  //   // Arrange
  //   const viewUrl = 'valid-view-url';
  //   const wc_id = 'custom-element-id';

  //   // Mock the dynamicImport function to return a module with an error
    
  //   jest.spyOn(window as any, 'customElements').mockImplementation(() => ({
  //     get: jest.fn(() => undefined),
  //     define: jest.fn(),
  //   }));
  //   const dynamicImportMock = jest.fn(() => Promise.reject('Registration error'));
  //   jest.spyOn(window, 'fetch').mockImplementation(() =>
  //     (Promise as any).resolve({
  //       ok: true,
  //       json: () => Promise.resolve({}),
  //     })
  //   );

  //   // Act and assert
  //   await expect(service.registerWCFromUrl(viewUrl, wc_id)).rejects.toEqual('Registration error');
  //   expect(dynamicImportMock).toHaveBeenCalledWith('valid-view-url');
  // });

  // it('should reject the promise when the view URL is not allowed', async () => {
  //   // Arrange
  //   const viewUrl = 'forbidden-view-url';
  //   const wc_id = 'custom-element-id';

  //   // Mock the dynamicImport function to return a module with a valid web component
  //   jest.spyOn(window as any, 'customElements').mockImplementation(() => ({
  //     get: jest.fn(() => undefined),
  //     define: jest.fn(),
  //   }));
  //   const dynamicImportMock = jest.fn(() =>
  //     Promise.resolve({
  //       default: class ValidWebComponent extends HTMLElement {},
  //     })
  //   );
  //   jest.spyOn(window, 'fetch').mockImplementation(() =>
  //     (Promise as any).resolve({
  //       ok: true,
  //       json: () => Promise.resolve({}),
  //     })
  //   );

  //   // Act and assert
  //   await expect(service.registerWCFromUrl(viewUrl, wc_id)).rejects.toEqual('Error: View URL \'forbidden-view-url\' not allowed to be included');
  // });

});
