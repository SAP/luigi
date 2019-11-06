const chai = require('chai');
const expect = chai.expect;
const assert = chai.assert;
import { RoutingHelpers } from '../../../src/utilities/helpers';

describe('Routing-helpers', () => {
  describe('substituteDynamicParamsInObject', () => {
    let input, paramMap, expectedOutput;
    beforeEach(() => {
      input = {
        key1: 'something',
        key2: ':group'
      };
      paramMap = {
        group: 'mygroup'
      };

      expectedOutput = {
        key1: 'something',
        key2: 'mygroup'
      };
    });

    it('substitutes an object', () => {
      expect(
        RoutingHelpers.substituteDynamicParamsInObject(input, paramMap)
      ).to.deep.equal(expectedOutput);
      expect(input.key2).to.equal(':group');
    });
    it('substitutes an object using custom prefix', () => {
      input.key2 = '#group';

      expect(
        RoutingHelpers.substituteDynamicParamsInObject(input, paramMap, '#')
      ).to.deep.equal(expectedOutput);
      expect(input.key2).to.equal('#group');
    });
  });

  describe('defaultChildNodes', () => {
    let mockPathData;
    beforeEach(() => {
      mockPathData = {
        navigationPath: [
          {
            // DOESN'T MATTER
          },
          {
            pathSegment: 'groups',
            children: [
              {
                pathSegment: 'stakeholders',
                viewUrl: '/sampleapp.html#/projects/1/users/groups/stakeholders'
              },
              {
                pathSegment: 'customers',
                viewUrl: '/sampleapp.html#/projects/1/users/groups/customers'
              }
            ]
          }
        ],
        context: {}
      };
    });

    it('should return first child if no defaultChildNode is set', async () => {
      assert.equal(
        await RoutingHelpers.getDefaultChildNode(mockPathData),
        'stakeholders'
      );
    });

    it('should return child with pathSegment equal to defaultChildNode', async () => {
      mockPathData.navigationPath[1].defaultChildNode = 'customers';

      assert.equal(
        await RoutingHelpers.getDefaultChildNode(mockPathData),
        'customers'
      );
    });

    it('should return first child if given defaultChildNode does not exist', async () => {
      mockPathData.navigationPath[1].defaultChildNode = 'NOSUCHPATH';

      assert.equal(
        await RoutingHelpers.getDefaultChildNode(mockPathData),
        'stakeholders'
      );
    });

    it('should return first child asynchronous if no defaultChildNode is set', async () => {
      assert.equal(
        await RoutingHelpers.getDefaultChildNode(mockPathData),
        'stakeholders'
      );
    });

    it('should return first child that has viewUrl defined', async () => {
      mockPathData.navigationPath = [
        {
          // DOESN'T MATTER
        },
        {
          pathSegment: 'myPath',
          children: [
            {
              pathSegment: 'home',

              label: 'go back'
            },
            {
              pathSegment: 'maskopatol',
              label: 'still no viewUrl'
            },
            {
              pathSegment: 'child',
              label: 'This should be the default child',
              viewUrl: '/sampleapp.html#/myPath/child'
            }
          ]
        }
      ];

      assert.equal(
        await RoutingHelpers.getDefaultChildNode(mockPathData),
        'child'
      );
    });

    it('should return first child that has externalLink.url defined', async () => {
      mockPathData.navigationPath = [
        {
          // DOESN'T MATTER
        },
        {
          pathSegment: 'myPath',
          children: [
            {
              pathSegment: 'home',

              label: 'go back'
            },
            {
              pathSegment: 'maskopatol',
              label: 'still no viewUrl'
            },
            {
              pathSegment: 'child',
              label: 'This should be the default child',
              externalLink: {
                url: 'https://google.com'
              }
            }
          ]
        }
      ];

      assert.equal(
        await RoutingHelpers.getDefaultChildNode(mockPathData),
        'child'
      );
    });
  });

  describe('applyPathParams', () => {
    it('empty path should not fail', () => {
      expect(RoutingHelpers.applyPathParams('', {})).to.equal('');
    });
    it('replace two parameters', () => {
      expect(
        RoutingHelpers.applyPathParams('/projects/:project/details/:entry', {
          project: 'pr1',
          entry: 'e23'
        })
      ).to.equal('/projects/pr1/details/e23');
    });
  });

  describe('getLastNodeObject', () => {
    let mockPathData;

    it('return last node of navigationPath', () => {
      mockPathData = {
        navigationPath: [
          {
            pathSegment: 'project1'
          },
          {
            pathSegment: 'project2'
          },
          {
            pathSegment: 'project3'
          }
        ]
      };
      assert.deepEqual(RoutingHelpers.getLastNodeObject(mockPathData), {
        pathSegment: 'project3'
      });
    });

    it('should not fail on empty navigationPath', () => {
      mockPathData = {
        navigationPath: []
      };
      expect(RoutingHelpers.getLastNodeObject(mockPathData)).to.deep.equal({});
    });
  });

  describe('parseParams', () => {
    let mockParams;

    it('return pairs of params', () => {
      mockParams = 'test=true&foo=bar';
      assert.deepEqual(RoutingHelpers.parseParams(mockParams), {
        test: 'true',
        foo: 'bar'
      });
    });

    it('should not fail on empty params', () => {
      mockParams = '';
      expect(RoutingHelpers.parseParams(mockParams)).to.deep.equal({});
    });
  });

  describe('findViewGroup', () => {
    const noViewGroupInNode = {
      link: 'child-node',
      parent: {
        pathSegment: 'parent-node'
      }
    };

    const viewGroupInNode = {
      link: 'child-node',
      viewGroup: 'tets 1',
      parent: {
        pathSegment: 'parent-node'
      }
    };

    const viewGroupInNodeParent = {
      link: 'child-node',
      parent: {
        pathSegment: 'parent-node',
        viewGroup: 'tets 1-1'
      }
    };

    const viewGroupInParentOfNodeParent = {
      link: 'child-node',
      parent: {
        pathSegment: 'parent-node',
        parent: {
          pathSegment: 'parent-parent-node',
          viewGroup: 'tets 1-1-1'
        }
      }
    };

    it('return viewGroup from node', () => {
      assert.deepEqual(RoutingHelpers.findViewGroup(viewGroupInNode), 'tets 1');
    });

    it('return viewGroup from node.parent', () => {
      assert.deepEqual(
        RoutingHelpers.findViewGroup(viewGroupInNodeParent),
        'tets 1-1'
      );
    });

    it('return viewGroup from parent at node.parent', () => {
      assert.deepEqual(
        RoutingHelpers.findViewGroup(viewGroupInParentOfNodeParent),
        'tets 1-1-1'
      );
    });

    it('return undefined if viewGroup is not inside node', () => {
      assert.deepEqual(
        RoutingHelpers.findViewGroup(noViewGroupInNode),
        undefined
      );
    });
  });
});
