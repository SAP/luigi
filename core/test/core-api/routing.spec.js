import { afterEach } from 'mocha';
import { LuigiRouting, LuigiConfig } from '../../src/core-api';

const chai = require('chai');
const assert = chai.assert;
const sinon = require('sinon');

describe('Luigi routing', function() {
  const globalLocationRef = global.location;

  beforeEach(() => {
    window.history.pushState = sinon.spy();
    window.history.replaceState = sinon.spy();
    sinon.stub(LuigiConfig, 'configChanged');
  });
  afterEach(() => {
    global.location = globalLocationRef;
    sinon.restore();
  });
  describe('SearchParams path routing', () => {
    it('get searchparams', () => {
      global.location = 'http://some.url.de?test=tets&luigi=rocks';
      assert.deepEqual(LuigiRouting.getSearchParams(), { test: 'tets', luigi: 'rocks' });
    });
    it('get searchparams', () => {
      global.location = 'http://some.url.de/something?test=tets&luigi=rocks';
      assert.deepEqual(LuigiRouting.getSearchParams(), { test: 'tets', luigi: 'rocks' });
    });
    it('get searchparams when no query parameter', () => {
      global.location = 'http://some.url.de';
      assert.deepEqual(LuigiRouting.getSearchParams(), {});
    });
    it('set searchparams', () => {
      window.state = {};
      global.location = 'http://some.url.de';
      LuigiRouting.addSearchParams({ foo: 'bar' }, true);
      sinon.assert.calledWithExactly(window.history.pushState, window.state, '', 'http://some.url.de/?foo=bar');
    });
    it('set searchparams without keeping browser history', () => {
      window.state = {};
      global.location = 'http://some.url.de';
      LuigiRouting.addSearchParams({ foo: 'bar' }, false);
      sinon.assert.calledWithExactly(window.history.replaceState, window.state, '', 'http://some.url.de/?foo=bar');
    });
    it('add search params to searchparams', () => {
      window.state = {};
      global.location = 'http://some.url.de?test=tets';
      LuigiRouting.addSearchParams({ foo: 'bar' }, true);
      sinon.assert.calledWithExactly(
        window.history.pushState,
        window.state,
        '',
        'http://some.url.de/?test=tets&foo=bar'
      );
    });
    it('call addSearchParams with wrong argument', () => {
      console.log = sinon.spy();
      global.location = 'http://some.url.de';
      LuigiRouting.addSearchParams('bar', true);
      sinon.assert.calledWith(console.log, 'Params argument must be an object');
    });
    it('delete search params from url', () => {
      window.state = {};
      global.location = 'http://some.url.de?luigi=rocks&mario=red';
      LuigiRouting.addSearchParams({ mario: undefined }, true);
      sinon.assert.calledWithExactly(window.history.pushState, window.state, '', 'http://some.url.de/?luigi=rocks');
    });
  });
  describe('SearchParams hash routing', () => {
    beforeEach(() => {
      sinon
        .stub(LuigiConfig, 'getConfigValue')
        .withArgs('routing.useHashRouting')
        .returns(true);
    });
    afterEach(() => {
      sinon.restore();
    });
    it('get searchparams hash routing', () => {
      global.location = 'http://some.url.de/#/?test=tets&luigi=rocks';
      assert.deepEqual(LuigiRouting.getSearchParams(), { test: 'tets', luigi: 'rocks' });
    });
    it('get searchparams', () => {
      global.location = 'http://some.url.de/#/something?test=tets&luigi=rocks';
      assert.deepEqual(LuigiRouting.getSearchParams(), { test: 'tets', luigi: 'rocks' });
    });
    it('get searchparams hash routing', () => {
      global.location = 'http://some.url.de/#/';
      assert.deepEqual(LuigiRouting.getSearchParams(), {});
    });
    it('add searchparams hash routing', () => {
      window.state = {};
      global.location = 'http://some.url.de/#/';
      LuigiRouting.addSearchParams({ foo: 'bar' }, true);
      sinon.assert.calledWithExactly(window.history.pushState, window.state, '', 'http://some.url.de/#/?foo=bar');
    });
    it('add search params to hash routing', () => {
      window.state = {};
      global.location = 'http://some.url.de/#/?test=tets';
      LuigiRouting.addSearchParams({ foo: 'bar' }, true);
      sinon.assert.calledWithExactly(
        window.history.pushState,
        window.state,
        '',
        'http://some.url.de/#/?test=tets&foo=bar'
      );
    });
    it('add search params to hash routing', () => {
      window.state = {};
      global.location = 'http://some.url.de/#/?~luigi=rocks';
      LuigiRouting.addSearchParams({ foo: 'bar' }, true);
      sinon.assert.calledWithExactly(
        window.history.pushState,
        window.state,
        '',
        'http://some.url.de/#/?~luigi=rocks&foo=bar'
      );
    });
    it('call addSearchParams with wrong argument hash routing', () => {
      console.log = sinon.spy();
      global.location = 'http://some.url.de/#/';
      LuigiRouting.addSearchParams('bar', true);
      sinon.assert.calledWith(console.log, 'Params argument must be an object');
    });
    it('delete search params from url', () => {
      window.state = {};
      global.location = 'http://some.url.de/#/?luigi=rocks&mario=red';
      LuigiRouting.addSearchParams({ mario: undefined }, true);
      sinon.assert.calledWithExactly(window.history.pushState, window.state, '', 'http://some.url.de/#/?luigi=rocks');
    });
  });

  describe('modifySearchParam', () => {
    beforeEach(() => {
      sinon
        .stub(LuigiConfig, 'getConfigValue')
        .withArgs('routing.useHashRouting')
        .returns(false);
    });
    afterEach(() => {
      sinon.restore();
    });
    it('_modifySearchParam', () => {
      const searchParams = new URLSearchParams('mario=rocks');
      LuigiRouting._modifySearchParam({ test: 'tets', luigi: 'rocks', mario: undefined }, searchParams);
      assert.equal(searchParams.toString(), 'test=tets&luigi=rocks');
    });
    it('_modifySearchParam with paramPrefix', () => {
      const searchParams = new URLSearchParams('~mario=rocks');
      LuigiRouting._modifySearchParam({ test: 'tets', luigi: 'rocks' }, searchParams, '~');
      assert.equal(searchParams.toString(), '%7Emario=rocks&%7Etest=tets&%7Eluigi=rocks');
    });
  });

  describe('addNodeParams', () => {
    it('add node Params', () => {
      window.state = {};
      global.location = 'http://some.url.de';
      LuigiRouting.addNodeParams({ foo: 'bar' }, true);
      sinon.assert.calledWithExactly(window.history.pushState, window.state, '', 'http://some.url.de/?%7Efoo=bar');
    });
    it('add node Params without keeping browser history', () => {
      window.state = {};
      global.location = 'http://some.url.de';
      LuigiRouting.addNodeParams({ foo: 'bar' }, false);
      sinon.assert.calledWithExactly(window.history.replaceState, window.state, '', 'http://some.url.de/?%7Efoo=bar');
    });
    it('add more node param to existing node params', () => {
      window.state = {};
      global.location = 'http://some.url.de?~test=tets';
      LuigiRouting.addNodeParams({ foo: 'bar' }, true);
      sinon.assert.calledWithExactly(
        window.history.pushState,
        window.state,
        '',
        'http://some.url.de/?%7Etest=tets&%7Efoo=bar'
      );
    });
    it('call addNodeParams with wrong argument', () => {
      console.log = sinon.spy();
      global.location = 'http://some.url.de';
      LuigiRouting.addNodeParams('bar', true);
      sinon.assert.calledWith(console.log, 'Params argument must be an object');
    });
  });
});
