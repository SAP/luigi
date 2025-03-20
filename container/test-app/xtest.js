/** @typedef {import('../src/constants/communication.ts').Events} Events */
import Events from './bundle.js';

/** @type {Events} */
const LuigiEvents = Events;

const iframeContainer = document.querySelector('#iframe-based-container-test');
const wcContainer = document.querySelector('#wc-based-container-test');
const res = document.querySelector('#results');

window.clearResults = function () {
  res.innerHTML = '';
};

function getIframeClient() {
  return iframeContainer.shadowRoot.querySelector('iframe').contentWindow.LuigiClient;
}
function getWCClient() {
  return wcContainer.shadowRoot.querySelector('[lui_web_component]').LuigiClient;
}

function getCreateResultContainer(id) {
  let resCnt = res.querySelector(`[restype=${id}]`);
  if (!resCnt) {
    resCnt = document.createElement('div');
    resCnt.setAttribute('restype', id);
    resCnt.setAttribute('style', 'border: 1px solid grey; overflow: hidden');
    resCnt.innerHTML = `<span style="font-weight: bold">${id}</span>`;
    res.appendChild(resCnt);
  }
  return resCnt;
}

function createApiTrigger(luigiEventID, manager, functionName, ...args) {
  const createPayloadEL = (color) => {
    return (event) => {
      const payloadCnt = document.createElement('div');
      payloadCnt.style.color = color;
      payloadCnt.innerHTML = `${JSON.stringify(event.payload, undefined, 1)}`;
      payloadCnt.title = payloadCnt.innerHTML;
      payloadCnt.payload = event.payload;
      getCreateResultContainer(event.type).appendChild(payloadCnt);
    };
  };

  iframeContainer.addEventListener(luigiEventID, createPayloadEL('green'));
  wcContainer.addEventListener(luigiEventID, createPayloadEL('blue'));

  const btn = document.createElement('button');
  btn.innerHTML = luigiEventID;
  document.querySelector('#actions').appendChild(btn);
  const keepResultCheck = document.getElementById('keepRes');
  btn.addEventListener('click', () => {
    if (!keepResultCheck.checked) {
      window.clearResults();
    }
    let ifBase = getIframeClient();
    let wcBase = getWCClient();

    if (manager) {
      try {
        ifBase = ifBase[manager]();
      } catch (e) {
        console.error(e);
      }
      try {
        wcBase = wcBase[manager]();
      } catch (e) {
        console.error(e);
      }
    }
    ifBase[functionName](...args);
    if (functionName === 'sendCustomMessage') {
      // Exception for customMessage
      wcBase.publishEvent(new CustomEvent(args[0].id, { detail: args[0] }));
    } else {
      wcBase[functionName](...args);
    }
  });
}

//
// ROOT
createApiTrigger(LuigiEvents.SET_VIEW_GROUP_DATA_REQUEST, undefined, 'setViewGroupData', { vg1: 'Luigi rocks ' });
createApiTrigger(LuigiEvents.SET_ANCHOR_LINK_REQUEST, undefined, 'setAnchor', 'myAnchor');
createApiTrigger(LuigiEvents.ADD_NODE_PARAMS_REQUEST, undefined, 'addNodeParams', { luigi: 'rocks' }, true);
createApiTrigger(LuigiEvents.ADD_SEARCH_PARAMS_REQUEST, undefined, 'addCoreSearchParams', { luigi: 'rocks' }, true);
createApiTrigger(LuigiEvents.CUSTOM_MESSAGE, undefined, 'sendCustomMessage', {
  id: 'myId',
  foo: 'bar'
});

// UXMANAGER
createApiTrigger(LuigiEvents.ALERT_REQUEST, 'uxManager', 'showAlert', {
  text: 'test text'
});
createApiTrigger(LuigiEvents.SHOW_CONFIRMATION_MODAL_REQUEST, 'uxManager', 'showConfirmationModal', {
  text: 'test text'
});
createApiTrigger('add-backdrop-request', 'uxManager', 'addBackdrop', {});
createApiTrigger(LuigiEvents.REMOVE_BACKDROP_REQUEST, 'uxManager', 'removeBackdrop', {});

// LINKMANAGER
createApiTrigger(LuigiEvents.NAVIGATION_REQUEST, 'linkManager', 'navigate', '/foo/bar');
createApiTrigger(LuigiEvents.GO_BACK_REQUEST, 'linkManager', 'goBack', { go: 'back' });

// STORAGEMANAGER - not for wc
createApiTrigger(LuigiEvents.LOCAL_STORAGE_SET_REQUEST, 'storageManager', 'setItem', 'storageKey', 'storageValue');
