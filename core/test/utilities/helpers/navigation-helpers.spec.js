//TODO: make some tests here
const chai = require('chai');
const assert = chai.assert;
const sinon = require('sinon');
import { NavigationHelpers } from '../../../src/utilities/helpers';

describe('Navigation-helpers', () => {
  describe('isOpenUIiconName', () => {
    it('should return true for valid icon names', async () => {
      assert.equal(NavigationHelpers.isOpenUIiconName('settings'), true);
      assert.equal(NavigationHelpers.isOpenUIiconName('add-activity-2'), true);
      assert.equal(NavigationHelpers.isOpenUIiconName('back-to-top'), true);
    });

    it('should return false for invalid icon names', async () => {
      assert.equal(
        NavigationHelpers.isOpenUIiconName('./relative.path'),
        false
      );
      assert.equal(
        NavigationHelpers.isOpenUIiconName(
          'http://niceicons.com/that-one-icon.png'
        ),
        false
      );
      assert.equal(
        NavigationHelpers.isOpenUIiconName('https://google.com'),
        false
      );
    });
  });

  it('getNodePath', () => {
    const node = {
      parent: {
        pathSegment: 'parent'
      },
      pathSegment: 'pathSegment'
    };
    assert.equal(
      NavigationHelpers.getNodePath(node),
      'parent/pathSegment',
      'path should match'
    );
  });
});
