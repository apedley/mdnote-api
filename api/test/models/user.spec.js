const util = require('../testutils');
const knex = require('../../db/knex');

import User from '../../src/models/user';
const objection = require('objection');
const Model = objection.Model;
const expect = require('chai').expect;

Model.knex(knex);

describe('User Model', () => {
  const validUserData = {
    email: 'ema@email.com',
    password: 'abc123',
    tokens: []
  }

  let userId;

  before(() => {

  });

  it('should create a user', async () => {
    const res = await User.query().insert(validUserData);
    expect(res.email).to.equal(validUserData.email);
    userId = res.id;
  });

  it('should add timestamps on creation', async () => {
    const res = await User.query().insert(validUserData);
    expect(res.created_at).to.not.be.null;
  });

  it('should update timestamps on patch', async () => {
    const res = await User.query().patchAndFetchById(userId, { email: 'another@gmail.com', password: validUserData.password });

    expect(res.updated_at).to.not.equal(res.created_at);
  });

  after( (done) => {
    // util.resetUsers().then(() => {
    knex.destroy(done);
    // }).catch(err => {
      // knex.destroy(done);
    //   console.log(err);
    //   done();
    // })
  })
});
