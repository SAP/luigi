const chai = require('chai');
const assert = chai.assert;
const sinon = require('sinon');

import { PromiseResolverCache } from '../../src/services';

describe('PromiseResolverCache', () => {
  let clock;
  const getMockPromise = input => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(input);
      }, 1000);
    });
  };
  beforeEach(() => {
    clock = sinon.useFakeTimers();
  });

  afterEach(() => {
    clock.restore();
    sinon.restore();
  });

  it('resolve single promise', async () => {
    const mockResult = 'result';
    const result = await PromiseResolverCache.execAsPromise(() =>
      Promise.resolve(mockResult)
    );
    assert.equal(result, mockResult);
  });

  it('resolve multiple equal promises', () => {
    const promiseFn = () => getMockPromise('id');

    let one = PromiseResolverCache.execAsPromise(promiseFn);
    assert.equal(PromiseResolverCache.cache.size, 1);
    clock.tick(100);

    let two = PromiseResolverCache.execAsPromise(promiseFn);
    assert.equal(PromiseResolverCache.cache.size, 1);
    clock.tick(100);

    // cannot be async/await here, since we need to tick() it
    Promise.all([one, two]).then(results => {
      results.forEach(result => {
        assert.equal(result, 'id');
        assert.equal(PromiseResolverCache.cache.size, 0, 'final cache size');
      });
    });
    clock.tick(1000);
  });
});
