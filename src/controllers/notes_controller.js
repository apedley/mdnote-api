import * as Utils from '../utils';
import Note from '../models/note';
import Category from '../models/category';

module.exports = {
  list(req, res) {
    Note.query().where('userId', req.user.id)
    .eager('category')
    .then(notes => Utils.sendJSON(res, notes))
    .catch(error => Utils.sendError(res, error));
  },

  show(req, res) {
    Note.query()
    .where('userId', req.user.id)
    .andWhere('id', req.params.id)
    .first()
    .then(note => {
      Utils.sendJSON(res, note)
    })
    .catch(error => Utils.sendError(res, error));
  },

  create(req, res) {
    Note.query().insert({
      title: req.body.title,
      body: req.body.body,
      userId: req.user.id,
      categoryId: req.body.categoryId
    })
    .then(note => Utils.sendJSON(res, note))
    .catch(error => Utils.sendError(res, error));
  },

  delete(req,res){
    Note.query().delete()
    .where('userId', req.user.id)
    .andWhere('id', req.params.id)
    .then(rowsDeleted => Utils.sendJSON(res, rowsDeleted))
    .catch(error => Utils.sendError(res, error));
  },
  patch(req, res) {
    Note.query().patchAndFetchById(req.params.id, req.body)
      .where('userId', req.user.id)
      .then(note => Utils.sendJSON(res, note))
      .catch(error => Utils.sendError(res, error));
  }
  // patch(req, res) {
  //   Note.query().patch(req.body)
  //     .where('userId', req.user.id)
  //     .andWhere('id', req.params.id)
  //     .then(rowsPatched => Utils.sendJSON(res, rowsPatched))
  //     .catch(error => Utils.sendError(res, error));
  // }
}
