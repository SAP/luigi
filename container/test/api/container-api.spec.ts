import { LuigiInternalMessageID } from '../../src/constants/internal-communication';
import { Events } from '../../src/constants/communication';
import { ContainerAPIFunctions } from '../../src/api/container-api';
import { containerService } from '../../src/services/container.service';


describe('Container Service', () => {
    describe('updateContext', () => {
        let containerAPI = new ContainerAPIFunctions();

        it('iframeHandle exists', () => {
            // mock and spy
            const contextObj = {};
            const internal = {};
            const iframeHandle = {
                data: 'test'
            };
            containerService.sendCustomMessageToIframe = jest.fn();
            const spy = jest.spyOn(containerService, 'sendCustomMessageToIframe');

            containerAPI.updateContext(contextObj, internal,iframeHandle);

            expect(spy).toHaveBeenCalledWith(iframeHandle, {context: contextObj, internal: internal }, LuigiInternalMessageID.SEND_CONTEXT_OBJECT)
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

            containerAPI.closeAlert(id, dismissKey,iframeHandle );

            expect(spy).toHaveBeenCalledWith(iframeHandle, {id, dismissKey}, LuigiInternalMessageID.ALERT_CLOSED)
        });
    });
    

    describe('sendCustomMessage', () => {
        let containerAPI = new ContainerAPIFunctions();

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

            containerAPI.sendCustomMessage(id, mainComponent, isWebComponent,iframeHandle, data );

            expect(spy).toHaveBeenCalledWith(id, mainComponent._luigi_mfe_webcomponent, data)
        });
    });
    

    

    
});
