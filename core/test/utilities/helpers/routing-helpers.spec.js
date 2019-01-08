const chai = require('chai');
const expect = chai.expect;
const assert = chai.assert;
import * as RoutingHelpers from '../../../src/utilities/helpers/routing-helpers';

describe('Routing-helpers', () => {
  describe('processDynamicNode', () => {
    it('does nothing on static nodes', () => {
      const staticNode = () => ({
        label: 'Other',
        pathSegment: 'other',
        viewUrl: 'something_other'
      });

      // falsy tests
      const resUnchanged = RoutingHelpers.processDynamicNode(
        staticNode(),
        'avengers'
      );
      expect(resUnchanged).to.deep.equal(staticNode());
    });
    it('substitutes dynamic paths', () => {
      // given
      const dynamicNode = () => ({
        label: 'Nested Dynamic',
        pathSegment: ':nested',
        viewUrl: '/users/groups/:group/settings/:nested',
        context: {
          currentGroup: ':group',
          currentNested: ':nested',
          unchanged: 'stays'
        }
      });

      const pathParams = {
        group: 'avengers',
        nested: 'superpowers'
      };

      // truthy tests
      // when
      const resDynamicOk = RoutingHelpers.processDynamicNode(
        dynamicNode(),
        pathParams
      );

      // then
      expect(resDynamicOk.pathSegment).to.equal(
        'superpowers',
        'resDynamicOk.pathSegment'
      );
      expect(resDynamicOk.viewUrl).to.equal(
        '/users/groups/avengers/settings/superpowers',
        'resDynamicOk.viewUrl'
      );
      expect(resDynamicOk.context.currentGroup).to.equal(
        'avengers',
        'resDynamicOk.context.group'
      );
      expect(resDynamicOk.context.currentNested).to.equal(
        'superpowers',
        'resDynamicOk.context.nested'
      );
      expect(resDynamicOk.context.unchanged).to.equal(
        'stays',
        'resDynamicOk.context.unchanged'
      );
    });
  });
  describe('defaultChildNodes', () => {
    const getPathData = function() {
      return {
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
    };

    it('should return first child if no defaultChildNode is set', async () => {
      let pathData = getPathData();

      assert.equal(
        await RoutingHelpers.getDefaultChildNode(pathData),
        'stakeholders'
      );
    });

    it('should return child with pathSegment equal to defaultChildNode', async () => {
      let pathData = getPathData();
      pathData.navigationPath[1].defaultChildNode = 'customers';

      assert.equal(
        await RoutingHelpers.getDefaultChildNode(pathData),
        'customers'
      );
    });

    it('should return first child if given defaultChildNode does not exist', async () => {
      const pathData = getPathData();
      pathData.navigationPath[1].defaultChildNode = 'NOSUCHPATH';

      assert.equal(
        await RoutingHelpers.getDefaultChildNode(pathData),
        'stakeholders'
      );
    });

    it('should return first child asynchronous if no defaultChildNode is set', async () => {
      let pathData = {
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
  });
});
