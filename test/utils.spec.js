import * as Utils from '../src/utils/index';

const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
chai.use(sinonChai);

  class MockResponse {
    constructor() {
      this.responseStatus = null;
      this.data = null;
    }

    json(data){
      return {
        status: this.responseStatus,
        json: JSON.stringify(data)
      }
    }

    status(inputStatus) {
      this.responseStatus = inputStatus;
      return this;
    }
  }

describe('Utils helpers', () => {

  it('shoud send JSON with sendJSON', () => {
    const testData = { 'test': 'yes' };
    const testStatus = 200;

    const response = new MockResponse();

    const result = Utils.sendJSON(response, testData, testStatus);

    expect(result.status).to.equal(testStatus);
    expect(result.json).to.equal(JSON.stringify(testData));
  });

  it('shoud send error with sendError', () => {
    const err = 'Test error';
    const code = 124;

    const res = new MockResponse();

    const consoleErrorStub = sinon.stub(console, 'error');

    const output = Utils.sendError(res, err, code);

    expect(output.status).to.equal(code);
    expect(output.json).to.equal(JSON.stringify(err));
    expect(consoleErrorStub).to.have.been.calledWith(err);
    console.error.restore();
  });

});
