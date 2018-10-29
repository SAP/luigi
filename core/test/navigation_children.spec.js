import { getChildren } from '../src/services/navigation_children';
const chai = require('chai');
const expect = chai.expect;

describe('Navigation_childern', function() {
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
    window.Luigi = {
      config: {}
    };
  });

  describe('getChildren()', () => {
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
      const children = await getChildren(undefined, undefined);
      expect(children.length).to.equal(0);
    });
    it("should return empty array if it doesn't have children", async () => {
      const aNode = {};
      const children = await getChildren(aNode, undefined);
      expect(children.length).to.equal(0);
    });
    it('should return nodes children and bind them if children are provided', async () => {
      const children = await getChildren(nodeWithChildren, undefined);
      expect(children).to.equal(nodeWithChildren.children);
    });
    it('should return nodes children and bind them if children provider is provided', async () => {
      const children = await getChildren(nodeWithChildrenProvider, undefined);
      expect(children).to.equal(nodeWithChildrenProvider.children);
    });
    it('should not fail if children provider throws an error', async () => {
      const children = await getChildren(
        nodeWithChildrenProviderError,
        undefined
      );
      expect(children).to.be.undefined;
    });
    it('should return children using provied context and bind them', async () => {
      const children = await getChildren(nodeWithChildrenProvider, 'context');
      expect(children).to.equal(nodeWithChildrenProvider.children);
    });
    it('uses navigationPermissionChecker and returns correct amount of children', async () => {
      //given
      window.Luigi = {
        config: {
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
        }
      };

      const nodeWithChildren = {
        label: 'someNode',
        children: [
          { label: 'child1', constraints: 'some_scope' },
          { label: 'child2' }
        ]
      };
      const children = await getChildren(nodeWithChildren);
      expect(children.length).to.equal(1);
      expect(children[0].label).to.equal('child2');
    });
  });
});
