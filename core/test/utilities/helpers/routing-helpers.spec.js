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
});
