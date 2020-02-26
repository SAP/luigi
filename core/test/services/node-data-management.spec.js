const chai = require('chai');
const expect = chai.expect;
import { NodeDataManagementStorage } from '../../src/services/node-data-management';

describe('NodeDataManagementStorage', function() {
  let node = {
    pathSegment: 'myNode',
    children: [
      {
        pathSegment: 'children1'
      },
      {
        pathSegment: 'children2'
      }
    ]
  };
  afterEach(() => {
    // reset
    NodeDataManagementStorage.deleteCache();
  });
  describe('setChildren', function() {
    it('fill the cache with an node as key and an object as value using setChildren', () => {
      NodeDataManagementStorage.setChildren(node, { children: node.children });
      expect(NodeDataManagementStorage.dataManagement.size).to.equal(1);
    });
    it('extend node in cache with another children', () => {
      NodeDataManagementStorage.setChildren(node, { children: node.children });
      node.children.push({ pathSegment: 'children3' });
      expect(NodeDataManagementStorage.dataManagement.size).to.equal(1);
      NodeDataManagementStorage.setChildren(node, { children: node.children });
      expect(NodeDataManagementStorage.dataManagement.size).to.equal(1);
      expect(
        NodeDataManagementStorage.dataManagement.get(node).children.length
      ).to.equal(3);
      node.children.pop();
    });
    it('saving node with childrenNodeProviderFn', () => {
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
      let node = {
        pathSegment: 'myNode',
        children: lazyLoadedChildrenNodesProviderFn
      };
      NodeDataManagementStorage.setChildren(node, { children: node.children });
      expect(NodeDataManagementStorage.dataManagement.size).to.equal(1);
      const childrenPromise = NodeDataManagementStorage.dataManagement
        .get(node)
        .children();
      childrenPromise.then(val => {
        expect(val).to.deep.equal([
          {
            pathSegment: 'b1',
            context: {
              lazy: true
            }
          }
        ]);
      });
    });
  });
  describe('getChildren', function() {
    beforeEach(() => {
      NodeDataManagementStorage.setChildren(node, { children: node.children });
    });
    this.afterEach(() => {
      NodeDataManagementStorage.deleteCache();
    });
    it('get children from cache', () => {
      const children = NodeDataManagementStorage.getChildren(node).children;
      expect(children.length).to.equal(2);
      expect(children[0]).to.deep.equal({
        pathSegment: 'children1'
      });
    });
    it('calling getChildren with non existing node in cache; should return empty array', () => {
      let node2 = {
        pathSegment: 'myNode2',
        children: [{ pathSegment: 'myChild1' }]
      };
      const data = NodeDataManagementStorage.getChildren(node2);
      expect(data).to.be.undefined;
    });
  });

  describe('hasChildren', () => {
    beforeEach(() => {
      NodeDataManagementStorage.setChildren(node, { children: node.children });
    });
    afterEach(() => {
      NodeDataManagementStorage.deleteCache();
    });
    it('check if children for node is stored in cache', () => {
      expect(NodeDataManagementStorage.hasChildren(node)).to.be.true;
    });
    it('check if children for node is stored in cache2', () => {
      let node3 = {
        pathSegment: 'myNode3',
        children: [
          {
            pathSegment: 'children1'
          },
          {
            pathSegment: 'children2'
          }
        ]
      };
      expect(NodeDataManagementStorage.hasChildren(node3)).to.be.undefined;
    });
  });

  describe('set, get and has rootNode', () => {
    let rootNode = {
      children: [
        { pathSegment: 'Overview' },
        { pathSegment: 'projects', children: [{ pathSegment: 'pr1' }] }
      ]
    };
    beforeEach(() => {
      NodeDataManagementStorage.setRootNode(rootNode);
    });
    afterEach(() => {
      NodeDataManagementStorage.deleteCache();
    });
    it('store rootNode in cache', () => {
      expect(NodeDataManagementStorage.dataManagement.size).to.equal(1);
      let rootNodeFromCache = NodeDataManagementStorage.dataManagement.get(
        '_luigiRootNode'
      ).node;
      expect(rootNodeFromCache).to.deep.equal(rootNode);
    });
    it('get stored rootNode from Cache using getRootNode', () => {
      const rootNodeFromCache = NodeDataManagementStorage.getRootNode().node;
      expect(rootNodeFromCache).to.deep.equal(rootNode);
    });
    it('check if rootNode is set', () => {
      expect(NodeDataManagementStorage.hasRootNode()).to.be.true;
      NodeDataManagementStorage.deleteCache();
      expect(NodeDataManagementStorage.hasRootNode()).to.be.false;
    });
  });
  describe('delete Cache', () => {
    beforeEach(() => {
      NodeDataManagementStorage.setChildren(node, { children: node.children });
    });
    it('remove all entries from map', () => {
      expect(NodeDataManagementStorage.dataManagement.size).to.equal(1);
      NodeDataManagementStorage.deleteCache();
      expect(NodeDataManagementStorage.dataManagement.size).to.equal(0);
    });
  });
});
