process.env.NODE_ENV = 'test';
import Category from '../../src/models/category';

const request = require('supertest');
const util = require('../testutils');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');


chai.use(chaiAsPromised);
const expect = chai.expect;

const user = {
  email: 'ema@email.com',
  password: 'abc123',
  id: 1
};

describe('Categories controller', () => {
  let token;

  const userInfo = { email: 'abc123@gmail.com', password: 'abc123' };

  const categories = [ { name: 'testcat' }, { name: 'testcat2' } ]
  const invalidCategory = { nam: 'no' };
  let categoryId;
  let errorStub;
  let passportSpy;
  let app;

  before(async () => {
    errorStub = sinon.stub(console, 'error');

    app = require('../../src/app').default;

    const signup = await request(app).post('/signup').send(userInfo);
    const signin = await request(app).post('/signin').send(userInfo);

    token = signin.body.token;
  });

  it('POST /categories should create a category', async() => {
    const response = await request(app).post('/categories').set({'Authorization': `Bearer ${token}`}).send(categories[0]);
    categoryId = response.body.id;
    expect(response.statusCode).to.eql(201);
    const responseTwo = await request(app).post('/categories').set({'Authorization': `Bearer ${token}`}).send(categories[1]);
    expect(responseTwo.statusCode).to.eql(201);
  });

  it('POST /categories should not create an invalid category', async() => {
    const response = await request(app).post('/categories').set({'Authorization': `Bearer ${token}`}).send(invalidCategory);
    expect(response.statusCode).to.eql(400);
  });

  it('GET /categories should get a list of categories', async () => {
    expect( await request(app).get('/categories').set({'Authorization': `Bearer ${token}`}) ).to.have.property('statusCode', 200);
    const response = await request(app).get('/categories').set({'Authorization': `Bearer ${token}`});
    expect(response.body.length).to.eql(2);
    expect(response.statusCode).to.eql(200);
  });

  it('GET /categories/:id should show a category', async() => {
    const response = await request(app).get(`/categories/${categoryId}`).set({'Authorization': `Bearer ${token}`});
    expect(response.body.name).to.eql(categories[0].name);
  });

  it('GET /categories/:id should load notes with category', async() => {
    const newNote = { title: 'a note', body: 'a body', categoryId };
    const newNoteResponse = await request(app).post(`/notes`).set({'Authorization': `Bearer ${token}`}).send(newNote);
    expect(newNoteResponse.statusCode).to.eql(201);
    const response = await request(app).get(`/categories/${categoryId}`).set({'Authorization': `Bearer ${token}`});
    expect(response.body.name).to.eql(categories[0].name);
    expect(response.body.notes).to.be.an('array');
    expect(response.body.notes[0].title).to.eql(newNote.title);
  });

  it('GET /categories/:id should show not show a category that does not exist', async() => {
    const response = await request(app).get(`/categories/923482934`).set({'Authorization': `Bearer ${token}`});
    expect(response.body).to.eql({});
  });

  it('GET /categories/:id should show not show an invalid category', async() => {
    const response = await request(app).get(`/categories/4e4`).set({'Authorization': `Bearer ${token}`});
    expect(response.statusCode).to.eql(400);
  });

  it('PATCH /categories/:id should update a category', async() => {
    const newName = 'newName';
    const response = await request(app).patch(`/categories/${categoryId}`).set({'Authorization': `Bearer ${token}`}).send({ name: newName });
    const responseTwo = await request(app).get(`/categories/${categoryId}`).set({'Authorization': `Bearer ${token}`});
    expect(responseTwo.body.name).to.eql(newName);
  });

  it('PATCH /categories/:id should not update a category with invalid data', async() => {
    const newName = 'newName';
    const response = await request(app).patch(`/categories/${categoryId}`).set({'Authorization': `Bearer ${token}`}).send({ pizza: newName });
    expect(response.statusCode).to.eql(400);
  });

  it('DELETE /categories/:id should delete a category', async() => {
    const response = await request(app).get(`/categories`).set({'Authorization': `Bearer ${token}`});
    expect(response.body.length).to.eql(2);
    const responseTwo = await request(app).delete(`/categories/${categoryId}`).set({'Authorization': `Bearer ${token}`});
    const responseThree = await request(app).get(`/categories`).set({'Authorization': `Bearer ${token}`});
    expect(responseThree.body.length).to.eql(1);
  });

  it('DELETE /categories/:id should not delete a category that does not exist', async() => {
    const response = await request(app).delete(`/categories/39394823984`).set({'Authorization': `Bearer ${token}`});
    expect(response.statusCode).to.eql(400);
  });

  after(() => {
    errorStub.restore();
  });
});
