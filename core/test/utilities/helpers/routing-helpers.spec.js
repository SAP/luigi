const sinon = require('sinon');
const chai = require('chai');
const expect = chai.expect;
const assert = chai.assert;
import { GenericHelpers, RoutingHelpers } from '../../../src/utilities/helpers';
import { LuigiConfig, LuigiFeatureToggles } from '../../../src/core-api';
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

    it('should return first node that has pathSegment defined', async () => {
      mockPathData.navigationPath = [
        {
          pathSegment: 'myPath',
          children: [
            {
              pathSegment: 'pathToHome',
              viewUrl: 'http://site.url/home',
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
        'pathToHome'
      );
    });

    it('should return undefined if at least one of children has no pathsegment defined', async () => {
      mockPathData.navigationPath = [
        {
          pathSegment: 'myPath',
          children: [
            {
              viewUrl: 'http://site.url/home',
              label: 'go back'
            },
            {
              label: 'still no viewUrl'
            },
            {
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
        undefined
      );
    });

    it('should return child that has pathSegment and viewUrl defined', async () => {
      mockPathData.navigationPath = [
        {
          // DOESN'T MATTER
        },
        {
          pathSegment: 'myPath',
          children: [
            {
              pathSegment: 'home',
              viewUrl: 'http://site.url/home',
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
        'home'
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
  describe('set feature toggle from url', () => {
    beforeEach(() => {
      sinon.stub(LuigiFeatureToggles, 'setFeatureToggle');
    });
    afterEach(() => {
      sinon.restore();
    });
    let mockPath = '/projects/pr1/settings?ft=test';
    it('setFeatureToggle will be called', () => {
      RoutingHelpers.setFeatureToggles('ft', mockPath);
      sinon.assert.calledWith(LuigiFeatureToggles.setFeatureToggle, 'test');
    });
    it('setFeatureToggle will be called with two featureToggles', () => {
      mockPath = '/projects/pr1/settings?ft=test,test2';
      RoutingHelpers.setFeatureToggles('ft', mockPath);
      sinon.assert.calledWith(LuigiFeatureToggles.setFeatureToggle, 'test');
      sinon.assert.calledWith(LuigiFeatureToggles.setFeatureToggle, 'test2');
    });
    it("setFeatureToggle won't be called with wrong queryParam name", () => {
      RoutingHelpers.setFeatureToggles('fft', mockPath);
      sinon.assert.notCalled(LuigiFeatureToggles.setFeatureToggle);
    });
  });
});
