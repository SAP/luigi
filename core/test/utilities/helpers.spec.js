const chai = require('chai');

const assert = chai.assert;

import { containsAllSegments } from '../../src/utilities/helpers';

describe('Helpers()', () => {
  describe('#containsAllSegments()', () => {
    it('should return true when proper data provided', async () => {
      const sourceUrl = 'mas/ko/pa/tol';
      const targetPathSegments = [
        {
          //doesn't matter, it's omitted anyway
        },
        {
          pathSegment: 'mas'
        },
        {
          pathSegment: 'ko'
        },
        {
          pathSegment: 'pa'
        },
        {
          pathSegment: 'tol'
        }
      ];
      assert.equal(containsAllSegments(sourceUrl, targetPathSegments), true);
    });

    it('should return false when totally wrong data provided', async () => {
      const sourceUrl = 'mas/ko/pa/tol';
      const targetPathSegments = [
        {
          //doesn't matter, it's omitted anyway
        },
        {
          pathSegment: 'Luigi'
        },
        {
          pathSegment: 'is'
        },
        {
          pathSegment: 'so'
        },
        {
          pathSegment: 'awesome'
        }
      ];
      assert.equal(containsAllSegments(sourceUrl, targetPathSegments), false);
    });

    it("should return false when pathSegments numbers don't match", async () => {
      const tooShortSourceUrl = 'one/two';
      const tooLongSourceUrl = 'three/four/five/six';
      const targetPathSegments = [
        {
          //doesn't matter, it's omitted anyway
        },
        {
          pathSegment: 'one'
        },
        {
          pathSegment: 'two'
        },
        {
          pathSegment: 'three'
        }
      ];
      assert.equal(
        containsAllSegments(tooShortSourceUrl, targetPathSegments),
        false
      );
      assert.equal(
        containsAllSegments(tooLongSourceUrl, targetPathSegments),
        false
      );
    });
  });
});
