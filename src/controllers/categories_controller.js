import * as Utils from '../utils';
import Category from '../models/category';

module.exports = {
  list(req, res) {
    Category.query()
      .where('userId', req.user.id)
      .then(categories => Utils.sendJSON(res, categories))
      .catch(error => Utils.sendError(res, error));
  },

  show(req, res) {
    Category.query()
    .where('userId', req.user.id)
    .andWhere('id', req.params.id)
    .first()
    .eager('notes')
    .then(categories => Utils.sendJSON(res, categories))
    .catch(error => Utils.sendError(res, error));
  },

  create(req, res) {
    Category.query().insert({
      name: req.body.name,
      userId: req.user.id
    })
    .then(categories => Utils.sendJSON(res, categories, 201))
    .catch(error => Utils.sendError(res, error));
  },

  delete(req, res) {
    Category.query().delete()
      .where('userId', req.user.id)
      .andWhere('id', req.params.id)
      .then(rowsDeleted => Utils.sendJSON(res, rowsDeleted))
      .catch(error => Utils.sendError(res, error));
  },

  patch(req, res) {
    Category.query().patch(req.body)
      .where('userId', req.user.id)
      .andWhere('id', req.params.id)
      .then(rowsPatched => Utils.sendJSON(res, rowsPatched))
      .catch(error => Utils.sendError(res, error));
  }
}
