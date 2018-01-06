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
  let errorStub;

  beforeEach(() => {
    errorStub = sinon.stub(console, 'error');

  });
  it('shoud send JSON with sendJSON', () => {
    const testData = { 'test': 'yes' };
    const testStatus = 200;

    const response = new MockResponse();

    const result = Utils.sendJSON(response, testData, testStatus);

    expect(result.status).to.equal(testStatus);
    expect(result.json).to.equal(JSON.stringify(testData));
  });

  it('should send error with sendError', () => {
    const err = 'Test error';
    const code = 124;

    const res = new MockResponse();


    const output = Utils.sendError(res, err, code);

    expect(output.status).to.equal(code);
    expect(output.json).to.equal(JSON.stringify(err));
    expect(errorStub).to.have.been.calledWith(err);
  });


  it('should send error with sendError with default 400 status and empty object error', () => {
    const err = 'Test error';

    const res = new MockResponse();


    const output = Utils.sendError(res);

    expect(output.status).to.equal(400);
    expect(output.json).to.equal(JSON.stringify({}));
    expect(errorStub).to.have.been.called;
  });

  afterEach(() => {
    errorStub.restore();
  });

});
