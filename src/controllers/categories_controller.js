var knex = require('../../db/knex');
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
    .eager('notes')
    .then(categories => Utils.sendJSON(res, categories))
    .catch(error => Utils.sendError(res, error));
  },

  create(req, res) {
    Category.query().insert({
      name: req.body.name,
      userId: req.user.id
    })
    .then(categories => Utils.sendJSON(res, categories))
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
  },

  // listIngredients(req, res) {
  //   Recipe.query().eager('ingredients').findById(req.params.id)
  //     .then(recipe => Utils.sendJSON(res, recipe.ingredients))
  //     .catch(error => Utils.sendError(res, error));
  // },

  // addIngredient(req, res) {
  //   const amount = req.body.amount || 0;
  //   Recipe.query().where('id', req.params.id).first().then(recipe => {
  //     return recipe.$relatedQuery('ingredients').relate({
  //       id: req.body.ingredientId,
  //       amount: amount
  //     });
  //   })
  //   .then(() => Utils.sendJSON(res, {}, 201))
  //   .catch(error => Utils.sendError(res, error));
  // },

  // removeIngredient(req, res) {
  //   Recipe.query().where('id', req.params.id).first().then(recipe => {
  //     return recipe.$relatedQuery('ingredients').unrelate().where('id', req.params.ingredientId);
  //   })
  //   .then(() => Utils.sendJSON(res, {}, 200))
  //   .catch(error => Utils.sendError(res, error));
  // }
}
