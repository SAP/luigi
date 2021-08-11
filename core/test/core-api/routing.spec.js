const chai = require('chai');
const assert = chai.assert;
const sinon = require('sinon');

import { afterEach } from 'mocha';
import { LuigiRouting, LuigiConfig } from '../../src/core-api';

describe('Luigi routing', function() {
    let globalLocationRef = global.location;

    beforeEach(() => {
        window.history.pushState = sinon.spy();
    });
    afterEach(() => {
        global.location = globalLocationRef;
      })
    describe('SearchParams path routing', ()=>{
        it('get searchparams', ()=>{
            global.location= 'http://some.url.de?test=tets&luigi=rocks';
            assert.deepEqual(LuigiRouting.getSearchParams(), {test:'tets', luigi:'rocks'});
        });
        it('get searchparams', ()=>{
            global.location= 'http://some.url.de/something?test=tets&luigi=rocks';
            assert.deepEqual(LuigiRouting.getSearchParams(), {test:'tets', luigi:'rocks'});
        });
        it('get searchparams', ()=>{
            global.location= 'http://some.url.de';
            assert.deepEqual(LuigiRouting.getSearchParams(), {});
        });
        it('set searchparams', ()=>{
            window.state = {};
            global.location= 'http://some.url.de';
            LuigiRouting.setSearchParams({foo:'bar'})
            sinon.assert.calledWithExactly(window.history.pushState, window.state,'','http://some.url.de/?foo=bar');
        });
        it('overwrite search params by set searchparams', ()=>{
            window.state = {};
            global.location= 'http://some.url.de?test=tets';
            LuigiRouting.setSearchParams({foo:'bar'})
            sinon.assert.calledWithExactly(window.history.pushState, window.state,'','http://some.url.de/?foo=bar');
        });
        it('call setSearchParams with wrong argument', ()=>{
            console.log = sinon.spy();
            global.location= 'http://some.url.de';
            LuigiRouting.setSearchParams('bar')
            sinon.assert.calledWith(console.log, 'Params argument must be an object');
        });
    });
    describe('SearchParams hash routing', ()=>{
        beforeEach(() => {
            sinon.stub(LuigiConfig, 'getConfigValue').withArgs('routing.useHashRouting').returns(true);
        });
        afterEach(()=>{
            sinon.restore();
        })
        it('get searchparams hash routing', ()=>{
            global.location= 'http://some.url.de/#/?test=tets&luigi=rocks';
            assert.deepEqual(LuigiRouting.getSearchParams(), {test:'tets', luigi:'rocks'});
        });
        it('get searchparams', ()=>{
            global.location= 'http://some.url.de/#/something?test=tets&luigi=rocks';
            assert.deepEqual(LuigiRouting.getSearchParams(), {test:'tets', luigi:'rocks'});
        });
        it('get searchparams hash routing', ()=>{
            global.location= 'http://some.url.de/#/';
            assert.deepEqual(LuigiRouting.getSearchParams(), {});
        });
        it('set searchparams hash routing', ()=>{
            window.state = {};
            global.location= 'http://some.url.de/#/';
            LuigiRouting.setSearchParams({foo:'bar'})
            sinon.assert.calledWithExactly(window.history.pushState, window.state,'','http://some.url.de/#/?foo=bar');
        });
        it('overwrite search params by set searchparams hash routing', ()=>{
            window.state = {};
            global.location= 'http://some.url.de/#/?test=tets';
            LuigiRouting.setSearchParams({foo:'bar'})
            sinon.assert.calledWithExactly(window.history.pushState, window.state,'','http://some.url.de/#/?foo=bar');
        });
        it('call setSearchParams with wrong argument hash routing', ()=>{
            console.log = sinon.spy();
            global.location= 'http://some.url.de/#/';
            LuigiRouting.setSearchParams('bar')
            sinon.assert.calledWith(console.log, 'Params argument must be an object');
        });
    });
});