// const request = require('supertest');
// const app = require('../../src/app').default;
// const util = require('../util');

// describe('Recipes resource', () => {
//   beforeAll((done) => {
//     util.setupRecipes()
//       .then(done);
//   });

//   test('It should list recipes', (done) => {
//     return request(app).get('/api/recipes').then(response => {
//       expect(response.statusCode).toBe(200);
//       expect(response.body).toHaveLength(3);
//       done();
//     })
//   });

//   afterAll((done) => {
//     util.resetRecipes()
//       .then(done);
//   });
// })
