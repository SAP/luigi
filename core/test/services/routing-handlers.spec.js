// const chai = require('chai');
// const assert = chai.assert;
// const sinon = require('sinon');
// const MockBrowser = require('mock-browser').mocks.MockBrowser;
// import {
//   handleRouteChange,
//   handleRouteClick
// } from '../../src/services/routing-handlers';
// import { deepMerge } from '../../src/utilities/helpers/generic-helpers';
// import { afterEach } from 'mocha';
// import { LuigiConfig } from '../../src/services/config';

// describe('Routing-handlers', () => {
//   let component;
//   beforeEach(() => {
//     let lastObj = {};
//     component = {
//       set: obj => {
//         Object.assign(lastObj, obj);
//       },
//       get: () => lastObj
//     };

//     sinon.stub(LuigiConfig, 'getConfigValue');
//   });
//   afterEach(() => {
//     if (document.createElement.restore) {
//       document.createElement.restore();
//     }
//     sinon.restore();
//   });
// });
