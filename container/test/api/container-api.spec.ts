import { LuigiInternalMessageID } from '../../src/constants/internal-communication';
import { Events } from '../../src/constants/communication';
import { ContainerAPIFunctions } from '../../src/api/container-api';
import { containerService } from '../../src/services/container.service';


describe('Container Service', () => {
    describe('updateContext', () => {
        let containerAPI = new ContainerAPIFunctions();

        it('iframeHandle exists, WITH internalParam', () => {
            // mock and spy
            const contextObj = {};
            const internal = { empty: false };
            const iframeHandle = {
                data: 'test'
            };
            containerService.sendCustomMessageToIframe = jest.fn();
            const spy = jest.spyOn(containerService, 'sendCustomMessageToIframe');

            // act
            containerAPI.updateContext(contextObj, internal, iframeHandle);

            // assert
            expect(spy).toHaveBeenCalledWith(iframeHandle, { context: contextObj, internal: internal, withoutSync: true }, LuigiInternalMessageID.SEND_CONTEXT_OBJECT)
        });

        it('iframeHandle exists, UNDEFINED internalParam ', () => {
            // mock and spy
            const contextObj = {};
            const internal = undefined;
            const iframeHandle = {
                data: 'test'
            };
            containerService.sendCustomMessageToIframe = jest.fn();
            const spy = jest.spyOn(containerService, 'sendCustomMessageToIframe');

            // act
            containerAPI.updateContext(contextObj, internal, iframeHandle);

            // assert
            expect(spy).toHaveBeenCalledWith(iframeHandle, { context: contextObj, internal: {}, withoutSync: true }, LuigiInternalMessageID.SEND_CONTEXT_OBJECT)
        });


        it('iframeHandle NOT exists', () => {
            // mock and spy
            const contextObj = {};
            const internal = {};
            const iframeHandle = undefined;
            containerService.sendCustomMessageToIframe = jest.fn();
            const sendCustomMSGSpy = jest.spyOn(containerService, 'sendCustomMessageToIframe');
            const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation(jest.fn());

            // act
            containerAPI.updateContext(contextObj, internal, iframeHandle);

            // assert
            expect(sendCustomMSGSpy).not.toHaveBeenCalled();
            expect(consoleWarnSpy).toHaveBeenCalledWith('Attempting to update context on inexisting iframe')
        });
    });

    describe('closeAlert', () => {
        let containerAPI = new ContainerAPIFunctions();

        it('internal method properly called', () => {
            // mock and spy
            const id = 'some-id';
            const dismissKey = 'key';
            const iframeHandle = {
                data: 'test'
            };
            containerService.sendCustomMessageToIframe = jest.fn();
            const spy = jest.spyOn(containerService, 'sendCustomMessageToIframe');

            containerAPI.closeAlert(id, dismissKey, iframeHandle);

            expect(spy).toHaveBeenCalledWith(iframeHandle, { id, dismissKey }, LuigiInternalMessageID.ALERT_CLOSED)
        });
    });


    describe('sendCustomMessage', () => {
        let containerAPI = new ContainerAPIFunctions();
        beforeEach(() => {
            // jest.restoreAllMocks();
            jest.resetAllMocks();
        });

        it('isWebComponent microfrontend', () => {
            // mock and spy
            const id = 'some-id';
            const mainComponent = {
                _luigi_mfe_webcomponent: {
                    testData: 'your wc data'
                }
            };
            const data = {
                sample: 'test'
            };
            const isWebComponent = true;
            const iframeHandle = {
                data: 'test'
            };

            containerService.dispatch = jest.fn();
            const spy = jest.spyOn(containerService, 'dispatch');

            containerAPI.sendCustomMessage(id, mainComponent, isWebComponent, iframeHandle, data);

            expect(spy).toHaveBeenCalledWith(id, mainComponent._luigi_mfe_webcomponent, data)
        });

        it('isWebComponent FALSE, WITH msg ID', () => {
            // mock and spy
            const id = 'some-id';
            const mainComponent = {};
            const data = {
                id: id
            };
            const isWebComponent = false;
            const iframeHandle = {
                data: 'test'
            };

            containerService.sendCustomMessageToIframe = jest.fn();
            const sendCustomMSGSpy = jest.spyOn(containerService, 'sendCustomMessageToIframe');
            const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation(jest.fn());

            // act
            containerAPI.sendCustomMessage(id, mainComponent, isWebComponent, iframeHandle, data);

            // assert
            expect(sendCustomMSGSpy).toHaveBeenCalledWith(iframeHandle, data)
            expect(consoleWarnSpy).toHaveBeenCalledWith('Property "id" is reserved and can not be used in custom message data')
        });

        it('isWebComponent FALSE, UNDEFINED msg ID', () => {
            // mock and spy
            const id = 'some-id';
            const mainComponent = {};
            const data = {};
            const isWebComponent = false;
            const iframeHandle = {
                data: 'test'
            };

            containerService.sendCustomMessageToIframe = jest.fn();
            const sendCustomMSGSpy = jest.spyOn(containerService, 'sendCustomMessageToIframe');
            const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation(() => { jest.fn() });

            // act
            containerAPI.sendCustomMessage(id, mainComponent, isWebComponent, iframeHandle, data);

            // assert
            expect(sendCustomMSGSpy).toHaveBeenCalledWith(iframeHandle, { id })
            expect(consoleWarnSpy).not.toHaveBeenCalled();
        });
    });
});
