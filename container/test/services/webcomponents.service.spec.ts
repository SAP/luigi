import { Events } from '../../src/constants/communication';
import { ContainerService, containerService } from '../../src/services/container.service';
import { WebComponentService } from '../../src/services/webcomponents.service';
import * as helperFunctions from '../../src/services/web-component-helpers';


describe('trivial functions', () => {
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

  // it('test getClientPermissions UNDEFINED attribute', () => {
  //   // mock and spy on data/functions
  //   service.thisComponent = document.createElement('div');
  //   service.thisComponent.getAttribute = jest.fn().mockReturnValue(undefined);

  //   // act
  //   const clientAPI = service.createClientAPI(undefined, 'nodeId', 'wc_id', 'component', false);
  //   const result = clientAPI.getClientPermissions();

  //   // assert
  //   expect(service.thisComponent.getAttribute).toHaveBeenCalledWith('client-permissions');
  //   expect(result).toEqual({}); // SHOULD WORK, NEED CHANGE CODE
  // });

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

  // it('test getUserSettings UNDEFINED attribute', () => {
  //   // mock and spy on data/functions
  //   service.thisComponent = document.createElement('div');
  //   service.thisComponent.getAttribute = jest.fn().mockReturnValue(undefined);

  //   // act
  //   const clientAPI = service.createClientAPI(undefined, 'nodeId', 'wc_id', 'component', false);
  //   const result = clientAPI.getUserSettings();

  //   // assert
  //   expect(service.thisComponent.getAttribute).toHaveBeenCalledWith('client-permissions');
  //   expect(result).toEqual({}); // SHOULD WORK, NEED CHANGE CODE
  // });

});