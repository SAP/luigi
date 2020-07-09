const assert = require('chai').assert;
const sinon = require('sinon');

import { ContextSwitcherHelpers as CSHelpers } from '../src/navigation/services/context-switcher';
import { GenericHelpers } from '../src/utilities/helpers';
import { LuigiConfig } from '../src/core-api';
import { Routing } from '../src/services/routing';

describe('Context-switcher', function() {
  let myResolverFn;
  beforeEach(() => {
    CSHelpers._fallbackLabels.clear();
    myResolverFn = sinon.spy(id => {
      return '##' + id + '##';
    });
  });
  afterEach(() => {
    sinon.reset();
    sinon.resetHistory();
    sinon.restore();
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

  describe('getPreparedParentNodePath', () => {
    let mockConfig;
    beforeEach(() => {
      mockConfig = getMockConfig();
    });

    it('throws undefined parentNodePath', () => {
      console.error = sinon.spy();
      CSHelpers.getPreparedParentNodePath({});
      sinon.assert.calledOnce(console.error);
    });

    it('throws falsy relative parentNodePath', () => {
      console.error = sinon.spy();
      CSHelpers.getPreparedParentNodePath({ parentNodePath: 'relative/path' });
      sinon.assert.calledOnce(console.error);
    });

    it('adds slash to absolute parentNodePath', () => {
      const result = CSHelpers.getPreparedParentNodePath({
        parentNodePath: '/environment'
      });
      assert.equal(result, '/environment/');
    });

    it('does not add slash to absolute parentNodePath with slash', () => {
      const result = CSHelpers.getPreparedParentNodePath({
        parentNodePath: '/environment/'
      });
      assert.equal(result, '/environment/');
    });

    it('no parentNodePath', () => {
      const result = CSHelpers.getPreparedParentNodePath({
        parentNodePath: ''
      });
      assert.equal(result, '');
    });
  });

  describe('getFallbackLabel', () => {
    beforeEach(() => {
      sinon.stub(LuigiConfig, 'getConfigBooleanValue').returns(false);
    });

    it('works without fallback resolver', async () => {
      const result = await CSHelpers.getFallbackLabel(undefined, 'some_id');
      assert.equal(result, 'some_id');
    });

    it('works with fallback resolver', async () => {
      const result = await CSHelpers.getFallbackLabel(myResolverFn, 'some_id');
      assert.equal(result, '##some_id##');

      sinon.assert.calledWithExactly(
        'LuigiConfig.getConfigBooleanValue',
        'navigation.contextSwitcher.useFallbackLabelCache'
      );
    });

    it('works with fallback resolver cached', async () => {
      LuigiConfig.getConfigBooleanValue.returns(true);

      const result = await CSHelpers.getFallbackLabel(myResolverFn, 'some_id');
      assert.equal(result, '##some_id##');

      const result2 = await CSHelpers.getFallbackLabel(myResolverFn, 'some_id');
      assert.equal(result2, '##some_id##');

      sinon.assert.calledOnce(myResolverFn);
    });

    it('works with fallback resolver cache disabled', async () => {
      const result = await CSHelpers.getFallbackLabel(myResolverFn, 'some_id');
      assert.equal(result, '##some_id##');

      const result2 = await CSHelpers.getFallbackLabel(myResolverFn, 'some_id');
      assert.equal(result2, '##some_id##');

      sinon.assert.calledTwice(myResolverFn);
    });
  });

  describe('fetchOptions', () => {
    let mockConfig;
    beforeEach(() => {
      mockConfig = getMockConfig();
      sinon.stub(LuigiConfig, 'getConfigValueAsync');
      sinon.stub(CSHelpers, 'generateSwitcherNav');
      sinon.stub(LuigiConfig, 'getConfigValue').returns(mockConfig);
    });

    it('lazyLoad off, existing options get returned', async () => {
      mockConfig.lazyloadOptions = false;
      const opts = ['a', 'b', 'c'];

      const result = await CSHelpers.fetchOptions(opts);
      assert.equal(result, opts);
      assert.isFalse(
        LuigiConfig.getConfigValueAsync.called,
        'getConfigValueAsync not called'
      );
    });

    it('lazyLoad off, non-existing options fetches options', async () => {
      mockConfig.lazyloadOptions = false;
      const opts = ['a', 'b', 'c'];
      const expectedResult = 'works';
      LuigiConfig.getConfigValueAsync.returns(opts);
      CSHelpers.generateSwitcherNav.returns(expectedResult);

      const result = await CSHelpers.fetchOptions();

      sinon.assert.calledWithExactly(
        LuigiConfig.getConfigValueAsync,
        'navigation.contextSwitcher.options'
      );
      sinon.assert.calledWith(CSHelpers.generateSwitcherNav, mockConfig, opts);
      assert.equal(result, expectedResult, 'return value');
    });

    it('lazyLoad on, always fetches options', async () => {
      mockConfig.lazyloadOptions = true;
      const opts = ['a', 'b', 'c'];
      const expectedResult = 'works';
      LuigiConfig.getConfigValueAsync.returns(opts);
      CSHelpers.generateSwitcherNav.returns(expectedResult);

      const result = await CSHelpers.fetchOptions();
      await CSHelpers.fetchOptions();
      await CSHelpers.fetchOptions();

      sinon.assert.calledWithExactly(
        LuigiConfig.getConfigValueAsync,
        'navigation.contextSwitcher.options'
      );
      sinon.assert.calledWith(CSHelpers.generateSwitcherNav, mockConfig, opts);
      assert.equal(result, expectedResult, 'return value');
      sinon.assert.callCount(
        CSHelpers.generateSwitcherNav,
        3,
        'called N times'
      );
    });
  });

  describe('generateSwitcherNav', () => {
    it('composes proper values with ParentNodePath', async () => {
      const result = await CSHelpers.generateSwitcherNav(
        { parentNodePath: '/environment' },
        [{ label: 'Env 1', pathValue: 'env1' }]
      );
      assert.equal(
        JSON.stringify(result),
        JSON.stringify([
          {
            label: 'Env 1',
            link: '/environment/env1',
            id: 'env1'
          }
        ])
      );
    });

    it('composes proper values without ParentNodePath', async () => {
      const result = await CSHelpers.generateSwitcherNav({}, [
        { label: 'Env 1', pathValue: 'env1' }
      ]);
      assert.equal(
        JSON.stringify(result),
        JSON.stringify([
          {
            label: 'Env 1',
            link: '/env1',
            id: 'env1'
          }
        ])
      );
    });
  });

  describe('getOptionById', () => {
    const env1 = { label: 'Env 1', id: '1' };
    const env2 = { label: 'Env 2', id: '2' };

    it('returns undefined if node is not inside options', () => {
      const result = CSHelpers.getOptionById([env1, env2], '3');
      assert.isUndefined(result, 'getOptionById call');
    });

    it('returns matching node', () => {
      const result = CSHelpers.getOptionById([env1, env2], '2');
      assert.deepEqual(result, { label: 'Env 2', id: '2' });
    });
  });

  describe('getLabelFromOptions', () => {
    const env1 = { label: 'Env 1', id: 'env1' };
    const env2 = { label: 'Env 2', id: 'env2' };

    it('returns undefined if node is not inside options', () => {
      const result = CSHelpers.getLabelFromOptions([env1, env2], 'env3');
      assert.equal(result, undefined);
    });

    it('returns matching node label', () => {
      const result = CSHelpers.getLabelFromOptions([env1, env2], 'env2');
      assert.equal(result, 'Env 2');
    });
  });

  describe('isContextSwitcherDetailsView', () => {
    let currentPath;
    let parentNodePath;

    beforeEach(() => {
      parentNodePath = '/home/projects';
      currentPath = '/home/projects/pr1';
      sinon.stub(GenericHelpers, 'addTrailingSlash').callsFake(s => s + `/`);
    });

    it('returns false if parent node path is falsy', () => {
      parentNodePath = undefined;
      const actual = CSHelpers.isContextSwitcherDetailsView(
        currentPath,
        parentNodePath
      );
      assert.isFalse(actual);
    });

    it('returns false if parent node path is not included in current path', () => {
      parentNodePath = '/home/nomatch';
      const actual = CSHelpers.isContextSwitcherDetailsView(
        currentPath,
        parentNodePath
      );
      assert.isFalse(actual);
    });

    it('returns false if last path segment from parent node is not a full match in currentPath', () => {
      currentPath = '/home/projectsandmore/pr1';
      const actual = CSHelpers.isContextSwitcherDetailsView(
        currentPath,
        parentNodePath
      );
      assert.isFalse(actual);
    });

    it('returns false if current path has no content after parent node path', () => {
      currentPath = '/home/projects';
      const actual = CSHelpers.isContextSwitcherDetailsView(
        currentPath,
        parentNodePath
      );
      assert.isFalse(actual);
    });

    it('returns true if current path has content after parent node path', () => {
      const actual = CSHelpers.isContextSwitcherDetailsView(
        currentPath,
        parentNodePath
      );
      assert.isTrue(actual);
    });
  });

  describe('getSelectedId', () => {
    let currentPath;
    let parentNodePath;
    const env1 = { label: 'Env 1', id: '1' };
    const env2 = { label: 'Env 2', id: '2' };

    beforeEach(() => {
      parentNodePath = '/home/projects';
      currentPath = '/home/projects/pr1';
    });

    [
      {
        it: 'returns undefined if parent node path is not defined',
        parentNodePath: undefined,
        assert: undefined
      },
      {
        it:
          'returns undefined if parent node path is not included in current path',
        parentNodePath: '/home/nomatch',
        assert: undefined
      }
    ].forEach(t => {
      it(t.it, () => {
        const selectedId = CSHelpers.getSelectedId(
          currentPath,
          [env1, env2],
          t.parentNodePath
        );
        assert.equal(selectedId, t.assert);
      });
    });

    [
      {
        it:
          'returns undefined if last path segment from parent node is not a full match in currentPath',
        currentPath: '/home/projectsandmore/pr1',
        assert: undefined
      },
      {
        it:
          'returns undefined if current path has no content after parent node path',
        currentPath: '/home/projects',
        assert: undefined
      }
    ].forEach(t => {
      it(t.it, () => {
        const selectedId = CSHelpers.getSelectedId(
          t.currentPath,
          [env1, env2],
          parentNodePath
        );
        assert.equal(selectedId, t.assert);
      });
    });

    it('returns id if current path has id after parent node path', () => {
      const selectedId = CSHelpers.getSelectedId(
        currentPath,
        [env1, env2],
        parentNodePath
      );
      assert.equal(selectedId, 'pr1');
    });

    it('returns id even if current path has params after id', () => {
      currentPath = '/home/projects/pr1?foo=bar&test=false';
      const selectedId = CSHelpers.getSelectedId(
        currentPath,
        [env1, env2],
        parentNodePath
      );
      assert.equal(selectedId, 'pr1');
    });
  });

  describe('getSelectedOption', () => {
    let currentPath;
    let parentNodePath;
    const env1 = { label: 'Env 1', id: 'pr1' };
    const env2 = { label: 'Env 2', id: 'pr2' };

    beforeEach(() => {
      parentNodePath = '/home/projects';
      currentPath = '/home/projects/pr1';
    });

    [
      {
        it: 'returns undefined if parent node path is not defined',
        parentNodePath: undefined,
        assert: undefined
      },
      {
        it:
          'returns undefined if parent node path is not included in current path',
        parentNodePath: '/home/nomatch',
        assert: undefined
      }
    ].forEach(t => {
      it(t.it, async () => {
        const selectedOption = await CSHelpers.getSelectedOption(
          currentPath,
          [env1, env2],
          t.parentNodePath
        );
        assert.equal(selectedOption, t.assert);
      });
    });

    [
      {
        it:
          'returns undefined if last path segment from parent node is not a full match in currentPath',
        currentPath: '/home/projectsandmore/pr1',
        assert: undefined
      },
      {
        it:
          'returns undefined if current path has no content after parent node path',
        currentPath: '/home/projects',
        assert: undefined
      }
    ].forEach(t => {
      it(t.it, async () => {
        const selectedOption = await CSHelpers.getSelectedOption(
          t.currentPath,
          [env1, env2],
          parentNodePath
        );
        assert.equal(selectedOption, t.assert);
      });
    });

    it('returns option if current path has id after parent node path', async () => {
      const selectedOption = await CSHelpers.getSelectedOption(
        currentPath,
        [env1, env2],
        parentNodePath
      );
      assert.deepEqual(selectedOption, { label: 'Env 1', id: 'pr1' });
    });

    it('returns option even if current path has params after id', async () => {
      currentPath = '/home/projects/pr1?foo=bar&test=false';
      const selectedOption = await CSHelpers.getSelectedOption(
        currentPath,
        [env1, env2],
        parentNodePath
      );
      assert.deepEqual(selectedOption, { label: 'Env 1', id: 'pr1' });
    });
  });

  describe('getSelectedLabel', () => {
    const parentNodePath = '/environment';

    it('returns undefined when path only partially contains parentNodePath', async () => {
      const result = await CSHelpers.getSelectedLabel(
        '/environmentWhatever',
        [],
        parentNodePath,
        myResolverFn,
        false
      );
      assert.equal(result, undefined);
    });

    it('returns undefined if outside current path', async () => {
      const result = await CSHelpers.getSelectedLabel(
        '/something',
        [],
        parentNodePath,
        myResolverFn,
        false
      );
      assert.equal(result, undefined);
    });

    it('returns env id', async () => {
      const env1 = { label: 'Env 1', id: 'env1' };
      const env2 = { label: 'Env 2', id: 'env2' };
      const result = await CSHelpers.getSelectedLabel(
        '/environment/env2',
        [env1, env2],
        parentNodePath,
        myResolverFn,
        false
      );
      assert.equal(result, env2.label);
    });

    it('returns fallback label if inside parentNodePath', async () => {
      const env1 = { label: 'Env 1', id: 'env1' };
      const env2 = { label: 'Env 2', id: 'env2' };
      const result = await CSHelpers.getSelectedLabel(
        '/environment/env3',
        [env1, env2],
        parentNodePath,
        myResolverFn,
        false
      );
      assert.equal(result, '##env3##');
    });

    it('returns node label without path params', async () => {
      const result = await CSHelpers.getSelectedLabel(
        '/environment/env1?mask=opatol',
        null,
        parentNodePath,
        myResolverFn,
        false
      );
      assert.equal(result, '##env1##');
    });
  });

  describe('getNodePathFromCurrentPath', () => {
    it('returns option path if current path does not fit', () => {
      sinon.stub(Routing, 'getCurrentPath').callsFake(s => {
        return '/projects/pr1';
      });
      const result = CSHelpers.getNodePathFromCurrentPath(
        {
          link: '/environments/env3'
        },
        {
          link: '/environments/env1'
        }
      );
      assert.equal(result, '/environments/env3');
    });

    it('returns correctly adapted path', () => {
      sinon.stub(Routing, 'getCurrentPath').callsFake(s => {
        return '/environments/env1/details/and/more';
      });
      const result = CSHelpers.getNodePathFromCurrentPath(
        {
          link: '/environments/env3/details'
        },
        {
          link: '/environments/env1/details'
        }
      );
      assert.equal(result, '/environments/env3/details/and/more');
    });
  });
});
