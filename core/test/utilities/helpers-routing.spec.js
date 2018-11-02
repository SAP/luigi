import { getDefaultChildNode } from '../../src/utilities/helpers-routing';
const chai = require('chai');
const assert = chai.assert;

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

  it('should return first child if no defaultChildNode is set', () => {
    let pathData = getPathData();

    assert.equal(getDefaultChildNode(pathData), 'stakeholders');
  });

  it('should return child with pathSegment equal to defaultChildNode', () => {
    let pathData = getPathData();
    pathData.navigationPath[1].defaultChildNode = 'customers';

    assert.equal(getDefaultChildNode(pathData), 'customers');
  });

  it('should return first child if given defaultChildNode does not exist', () => {
    const pathData = getPathData();
    pathData.navigationPath[1].defaultChildNode = 'NOSUCHPATH';

    assert.equal(getDefaultChildNode(pathData), 'stakeholders');
  });
});
