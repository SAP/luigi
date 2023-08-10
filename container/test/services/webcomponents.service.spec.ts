import { WebComponentService } from '../../src/services/webcomponents.service';

const chai = require('chai');
const expect = chai.expect;
const assert = chai.assert;
const sinon = require('sinon');

describe('Webcomponents Service', () => {
  let service;
  beforeEach(() => {
    service = new WebComponentService();
  });

  it('generateWCId', () => {
    const wcId = service.generateWCId('http://localhost:4200/foo/bar');
    expect(wcId).to.equal('luigi-wc-687474703a2f2f6c6f63616c686f73743a343230302f666f6f2f626172_');
  });
});
