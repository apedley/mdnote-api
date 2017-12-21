process.env.NODE_ENV = 'test';

const request = require('supertest');
const app = require('../../src/app').default;
const util = require('../testutils');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
chai.use(sinonChai);
chai.use(chaiAsPromised);

const expect = chai.expect;

describe('Other tests', () => {
  describe('Other routes', () => {
    it('POST /unknown', async () => {
      expect( await request(app).get('/noroute') )
        .to.have.property('statusCode', 404);
    });
  });
});
