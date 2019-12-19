const chai = require('chai');
const expect = chai.expect;
const assert = chai.assert;
const sinon = require('sinon');
import { Navigation } from '../../src/navigation/services/navigation';
import { RoutingHelpers, GenericHelpers } from '../../src/utilities/helpers';
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
  this.retries(2);

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
  beforeEach(() => {
    Navigation._rootNodeProviderUsed = undefined;
    Navigation.rootNode = undefined;
  });
  afterEach(() => {
    // reset
    LuigiConfig.config = {};
    sinon.restore();
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
    const nodeWith_Children = {
      _children: [{ name: 'children1' }, { name: 'children2' }]
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
    it('should return nodes children and bind them if _children are provided', async () => {
      const children = await Navigation.getChildren(
        nodeWith_Children,
        undefined
      );
      expect(children).to.be.deep.equal(nodeWith_Children.children);
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
    it('expands a structural node', async () => {
      const children = await Navigation.getChildren({
        children: [
          {
            label: 'Label',
            pathSegment: 'one/two'
          }
        ]
      });
      const expectation = [
        {
          pathSegment: 'one',
          children: [
            {
              label: 'Label',
              pathSegment: 'two'
            }
          ]
        }
      ];
      assert.deepEqual(children, expectation);
    });
  });

  describe('bindChildToParent', () => {
    const emptyNode = {};
    const nodeWithoutPathSegment = {
      children: [{ name: 'subCategory1' }, { name: 'subCategory2' }]
    };
    const node = {
      pathSegment: 'category1',
      children: [{ name: 'subCategory1' }, { name: 'subCategory2' }]
    };
    it("should return empty node if it doesn't have children or empty", () => {
      const result = Navigation.bindChildToParent(emptyNode, {});
      assert.deepEqual(result, {});
    });
    it('should return node if pathSegment is not defined', () => {
      const mockNode = { label: 'Luigi' };
      const result = Navigation.bindChildToParent(
        mockNode,
        nodeWithoutPathSegment
      );
      assert.deepEqual(result, mockNode);
    });
    it('should return parent.pathSegment of first child', () => {
      const result = Navigation.bindChildToParent({}, node);
      assert.equal(result.parent.pathSegment, 'category1');
    });
  });

  describe('buildNode', () => {
    //need to add more cases
    const nodeNamesInCurrentPath = 'projects';
    const nodesInCurrentPath = [
      {
        children: [
          {
            pathSegment: 'projects',
            label: 'Projects',
            viewUrl: '/projects',
            children: [
              {
                navigationContext: 'project',
                pathSegment: 'pr1',
                label: 'Project One',
                viewUrl: '/projects/pr1',
                context: {}
              },
              {
                navigationContext: 'project',
                pathSegment: 'pr2',
                label: 'Project Two',
                viewUrl: '/projects/pr2',
                context: {}
              }
            ]
          },
          {
            pathSegment: 'groups',
            label: 'Groups',
            viewUrl: '/groups',
            children: [
              {
                navigationContext: 'group',
                pathSegment: 'gr1',
                label: 'Group One',
                viewUrl: '/groups/gr1',
                context: {}
              },
              {
                navigationContext: 'group',
                pathSegment: 'gr2',
                label: 'Group Two',
                viewUrl: '/groups/gr2',
                context: {}
              }
            ]
          }
        ]
      },
      {
        pathSegment: 'projects',
        label: 'Projects',
        viewUrl: '/projects',
        children: [
          {
            navigationContext: 'project',
            pathSegment: 'pr1',
            label: 'Project One',
            viewUrl: '/projects/pr1',
            context: {}
          },
          {
            navigationContext: 'project',
            pathSegment: 'pr2',
            label: 'Project Two',
            viewUrl: '/projects/pr2',
            context: {}
          }
        ]
      }
    ];
    const childrenOfCurrentNode = [
      {
        navigationContext: 'project',
        pathSegment: 'pr1',
        label: 'Project One',
        viewUrl: '/projects/pr1',
        context: {}
      },
      {
        navigationContext: 'project',
        pathSegment: 'pr2',
        label: 'Project Two',
        viewUrl: '/projects/pr2',
        context: {}
      }
    ];
    const context = {};
    it('should build node', async () => {
      const result = await Navigation.buildNode(
        nodeNamesInCurrentPath,
        nodesInCurrentPath,
        childrenOfCurrentNode,
        context
      );
      expect(result.navigationPath.length).to.be.equal(2);
      expect(result.navigationPath[1].children.length).to.be.equal(2);
      expect(result.pathParams).to.be.deep.equal({});
      expect(result.navigationPath[1].label).to.be.equal('Projects');
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
    });
  });
  describe('getNodes', () => {
    let children;
    let pathData;
    before(() => {
      children = [];
      pathData = [];
    });
    afterEach(() => {
      // reset
      sinon.restore();
      sinon.reset();
    });
    it('should not fail, returns empty array if empty nav was found', () => {
      const result = Navigation.getNodes(children, pathData);
      expect(result).to.be.empty;
    });
    it('should not fail, returns empty array if pathData has not nestedNode', () => {
      pathData = [
        {
          children: [{ pathSegment: 'overview' }, { pathSegment: 'projects' }]
        },
        {
          pathSegment: 'projects',
          children: [
            {
              pathSegment: 'settings1'
            }
          ]
        }
      ];
      const result = Navigation.getNodes(children, pathData);
      assert.deepEqual(result, []);
    });
    it('should not fail, returns nested node children if pathData has nestedNode', () => {
      pathData = [
        {
          children: [{ pathSegment: 'overview' }, { pathSegment: 'projects' }]
        },
        {
          pathSegment: 'projects',
          children: [
            {
              pathSegment: 'settings1'
            }
          ]
        },
        {
          pathSegment: 'settings2'
        }
      ];
      const result = Navigation.getNodes(children, pathData);
      expect(result).to.be.deep.equal([{ pathSegment: 'settings1' }]);
    });
    it('should not fail, returns children if pathData is empty', () => {
      children = [{ pathSegment: 'overview' }, { pathSegment: 'projects' }];
      const result = Navigation.getNodes(children, pathData);
      expect(result).to.be.deep.equal([
        { pathSegment: 'overview' },
        { pathSegment: 'projects' }
      ]);
    });
    it('returns children on standard usecase', () => {
      children = [{ pathSegment: 'settings1' }];
      pathData = [
        {
          children: [{ pathSegment: 'overview' }, { pathSegment: 'projects' }]
        },
        {
          pathSegment: 'projects',
          children: [
            {
              pathSegment: 'settings1'
            }
          ]
        }
      ];
      const result = Navigation.getNodes(children, pathData);
      expect(result).to.be.deep.equal([{ pathSegment: 'settings1' }]);
    });
  });
  describe('getGroupedChildren', () => {
    let children;
    let current;
    before(() => {
      children = [];
      current = [];
    });
    afterEach(() => {
      // reset
      sinon.restore();
      sinon.reset();
    });
    it('should not fail, returns empty array if params are not provided', () => {
      current = {
        pathData: []
      };
      const result = Navigation.getGroupedChildren(children, current);
      expect(result).to.be.deep.equal({});
    });
    it('returns nested node children if pathData has nestedNode', () => {
      current = {
        pathData: [
          {
            children: [{ pathSegment: 'overview' }, { pathSegment: 'projects' }]
          },
          {
            pathSegment: 'projects',
            children: [
              {
                pathSegment: 'category'
              }
            ]
          },
          {
            pathSegment: 'settings'
          }
        ]
      };
      const result = Navigation.getGroupedChildren(children, current);
      expect(result.___0[0].pathSegment).to.be.equal('category');
    });
    it('returns empty object if pathData has not nestedNode', () => {
      current = {
        pathData: [
          {
            children: [{ pathSegment: 'overview' }, { pathSegment: 'projects' }]
          },
          {
            pathSegment: 'projects',
            children: [
              {
                pathSegment: 'category'
              }
            ]
          }
        ]
      };
      const result = Navigation.getGroupedChildren(children, current);
      expect(result).to.be.deep.equal({});
    });
    it('returns grouped children if no pathData was found (empty nav)', () => {
      children = [{ pathSegment: 'settings' }];
      current = {
        pathData: []
      };
      const result = Navigation.getGroupedChildren(children, current);
      expect(result.___0[0].pathSegment).to.be.equal('settings');
    });
    it('returns grouped children on standard usecase', () => {
      children = [{ pathSegment: 'settings' }, { pathSegment: 'category' }];
      current = {
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
      const result = Navigation.getGroupedChildren(children, current);
      expect(result.___0[0].pathSegment).to.be.equal('settings');
      expect(result.___0[1].pathSegment).to.be.equal('category');
    });
  });
  describe('getTruncatedChildren', () => {
    let children;
    before(() => {
      children = [];
    });
    afterEach(() => {
      // reset
      sinon.restore();
      sinon.reset();
    });
    it('should not fail, returns empty array if children not provided', () => {
      const result = Navigation.getTruncatedChildren(children);
      expect(result).to.be.deep.equal([]);
    });
    it('returns children if tabNav is true', () => {
      children = [
        { 1: '1' },
        { 2: '2', tabNav: true },
        { 3: '3' },
        { 4: '4' },
        { 5: '5' }
      ];
      const result = Navigation.getTruncatedChildren(children);
      expect(result).to.be.deep.equal([{ 1: '1' }, { 2: '2', tabNav: true }]);
    });
    it('returns children if keepSelectedForChildren is true', () => {
      children = [
        { 1: '1' },
        { 2: '2' },
        { 3: '3', keepSelectedForChildren: true },
        { 4: '4' },
        { 5: '5' }
      ];
      const result = Navigation.getTruncatedChildren(children);
      expect(result).to.be.deep.equal([
        { 1: '1' },
        { 2: '2' },
        { 3: '3', keepSelectedForChildren: true }
      ]);
    });
    it('returns children if keepSelectedForChildren and tabNav are true', () => {
      children = [
        { 1: '1' },
        { 2: '2', tabNav: true },
        { 3: '3', keepSelectedForChildren: true },
        { 4: '4' },
        { 5: '5' }
      ];
      const result = Navigation.getTruncatedChildren(children);
      expect(result).to.be.deep.equal([{ 1: '1' }, { 2: '2', tabNav: true }]);
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
  describe('getTabNavData', () => {
    it('returns empty object if no pathData was found (empty nav)', async () => {
      const res = await Navigation.getTabNavData({ pathData: [] });
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
            tabNav: true,
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
      const res = await Navigation.getTabNavData(current, current);
      expect(res.selectedNode.pathSegment).to.equal('settings');
    });
    it('getTruncatedChildrenForTabNav', () => {
      const children = [
        { 1: '1' },
        { 2: '2' },
        { 3: '3', tabNav: true },
        { 4: '4' },
        { 5: '5' }
      ];
      const res = Navigation.getTruncatedChildrenForTabNav(children);
      expect(res.length).to.equal(4);
    });
  });

  describe('extractDataFromPath', () => {
    it('extracts the data', async () => {
      sinon.stub(Navigation, 'getNavigationPath').returns('path-data');
      sinon.stub(RoutingHelpers, 'getLastNodeObject').returns('node-object');
      sinon
        .stub(LuigiConfig, 'getConfigValueAsync')
        .returns('navigation-nodes');

      const expected = {
        nodeObject: 'node-object',
        pathData: 'path-data'
      };
      const actual = await Navigation.extractDataFromPath('path');

      sinon.assert.calledWithExactly(
        LuigiConfig.getConfigValueAsync,
        'navigation.nodes'
      );
      sinon.assert.calledWithExactly(
        Navigation.getNavigationPath,
        'navigation-nodes',
        'path'
      );
      sinon.assert.calledWithExactly(
        RoutingHelpers.getLastNodeObject,
        'path-data'
      );
      expect(actual).to.eql(expected);
    });
  });

  describe('shouldPreventNavigation', () => {
    let node;
    let nodeActivationHook;

    beforeEach(() => {
      sinon.stub(GenericHelpers, 'isFunction').returns(true);
      nodeActivationHook = sinon.stub().returns(false);
      node = {
        onNodeActivation: nodeActivationHook
      };
    });

    it('returns true when node activation hook returns false', async () => {
      const actual = await Navigation.shouldPreventNavigation(node);
      expect(actual).to.be.true;
    });

    it('returns false when node is falsy', async () => {
      node = undefined;
      const actual = await Navigation.shouldPreventNavigation(node);
      expect(actual).to.be.false;
    });

    it('returns false when node activation hook is not a function', async () => {
      GenericHelpers.isFunction.returns(false);
      const actual = await Navigation.shouldPreventNavigation(node);
      expect(actual).to.be.false;
    });

    it('returns false when node activation hook does not return false', async () => {
      nodeActivationHook.returns(undefined);
      const actual = await Navigation.shouldPreventNavigation(node);
      expect(actual).to.be.false;
    });
  });
  describe('expandStructuralPathSegment', () => {
    it('keeps node unchanged if is normal pathSegment', () => {
      const input = {
        label: 'Projects',
        pathSegment: 'projects'
      };
      const expected = Object.assign({}, input);

      const result = Navigation.getExpandStructuralPathSegment(input);

      assert.deepEqual(result, expected);
    });

    it('expands slashes in pathSegments', () => {
      const input = {
        label: 'Projects',
        pathSegment: 'some/cool/projects'
      };
      const expected = {
        pathSegment: 'some',
        children: [
          {
            pathSegment: 'cool',
            children: [
              {
                label: 'Projects',
                pathSegment: 'projects'
              }
            ]
          }
        ]
      };

      const result = Navigation.getExpandStructuralPathSegment(input);

      assert.deepEqual(result, expected);
    });
  });
});
