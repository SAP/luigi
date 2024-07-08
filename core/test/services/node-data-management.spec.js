import { NodeDataManagementStorage } from '../../src/services/node-data-management';
const chai = require('chai');
const expect = chai.expect;
const assert = chai.assert;

describe('NodeDataManagementStorage', function() {
  const getNodeMock = () => ({
    pathSegment: 'myNode',
    children: [
      {
        pathSegment: 'children1'
      },
      {
        pathSegment: 'children2'
      }
    ]
  });
  afterEach(() => {
    // reset
    NodeDataManagementStorage.deleteCache();
  });
  it('constructor values', () => {
    assert.exists(NodeDataManagementStorage.dataManagement);
  });
  describe('setChildren', function() {
    it('fill the cache with an node as key and an object as value using setChildren', () => {
      NodeDataManagementStorage.setChildren(getNodeMock(), {
        children: getNodeMock().children
      });
      expect(NodeDataManagementStorage.dataManagement.size).to.equal(1);
    });
    it('extend node in cache with another children', () => {
      NodeDataManagementStorage.setChildren(getNodeMock(), {
        children: getNodeMock().children
      });
      expect(NodeDataManagementStorage.dataManagement.size).to.equal(1);
      let nodeMock = getNodeMock();
      nodeMock.children.push({ pathSegment: 'children3' });
      NodeDataManagementStorage.setChildren(nodeMock, {
        children: nodeMock.children
      });
      expect(NodeDataManagementStorage.dataManagement.size).to.equal(2);
    });
  });
  describe('getChildren', function() {
    afterEach(() => {
      NodeDataManagementStorage.deleteCache();
    });
    it('get children from cache', () => {
      const nodeMock = getNodeMock();
      expect(NodeDataManagementStorage.getChildren(nodeMock)).to.be.undefined;
      NodeDataManagementStorage.setChildren(nodeMock, {
        children: nodeMock.children
      });
      const children = NodeDataManagementStorage.getChildren(nodeMock).children;
      expect(children.length).to.equal(2);
      expect(children[0]).to.deep.equal({
        pathSegment: 'children1'
      });
    });
  });

  describe('hasChildren', () => {
    afterEach(() => {
      NodeDataManagementStorage.deleteCache();
    });
    it('check if children for node is stored in cache', () => {
      const nodeMock = getNodeMock();
      expect(NodeDataManagementStorage.hasChildren(nodeMock)).to.be.undefined;
      NodeDataManagementStorage.setChildren(nodeMock, {
        children: nodeMock.children
      });
      expect(NodeDataManagementStorage.hasChildren(nodeMock)).to.be.true;
    });
  });

  describe('set, get and has rootNode', () => {
    let rootNode = {
      children: [{ pathSegment: 'Overview' }, { pathSegment: 'projects', children: [{ pathSegment: 'pr1' }] }]
    };
    afterEach(() => {
      NodeDataManagementStorage.deleteCache();
    });
    it('store rootNode in cache', () => {
      expect(NodeDataManagementStorage.dataManagement.size).to.equal(0);
      NodeDataManagementStorage.setRootNode(rootNode);
      expect(NodeDataManagementStorage.dataManagement.size).to.equal(1);
      let rootNodeFromCache = NodeDataManagementStorage.dataManagement.get('_luigiRootNode').node;
      expect(rootNodeFromCache).to.deep.equal(rootNode);
    });
    it('get stored rootNode from cache using getRootNode', () => {
      expect(NodeDataManagementStorage.getRootNode()).to.be.undefined;
      NodeDataManagementStorage.setRootNode(rootNode);
      const rootNodeFromCache = NodeDataManagementStorage.getRootNode().node;
      expect(rootNodeFromCache).to.deep.equal(rootNode);
    });
    it('check if rootNode is set', () => {
      expect(NodeDataManagementStorage.hasRootNode()).to.be.false;
      NodeDataManagementStorage.setRootNode(rootNode);
      expect(NodeDataManagementStorage.hasRootNode()).to.be.true;
      NodeDataManagementStorage.deleteCache();
      expect(NodeDataManagementStorage.hasRootNode()).to.be.false;
    });
  });
  describe('delete Cache', () => {
    it('remove all entries from map', () => {
      expect(NodeDataManagementStorage.dataManagement.size).to.equal(0);
      const nodeMock = getNodeMock();
      NodeDataManagementStorage.setChildren(nodeMock, {
        children: nodeMock.children
      });
      expect(NodeDataManagementStorage.dataManagement.size).to.equal(1);
      NodeDataManagementStorage.deleteCache();
      expect(NodeDataManagementStorage.dataManagement.size).to.equal(0);
    });
    it('remove node and its children recursivly', () => {
      expect(NodeDataManagementStorage.dataManagement.size).to.equal(0);
      let children1 = { pathSegment: 'child1' };
      let children4 = { pathSegment: 'child4' };
      let children3 = { pathSegment: 'child3', children: [children4] };
      let children2 = { pathSegment: 'child2', children: [children3] };
      let rootNode = {
        children: [children1, children2]
      };
      NodeDataManagementStorage.setChildren(rootNode, {
        children: rootNode.children
      });
      NodeDataManagementStorage.setChildren(children1, {
        children: children1.children
      });
      NodeDataManagementStorage.setChildren(children2, {
        children: children2.children
      });
      NodeDataManagementStorage.setChildren(children3, {
        children: children3.children
      });
      expect(NodeDataManagementStorage.dataManagement.size).to.equal(4);
      NodeDataManagementStorage.deleteNodesRecursively(children2);
      expect(NodeDataManagementStorage.dataManagement.size).to.equal(2);
    });
  });
});
