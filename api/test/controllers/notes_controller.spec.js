process.env.NODE_ENV = 'test';
import Category from '../../src/models/category';

const request = require('supertest');
const util = require('../testutils');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');


chai.use(chaiAsPromised);
const expect = chai.expect;

const userInfo = {
  email: 'emn@email.com',
  password: 'abc123',
  id: 1
};

const noteOne = {
  title: 'a note',
  body: 'some body some note'
}

const noteTwo = {
  title: 'note two',
  body: 'another body another note'
}

const notes = [noteOne, noteTwo];

const invalidNote = {
  body: 'a body'
}

describe('Notes controller', () => {
  let app;
  let errorStub;
  let token;
  let noteId;
  let shareUrl;

  before(async () => {
    errorStub = sinon.stub(console, 'error');

    app = require('../../src/app').default;

    const signup = await request(app).post('/signup').send(userInfo);
    const signin = await request(app).post('/signin').send(userInfo);

    token = signin.body.token;
  });

  it('POST /notes should create a note', async() => {
    const response = await request(app).post('/notes').set({'Authorization': `Bearer ${token}`}).send(notes[0]);
    noteId = response.body.id;
    expect(response.statusCode).to.eql(201);
    const responseTwo = await request(app).post('/notes').set({'Authorization': `Bearer ${token}`}).send(notes[1]);
    expect(responseTwo.statusCode).to.eql(201);
  });

  it('POST /notes should not create an invalid note', async() => {
    const response = await request(app).post('/notes').set({'Authorization': `Bearer ${token}`}).send(invalidNote);
    expect(response.statusCode).to.eql(400);
  });

  it('GET /notes should get a list of notes', async () => {
    const response = await request(app).get('/notes').set({'Authorization': `Bearer ${token}`});
    expect(response.body.length).to.eql(2);
    expect(response.statusCode).to.eql(200);
  });

  it('GET /notes/:id should show a note', async() => {
    const response = await request(app).get(`/notes/${noteId}`).set({'Authorization': `Bearer ${token}`});
    expect(response.body.name).to.eql(notes[0].name);
  });

  it('GET /notes/:id should show not show a note that does not exist', async() => {
    const response = await request(app).get(`/notes/923482934`).set({'Authorization': `Bearer ${token}`});
    expect(response.body).to.eql({});
  });

  it('GET /notes/:id should show not show an invalid note', async() => {
    const response = await request(app).get(`/notes/e`).set({'Authorization': `Bearer ${token}`});
    expect(response.statusCode).to.eql(400);
  });

  it('PATCH /notes/:id should update a note', async() => {
    const newTitle = 'newTitle';
    const response = await request(app).patch(`/notes/${noteId}`).set({'Authorization': `Bearer ${token}`}).send({ title: newTitle });
    const responseTwo = await request(app).get(`/notes/${noteId}`).set({'Authorization': `Bearer ${token}`});
    expect(responseTwo.body.title).to.eql(newTitle);
  });

  it('PATCH /notes/:id should not update a note with invalid data', async() => {
    const newTitle = 'newTitle';
    const response = await request(app).patch(`/notes/${noteId}`).set({'Authorization': `Bearer ${token}`}).send({ pizza: newTitle });
    expect(response.statusCode).to.eql(400);
  });

  it('GET /notes/search should search note body and titles', async() => {
    const response = await request(app).get(`/notes/search?q=anoth`).set({'Authorization': `Bearer ${token}`});

    expect(response.statusCode).to.eq(200);
    expect(response.body.length).to.eql(1);
  });

  it('GET /notes/search should return an empty array if no results are found', async() => {
    const response = await request(app).get(`/notes/search?q=quiznos`).set({'Authorization': `Bearer ${token}`});

    expect(response.statusCode).to.eq(200);
    expect(response.body.length).to.eql(0);
  });

  it('GET /notes/search should not search without search string', async() => {
    const response = await request(app).get(`/notes/search`).set({'Authorization': `Bearer ${token}`});

    expect(response.statusCode).to.eq(400);
  });

  it('POST /notes/:id/share should create a share from a valid note', async() => {
    const response = await request(app).post(`/notes/${noteId}/share`).set({'Authorization': `Bearer ${token}`});
    expect(response.statusCode).to.eq(201);
    expect(response.body.url).to.exist;

    shareUrl = response.body.url;
  });

  it('POST /notes/:id/share should not create share if note isn not found', async() => {
    const unknown_note_response = await request(app).post(`/notes/${noteId-1}/share`).set({'Authorization': `Bearer ${token}`});
    expect(unknown_note_response.statusCode).to.eq(400);
  });

  it('POST /notes/:id/share should not create share with invalid id', async() => {
    const invalid_response = await request(app).post(`/notes/a/share`).set({'Authorization': `Bearer ${token}`});
    expect(invalid_response.statusCode).to.eq(400);
  });

  it('GET /shared/:url should return share information', async () => {
    const response = await request(app).get(`/shared/${shareUrl}`);
    expect(response.statusCode).to.eq(200);
    expect(response.body.title).to.exist;
  });

  it('GET /shared/:url should not show a share with invalid url', async () => {
    const response = await request(app).get(`/shared/${shareUrl + 'abc'}`);
    expect(response.statusCode).to.eq(400);
    expect(response.body).to.eq('Not found');
  });

  it('DELETE /notes/:id should delete a note', async() => {
    const response = await request(app).get(`/notes`).set({'Authorization': `Bearer ${token}`});
    expect(response.body.length).to.eql(2);
    const responseTwo = await request(app).delete(`/notes/${noteId}`).set({'Authorization': `Bearer ${token}`});
    expect(responseTwo.body).to.eql(noteId + '');
    const responseThree = await request(app).get(`/notes`).set({'Authorization': `Bearer ${token}`});
    expect(responseThree.body.length).to.eql(1);
  });

  it('DELETE /notes/:id should not delete a note that does not exist', async() => {
    const response = await request(app).delete(`/notes/39394823984`).set({'Authorization': `Bearer ${token}`});
    expect(response.statusCode).to.eql(400);
  });



  after(() => {
    errorStub.restore();
  });
});
