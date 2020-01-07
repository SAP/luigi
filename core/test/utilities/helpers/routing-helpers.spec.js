const sinon = require('sinon');
const chai = require('chai');
const expect = chai.expect;
const assert = chai.assert;
import { GenericHelpers, RoutingHelpers } from '../../../src/utilities/helpers';
import { LuigiConfig } from '../../../src/core-api';
import { Routing } from '../../../src/services/routing';

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
  describe('buildRoute', () => {
    const node = {
      pathSegment: 'one',
      parent: {
        pathSegment: 'projects',
        parent: {
          pathSegment: 'home'
        }
      }
    };
    it('without params', () => {
      assert.equal(
        RoutingHelpers.buildRoute(node, '/' + node.pathSegment),
        '/home/projects/one'
      );
    });
    it('with params', () => {
      const params = 'sort=desc&filter=false';
      assert.equal(
        RoutingHelpers.buildRoute(node, '/' + node.pathSegment, params),
        '/home/projects/one?' + params
      );
    });
  });
  describe('getRouteLink', () => {
    beforeEach(() => {
      sinon.stub(LuigiConfig, 'getConfigBooleanValue');
      sinon.stub(Routing, 'buildFromRelativePath');
      sinon.stub(RoutingHelpers, 'buildRoute');
      sinon.stub(GenericHelpers, 'replaceVars');
    });
    afterEach(() => {
      sinon.restore();
    });
    it('externalLink', () => {
      const expected = { url: 'https://luigi-project.io' };
      const given = {
        externalLink: expected,
        link: 'something',
        pathSegment: 'something-else'
      };

      assert.equal(RoutingHelpers.getRouteLink(given), expected);
    });
    it('when it starts with /', () => {
      const expected = '/projects';
      const given = {
        link: expected,
        pathSegment: 'something-else'
      };

      assert.equal(RoutingHelpers.getRouteLink(given), expected);
      sinon.assert.notCalled(Routing.buildFromRelativePath);
    });
    it('calls build function for relative links', () => {
      const given = {
        link: 'projects',
        pathSegment: 'something-else'
      };
      Routing.buildFromRelativePath.returns(`/${given.link}`);

      assert.equal(RoutingHelpers.getRouteLink(given), '/projects');
      sinon.assert.calledWith(Routing.buildFromRelativePath, given);
    });
    it('on pathSegment calls getRoute and replaceVars', () => {
      const expected = '/projects/something-else';
      const given = {
        pathSegment: 'something-else'
      };

      RoutingHelpers.buildRoute.returns(expected);
      GenericHelpers.replaceVars.returns(expected);

      assert.equal(RoutingHelpers.getRouteLink(given), expected);

      sinon.assert.notCalled(Routing.buildFromRelativePath);
      sinon.assert.calledWith(
        RoutingHelpers.buildRoute,
        given,
        '/' + given.pathSegment
      );
      sinon.assert.calledWith(
        GenericHelpers.replaceVars,
        expected,
        undefined,
        ':',
        false
      );
    });
  });
  describe('getNodeHref', () => {
    beforeEach(() => {
      sinon.stub(LuigiConfig, 'getConfigBooleanValue');
      sinon.stub(RoutingHelpers, 'getRouteLink');
    });
    afterEach(() => {
      sinon.restore();
    });
    it('js:void on falsy config value', () => {
      LuigiConfig.getConfigBooleanValue.returns(false);

      expect(RoutingHelpers.getNodeHref({}, {})).to.equal('javascript:void(0)');
      sinon.assert.notCalled(RoutingHelpers.getRouteLink);
      sinon.assert.calledWith(
        LuigiConfig.getConfigBooleanValue,
        'navigation.addNavHrefs'
      );
    });
    it('returns valid link on url object', () => {
      LuigiConfig.getConfigBooleanValue.returns(true);
      RoutingHelpers.getRouteLink.returns({ url: '/test' });
      expect(RoutingHelpers.getNodeHref({ pathSegment: 'test' }, {})).to.equal(
        '/test'
      );
      sinon.assert.calledOnce(RoutingHelpers.getRouteLink);
    });
    it('returns valid link on string received', () => {
      LuigiConfig.getConfigBooleanValue.returns(true);
      RoutingHelpers.getRouteLink.returns('/test');
      expect(RoutingHelpers.getNodeHref({ pathSegment: 'test' }, {})).to.equal(
        '/test'
      );
      sinon.assert.calledOnce(RoutingHelpers.getRouteLink);
    });
  });
});
