const chai = require('chai');
const assert = chai.assert;
import { containsAllSegments } from '../../../src/utilities/helpers/helpers';

describe('Helpers', () => {
  describe('containsAllSegments', () => {
    it('should return true when proper data provided', async () => {
      const sourceUrl = 'mas/ko/pa/tol/';
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

    it('should return false when wrong data provided', async () => {
      const differentSourceUrl = 'mas/ko/pa/tol';
      const similarSourceUrl = 'luigi/is/os/awesome';
      const targetPathSegments = [
        {
          //doesn't matter, it's omitted anyway
        },
        {
          pathSegment: 'luigi'
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
      assert.equal(
        containsAllSegments(differentSourceUrl, targetPathSegments),
        false
      );
      assert.equal(
        containsAllSegments(similarSourceUrl, targetPathSegments),
        false
      );
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

    it('should ignore GET parameters', async () => {
      const sourceUrl = 'one/two/three?masko=patol&four=five';

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
      assert.equal(containsAllSegments(sourceUrl, targetPathSegments), true);
    });
  });
});
