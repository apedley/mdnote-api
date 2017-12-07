// const request = require('supertest');
// const app = require('../../src/app').default;
// const util = require('../util');

// describe('Auth controller', () => {
//   const existingUserInfo = {
//     email: 'test123@gmail.com',
//     password: 'test123'
//   }
//   const newUserInfo = {
//     email: 'test124@gmail.com',
//     password: 'test124'
//   }

//   // beforeAll((done) => {
//   //   util.createUser(existingUserInfo).then(done);
//   // });



//   // test('It should sign up', (done) => {
//   //   return request(app).post('/signup').send({ email: 'fake@fake.com', password: 'fake123' }).then(response => {
//   //     expect(response.statusCode).toBe(201);
//   //     done();
//   //   })
//   // });

//   test('It should sign up', async () => {
//     const response = await request(app).post('/signup').send(newUserInfo);

//     expect(response.statusCode).toBe(201);
//   });

//   test('It should give a token with valid credentials', async () => {
//     const response = await request(app).post('/signin').send(newUserInfo);
//     expect(response.body.token).toBeDefined();
//     expect(response.statusCode).toBe(200);
//   })


//   afterAll((done) => {
//     util.resetUsers().then(() => {
//       done();
//     });
//   });
// })
