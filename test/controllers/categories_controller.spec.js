process.env.NODE_ENV = 'test';
import passport from 'passport';
import Category from '../../src/models/category';

const request = require('supertest');
const util = require('../testutils');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');
const app = require('../../src/app').default;


chai.use(chaiAsPromised);
const expect = chai.expect;

const user = {
  email: 'ema@email.com',
  password: 'abc123',
  id: 1
};


describe('Categories controller', () => {
  let token;

  const userInfo = {
    email: 'abc123@gmail.com',
    password: 'abc123'
  };

  before(async () => {
    const signup = await request(app).post('/signup').send(userInfo);
    const signin = await request(app).post('/signin').send(userInfo);
    token = signin.body.token;
  });

  // it('/GET/categories should get a list of categories', async () => {
  //   expect( await request(app).get('/categories').set({'Authorization': `Bearer ${token}`}) ).to.have.property('statusCode', 200);;
  // })

  it('/GET/categories should get a list of categories', async () => {
    // expect( await request(app).get('/categories').set({'Authorization': `Bearer ${token}`}) ).to.have.property('statusCode', 200);
    const response = await request(app).get('/categories').set({'Authorization': `Bearer ${token}`});
    // console.dir(response.request.user);
    expect(response.statusCode).to.eql(200);
  })
});
