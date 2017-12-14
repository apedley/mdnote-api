process.env.NODE_ENV = 'test';
import Category from '../../src/models/category';

const request = require('supertest');
const util = require('../testutils');
const chai = require('chai');
const sinon = require('sinon');

const expect = chai.expect;

let user = {
  id: 1,
  email: 'abc123@gmail.com'
};

describe('Notes controller', () => {
  let app;

  before(async () => {
    app = require('../../src/app').default;
  });

  it('GET /notes should get a list of notes', async () => {
    debugger;
    const response = await request(app).get('/notes');
    debugger;
  });
});
