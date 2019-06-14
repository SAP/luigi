const chai = require('chai');
const expect = chai.expect;
const assert = chai.assert;
const sinon = require('sinon');
import { Navigation } from '../../src/navigation/services/navigation';
import { LuigiConfig } from '../../src/core-api';

const sampleNavPromise = new Promise(function(resolve) {
  const lazyLoadedChildrenNodesProviderFn = () => {
    return new Promise(function(resolve) {
      resolve([
        {
          pathSegment: 'b1',
          context: {
            lazy: true
          }
        }
      ]);
    });
  };

  resolve([
    {
      pathSegment: 'aaa',
      label: 'AAA',
      viewUrl: '/aaa.html',
      children: [
        {
          pathSegment: 'a1',
          context: {
            varA1: 'maskopatol'
          }
        },
        {
          pathSegment: 'a2'
        }
      ],
      context: {
        varA: 'tets'
      }
    },
    {
      pathSegment: 'bbb',
      label: 'BBB',
      viewUrl: '/bbb.html',
      children: lazyLoadedChildrenNodesProviderFn,
      context: {
        lazy: false
      }
    }
  ]);
});

describe('Navigation', function() {
  before(() => {
    function mockStorage() {
      return {
        getItem: function(key) {
          return JSON.stringify({
            accessTokenExpirationDate: Number(new Date()) + 1
          });
        }
      };
    }

    global['localStorage'] = mockStorage();
  });
  afterEach(() => {
    // reset
    LuigiConfig.config = {};
  });
  describe('getNavigationPath', function() {
    it('should not fail for undefined arguments', () => {
      Navigation.getNavigationPath(undefined, undefined);
    });

    it('should resolve top level node', async () => {
      const navPath = await Navigation.getNavigationPath(sampleNavPromise);
      assert.equal(navPath.navigationPath.length, 1, 'Only one root expected');
      const rootNode = navPath.navigationPath[0];
      assert.equal(
        rootNode.children.length,
        2,
        'Root node expected to have 2 children nodes'
      );
      assert.equal(rootNode.children[0].pathSegment, 'aaa');
      const nodeWithLazyLoadedChildren = rootNode.children[1];
      assert.equal(nodeWithLazyLoadedChildren.pathSegment, 'bbb');
    });

    it('should resolve first level node', async () => {
      const navPath = await Navigation.getNavigationPath(
        sampleNavPromise,
        'aaa'
      );
      assert.equal(
        navPath.navigationPath.length,
        2,
        '2 nodes active : root node + "aaa" node'
      );
      assert.equal(navPath.navigationPath[1].pathSegment, 'aaa');
      assert.propertyVal(
        navPath.context,
        'varA',
        'tets',
        'Nav path expected to have a variable from activated node in the context'
      );
    });

    it('should resolve second level node', async () => {
      const navPath = await Navigation.getNavigationPath(
        sampleNavPromise,
        'aaa/a1'
      );
      assert.equal(
        navPath.navigationPath.length,
        3,
        '3 nodes active : root node, "aaa" node, "a1" node'
      );
      assert.equal(navPath.navigationPath[1].pathSegment, 'aaa');
      assert.equal(navPath.navigationPath[2].pathSegment, 'a1');
      assert.propertyVal(
        navPath.context,
        'varA',
        'tets',
        'Nav path expected to have a variable from activated node "aaa" in the context'
      );
      assert.propertyVal(
        navPath.context,
        'varA1',
        'maskopatol',
        'Nav path expected to have a variable from activated node "a1" in the context'
      );
    });

    it('should load lazy-loaded children nodes only on activation', async () => {
      const navPath = await Navigation.getNavigationPath(
        sampleNavPromise,
        'bbb'
      );
      assert.equal(
        navPath.navigationPath.length,
        2,
        '2 nodes active : root node + "bbb" node'
      );
      const activatedNodeWithLazyLoadedChildren = navPath.navigationPath[1];
      assert.equal(activatedNodeWithLazyLoadedChildren.pathSegment, 'bbb');
      expect(activatedNodeWithLazyLoadedChildren.children.length).to.be.above(
        0
      );
      assert.propertyVal(navPath.context, 'lazy', false);
    });

    it('child node should overwrite existing context variable from a parent', async () => {
      const navPath = await Navigation.getNavigationPath(
        sampleNavPromise,
        'bbb/b1'
      );
      assert.propertyVal(navPath.context, 'lazy', true);
    });
  });

  describe('getChildren', () => {
    const nodeWithChildren = {
      children: [{ name: 'children1' }, { name: 'children2' }]
    };
    const nodeWithChildrenProvider = {
      children: () => {
        return [{ name: 'children' }];
      },
      context: [{ name: 'context' }]
    };
    const nodeWithChildrenProviderError = {
      children: () => {
        throw new Error('Error!');
      }
    };
    it('should not fail if arguments are undefined', async () => {
      const children = await Navigation.getChildren(undefined, undefined);
      expect(children.length).to.equal(0);
    });
    it("should return empty array if it doesn't have children", async () => {
      const aNode = {};
      const children = await Navigation.getChildren(aNode, undefined);
      expect(children.length).to.equal(0);
    });
    it('should return nodes children and bind them if children are provided', async () => {
      const children = await Navigation.getChildren(
        nodeWithChildren,
        undefined
      );
      expect(children).to.equal(nodeWithChildren.children);
    });
    it('should return nodes children and bind them if children provider is provided', async () => {
      const children = await Navigation.getChildren(
        nodeWithChildrenProvider,
        undefined
      );
      expect(children).to.equal(nodeWithChildrenProvider.children);
    });
    it('should not fail if children provider throws an error', async () => {
      const children = await Navigation.getChildren(
        nodeWithChildrenProviderError,
        undefined
      );
      expect(children).to.be.undefined;
    });
    it('should return children using provied context and bind them', async () => {
      const children = await Navigation.getChildren(
        nodeWithChildrenProvider,
        'context'
      );
      expect(children).to.equal(nodeWithChildrenProvider.children);
    });
    it('uses navigationPermissionChecker and returns correct amount of children', async () => {
      //given
      LuigiConfig.config = {
        navigation: {
          nodeAccessibilityResolver: (
            nodeToCheckPermissionFor,
            currentNode,
            currentContext
          ) => {
            if (nodeToCheckPermissionFor.constraints) {
              return nodeToCheckPermissionFor.constraints === 'other_scope';
            }
            return true;
          }
        }
      };

      const nodeWithChildren = {
        label: 'someNode',
        children: [
          { label: 'child1', constraints: 'some_scope' },
          { label: 'child2' }
        ]
      };
      const children = await Navigation.getChildren(nodeWithChildren);
      expect(children.length).to.equal(1);
      expect(children[0].label).to.equal('child2');
    });
  });
  describe('findMatchingNode', () => {
    it('with dynamic path, does not substitute values', () => {
      // given
      const staticNode = () => ({
        label: 'Other',
        pathSegment: 'other'
      });
      const dynamicNode = () => ({
        pathSegment: ':group',
        viewUrl: '/users/groups/:group',
        context: {
          currentGroup: ':group'
        },
        children: [
          {
            label: 'Group Settings',
            pathSegment: 'settings',
            viewUrl: '/users/groups/:group/settings'
          }
        ]
      });

      console.warn = sinon.spy();
      console.error = sinon.spy();

      // truthy tests
      // when
      const resStaticOk = Navigation.findMatchingNode('other', [staticNode()]);
      const resDynamicOk = Navigation.findMatchingNode('avengers', [
        dynamicNode()
      ]);

      // // then
      expect(resStaticOk.pathSegment).to.equal(
        'other',
        'resStaticOk.pathSegment'
      );
      expect(resDynamicOk.pathSegment).to.equal(
        ':group',
        'resDynamicOk.pathSegment'
      );
      expect(resDynamicOk.viewUrl).to.contain(
        '/:group',
        'resDynamicOk.viewUrl'
      );
      expect(resDynamicOk.context.currentGroup).to.equal(
        ':group',
        'resDynamicOk.context'
      );

      // falsy tests
      const resNull = Navigation.findMatchingNode('avengers', [staticNode()]);
      expect(resNull).to.equal(null);
      sinon.assert.notCalled(console.warn);

      const resStaticWarning = Navigation.findMatchingNode('avengers', [
        staticNode(),
        dynamicNode()
      ]);
      expect(resStaticWarning.pathSegment).to.equal(
        ':group',
        'static warning pathSegment: ' + resStaticWarning.pathSegment
      );
      sinon.assert.calledOnce(console.warn);

      const resMultipleDynamicError = Navigation.findMatchingNode(
        'twoDynamic',
        [dynamicNode(), dynamicNode()]
      );
      expect(resMultipleDynamicError).to.equal(null);
      sinon.assert.calledOnce(console.warn);
      sinon.assert.calledOnce(console.error);
      sinon.reset();
    });
  });
  describe('getLeftNavData', () => {
    it('returns empty object if no pathData was found (empty nav)', async () => {
      const res = await Navigation.getLeftNavData({ pathData: [] });
      expect(res).to.be.empty;
    });
    it('returns correct data on standard usecase', async () => {
      // given
      const current = {
        pathData: [
          {
            children: [{ pathSegment: 'overview' }, { pathSegment: 'projects' }]
          },
          {
            pathSegment: 'projects',
            children: [
              {
                pathSegment: 'settings'
              }
            ]
          },
          {
            pathSegment: 'settings'
          }
        ]
      };
      // when
      const res = await Navigation.getLeftNavData(current, current);
      expect(res.selectedNode.pathSegment).to.equal('settings');
    });
    it('returns correct data on virtual node keepSelectedForChildren usecase', async () => {
      // given
      const current = {
        pathData: [
          {
            pathSegment: 'home',
            children: [{ pathSegment: 'overview' }, { pathSegment: 'projects' }]
          },
          {
            pathSegment: 'projects',
            keepSelectedForChildren: true,
            children: [
              {
                pathSegment: 'settings'
              }
            ]
          },
          {
            pathSegment: 'settings'
          }
        ]
      };
      // when
      const res = await Navigation.getLeftNavData(current, current);
      expect(res.selectedNode.pathSegment).to.equal('projects');
    });
  });
});
