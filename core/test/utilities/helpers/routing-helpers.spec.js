const chai = require('chai');
const assert = chai.assert;
import * as RoutingHelpers from '../../../src/utilities/helpers/routing-helpers';

describe('Routing-helpers', () => {
  describe('defaultChildNodes', () => {
    const mockPathData = {
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

    it('should return first child if no defaultChildNode is set', async () => {
      assert.equal(
        await RoutingHelpers.getDefaultChildNode(mockPathData),
        'stakeholders'
      );
    });

    it('should return child with pathSegment equal to defaultChildNode', async () => {
      let pathData = Object.assign(mockPathData);
      pathData.navigationPath[1].defaultChildNode = 'customers';

      assert.equal(
        await RoutingHelpers.getDefaultChildNode(pathData),
        'customers'
      );
    });

    it('should return first child if given defaultChildNode does not exist', async () => {
      let pathData = Object.assign(mockPathData);
      pathData.navigationPath[1].defaultChildNode = 'NOSUCHPATH';

      assert.equal(
        await RoutingHelpers.getDefaultChildNode(pathData),
        'stakeholders'
      );
    });

    it('should return first child asynchronous if no defaultChildNode is set', async () => {
      const pathData = {
        navigationPath: [
          {
            // DOESN'T MATTER
          },
          {
            pathSegment: 'groups',
            children: () =>
              Promise.resolve([
                {
                  pathSegment: 'stakeholders',
                  viewUrl:
                    '/sampleapp.html#/projects/1/users/groups/stakeholders'
                },
                {
                  pathSegment: 'customers',
                  viewUrl: '/sampleapp.html#/projects/1/users/groups/customers'
                }
              ])
          }
        ],
        context: {}
      };

      assert.equal(
        await RoutingHelpers.getDefaultChildNode(pathData),
        'stakeholders'
      );
    });

    it('should return first child that has pathSegment defined', async () => {
      let pathData = {
        navigationPath: [
          {
            // DOESN'T MATTER
          },
          {
            pathSegment: 'myPath',
            children: [
              {
                link: '/home',
                label: 'go back'
              },
              {
                link: '/house',
                label: 'still no viewUrl'
              },
              {
                pathSegment: 'child',
                label: 'This should be the default child',
                viewUrl: '/myApp.html#/default-child'
              }
            ]
          }
        ],
        context: {}
      };

      assert.equal(await RoutingHelpers.getDefaultChildNode(pathData), 'child');
    });
  });
});
