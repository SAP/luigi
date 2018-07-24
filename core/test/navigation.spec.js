const navigation = require('../src/services/navigation');
const chai = require('chai');
const expect = chai.expect;
const assert = chai.assert;

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
  describe('#getNavigationPath()', function() {
    it('should not fail for undefined arguments', () => {
      navigation.getNavigationPath(undefined, undefined);
    });

    it('should resolve top level node', async () => {
      const navPath = await navigation.getNavigationPath(sampleNavPromise);
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
      const navPath = await navigation.getNavigationPath(
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
      const navPath = await navigation.getNavigationPath(
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
      const navPath = await navigation.getNavigationPath(
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
      const navPath = await navigation.getNavigationPath(
        sampleNavPromise,
        'bbb/b1'
      );
      assert.propertyVal(navPath.context, 'lazy', true);
    });
  });

  describe('#getChildren()', () => {
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
      const children = await navigation.getChildren(undefined, undefined);
      expect(children).to.be.undefined;
    });
    it("should return node if it doesn't have children", async () => {
      const aNode = {};
      const children = await navigation.getChildren(aNode, undefined);
      expect(children).to.equal(aNode);
    });
    it('should return nodes children and bind them if children are provided', async () => {
      const children = await navigation.getChildren(
        nodeWithChildren,
        undefined
      );
      expect(children).to.equal(nodeWithChildren.children);
    });
    it('should return nodes children and bind them if children provider is provided', async () => {
      const children = await navigation.getChildren(
        nodeWithChildrenProvider,
        undefined
      );
      expect(children).to.equal(nodeWithChildrenProvider.children);
    });
    it('should not fail if children provider throws an error', async () => {
      const children = await navigation.getChildren(
        nodeWithChildrenProviderError,
        undefined
      );
      expect(children).to.be.undefined;
    });
    it('should return children using provied context and bind them', async () => {
      const children = await navigation.getChildren(
        nodeWithChildrenProvider,
        'context'
      );
      expect(children).to.equal(nodeWithChildrenProvider.children);
    });
  });
});
