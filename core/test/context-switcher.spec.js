const CSHelpers = require('../src/navigation/services/context-switcher')
  .ContextSwitcherHelpers;
const assert = require('chai').assert;
const sinon = require('sinon');

describe('ContextSwitcher', function() {
  afterEach(() => {
    sinon.restore();
    sinon.reset();
  });

  const getMockConfig = () => ({
    defaultLabel: 'Select Environment ...',
    parentNodePath: '/environments/',
    lazyloadOptions: true,
    actions: [
      {
        label: '+ New Environment',
        link: '/create-environment',
        position: 'top'
      }
    ],
    options: []
  });

  const myResolverFn = id => {
    return '##' + id + '##';
  };

  describe('prepareParentNodePath()', () => {
    let mockConfig;
    beforeEach(() => {
      mockConfig = getMockConfig();
    });

    it('undefined parentNodePath', () => {
      console.error = sinon.spy();
      CSHelpers.prepareParentNodePath({});
      sinon.assert.calledOnce(console.error);
    });

    it('falsy relative parentNodePath', () => {
      console.error = sinon.spy();
      CSHelpers.prepareParentNodePath({ parentNodePath: 'relative/path' });
      sinon.assert.calledOnce(console.error);
    });

    it('absolute parentNodePath adds slash', () => {
      const result = CSHelpers.prepareParentNodePath({
        parentNodePath: '/environment'
      });
      assert.equal(result, '/environment/');
    });

    it('absolute parentNodePath with slash does not add slash', () => {
      const result = CSHelpers.prepareParentNodePath({
        parentNodePath: '/environment/'
      });
      assert.equal(result, '/environment/');
    });

    it('no parentNodePath', () => {
      const result = CSHelpers.prepareParentNodePath({
        parentNodePath: '/environment'
      });
      assert.equal(result, '/environment/');
    });
  });

  describe('getFallbackNodeName()', () => {
    it('without fallback resolver', async () => {
      const result = await CSHelpers.getFallbackNodeName(undefined, 'some_id');
      assert.equal(result, 'some_id');
    });

    it('with fallback resolver', async () => {
      const result = await CSHelpers.getFallbackNodeName(
        myResolverFn,
        'some_id'
      );
      assert.equal(result, '##some_id##');
    });
  });

  describe('generateSwitcherNav()', () => {
    it('composes proper values', async () => {
      const result = await CSHelpers.generateSwitcherNav(
        { parentNodePath: '/environment' },
        [{ label: 'Env 1', pathValue: 'env1' }]
      );
      assert.equal(
        JSON.stringify(result),
        JSON.stringify([
          {
            label: 'Env 1',
            path: '/environment/env1',
            id: 'env1'
          }
        ])
      );
    });

    it('composes proper values', async () => {
      const result = await CSHelpers.generateSwitcherNav({}, [
        { label: 'Env 1', pathValue: 'env1' }
      ]);
      assert.equal(
        JSON.stringify(result),
        JSON.stringify([
          {
            label: 'Env 1',
            path: '/env1',
            id: 'env1'
          }
        ])
      );
    });
  });

  describe('getMatchingNodeName()', () => {
    const env1 = { label: 'Env 1', pathValue: 'env1' };
    const env2 = { label: 'Env 2', pathValue: 'env2' };

    it('returns undefined if node is not inside options', () => {
      const result = CSHelpers.getMatchingNodeName([env1, env2], 'env3');
      assert.equal(result, undefined);
    });

    it('returns matching node label', () => {
      const result = CSHelpers.getMatchingNodeName([env1, env2], 'env2');
      assert.equal(result, 'Env 2');
    });
  });

  describe('getSelectedLabel()', () => {
    const parentNodePath = '/environment';

    it('returns undefined when path only partially contains parentNodePath', async () => {
      const result = await CSHelpers.getSelectedLabel(
        '/environmentWhatever',
        [],
        parentNodePath,
        myResolverFn
      );
      assert.equal(result, undefined);
    });

    it('returns undefined if outside current path', async () => {
      const result = await CSHelpers.getSelectedLabel(
        '/something',
        [],
        parentNodePath,
        myResolverFn
      );
      assert.equal(result, undefined);
    });

    it('returns env id', async () => {
      const env1 = { label: 'Env 1', pathValue: 'env1' };
      const env2 = { label: 'Env 2', pathValue: 'env2' };
      const result = await CSHelpers.getSelectedLabel(
        '/environment/env2',
        [env1, env2],
        parentNodePath,
        myResolverFn
      );
      assert.equal(result, env2.label);
    });

    it('returns fallback label if inside parentNodePath', async () => {
      const env1 = { label: 'Env 1', pathValue: 'env1' };
      const env2 = { label: 'Env 2', pathValue: 'env2' };
      const result = await CSHelpers.getSelectedLabel(
        '/environment/env3',
        [env1, env2],
        parentNodePath,
        myResolverFn
      );
      assert.equal(result, '##env3##');
    });
  });
});
