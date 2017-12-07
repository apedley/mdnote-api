const util = require('../util');
const knex = require('../../db/knex');
const User = require('../../src/models/user');
const objection = require('objection');
const Model = objection.Model;
const expect = require('chai').expect;

Model.knex(knex);
describe('User Model', () => {
  const validUserData = {
    email: 'ema@email.com',
    password: 'abc123'
  }

  let userId;

  before(() => {

  });

  it('should create a user', async () => {
    const res = await User.query().insert(validUserData);
    expect(res.email).to.equal(validUserData.email);
    userId = res.id;
  })
})
// describe('User Model', () => {
//   const validUserData = {
//     email: 'ema@email.com',
//     password: 'abc123'
//   }

//   let userId;

//   test('It should create a user', (done) => {
//     User.query().insert(validUserData).then( results => {
//       expect(results.email).toBe(validUserData.email);
//       userId = results.id;
//       done();
//     });
//   });

//   test('It should hash the password', (done) => {
//     User.query().insert(validUserData).then( results => {
//       expect(results.password).not.toBe(validUserData.password);
//       done();
//     });
//   })

//   test('It should add timestamps on creation', (done) => {
//     User.query().insert(validUserData).then( results => {
//       expect(results.updated_at).not.toBeNull();
//       expect(results.created_at).not.toBeNull();
//       done();
//     });
//   });

//   test('It should update timestamps on update', (done) => {
//     User.query().patchAndFetchById(userId, { email: 'another@gmail.com', password: validUserData.password })
//       .then(updated => {
//         expect(updated.updated_at).not.toBe(updated.created_ad);
//         done();
//       })
//   })

//   afterAll((done) => {
//     util.resetUsers().then(() => {
//       knex.destroy(done)
//     });
//   });


// })

