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

describe('Auth controller', () => {
  const existingUserInfo = {
    email: 'test123@gmail.com',
    password: 'test123'
  };

  const newUserInfo = {
    email: 'test124@gmail.com',
    password: 'test124'
  };

  before(() => {});

  describe('Signing and logging in', () => {

    let errorStub;

    before(() => {
      errorStub = sinon.stub(console, 'error');

    });

    it('POST /signup should sign up user', async () => {
      expect( await request(app).post('/signup').send(newUserInfo) )
        .to.have.property('statusCode', 201);
    });

    it('POST /signup should not sign up user with a taken email', async () => {

      expect( await request(app).post('/signup')
        .send({email: newUserInfo.email, password: newUserInfo.password + 'abc'}) )
        .to.have.property('statusCode', 400);
      expect(errorStub).to.have.been.calledWith('Email already exists');
    });

    it('POST /signin should give a token with valid credentials', async () => {
      const response = await request(app).post('/signin').send(newUserInfo);

      expect(response.body.token).to.not.be.undefined;
      expect(response.statusCode).to.equal(200);
    });

    it('POST /signin should not give a token with invalid email', async () => {
      const response = await request(app).post('/signin')
        .send({
          email: newUserInfo.email,
          password: newUserInfo.password + 'a'
        });

      expect(response.body.token).to.be.undefined;
      expect(response.statusCode).to.equal(401);
    });

    it('POST /signin should not give a token with invalid password', async () => {
      const response = await request(app).post('/signin')
        .send({
          email: 'a' + newUserInfo.email,
          password: newUserInfo.password
        });

      expect(response.body.token).to.be.undefined;
      expect(response.statusCode).to.equal(401);
    });


  after(() => {
      errorStub.restore();
    });
  });

  describe('Authentication', () => {
    let token;

    before( () => {
      return request(app).post('/signin').send(newUserInfo)
        .then( response => {
          token = response.body.token;
        })
    })

    it('should deny access to a protected route with an incorrect token', async () => {
      expect( await request(app).get('/categories') )
        .to.have.property('statusCode', 401);
    });


    it('should allow access to protected route with a correct token', async () => {
      expect( await request(app).get('/categories').set({'Authorization': `Bearer ${token}`}))
        .to.have.property('statusCode', 200);
    })

    it('should deny access after user has been deleted', async () => {
      const delete_response = await request(app).delete('/users/self').set({'Authorization': `Bearer ${token}`});

      expect (delete_response.statusCode).to.be.eql(200);

      expect( await request(app).get('/categories').set({'Authorization': `Bearer ${token}`}))
        .to.have.property('statusCode', 401);
    });
  });

  after(async () => {

    await util.resetUsers();
  });
});
