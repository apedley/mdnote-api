import * as Utils from '../utils';
import Note from '../models/note';
import Category from '../models/category';
import Share from '../models/share';
import shortid from 'shortid';

module.exports = {
  list(req, res) {
    Note.query().where('userId', req.user.id)
    .eager('category')
    .then(notes => Utils.sendJSON(res, notes));
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
    .then(note => Utils.sendJSON(res, note, 201))
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
  },

  searchText(req, res) {
    const searchString = req.query.q;

    if (!searchString) {
      return Utils.sendError(res, 'Search string required');
    }

    // Postgres requires & instead of spaces between terms
    const sanitizedString = searchString.replace(/\ /g, '&');

    const sql = `SELECT * FROM notes WHERE "noteText" @@ '${sanitizedString}' AND "userId"=${req.user.id}`;

    // console.log('SQL: ' + sql);

    Note.raw(sql)
      .then(results => {
        let notes;

        if (results.rowCount < 1) {
          notes = [];
        } else {
          notes = results.rows;
        }
        Utils.sendJSON(res, notes);
      })
  },

  createShare(req, res) {
    const noteId = parseInt(req.params.id, 10);

    if (!noteId) {
      return Utils.sendError(res, 'noteId is required');
    }

    const url = shortid.generate();
    const share = {
      userId: req.user.id,
      noteId,
      url
    }

    Note.query()
    .where('userId', req.user.id)
    .andWhere('id', req.params.id)
    .first()
    .then(note => {

      share.title = note.title;
      share.body = note.body;

      return Share.query().insert(share)
        .then(share => Utils.sendJSON(res, share, 201))
        .catch(error => Utils.sendError(res, error));

    })
    .catch(error => Utils.sendError(res, error));
  },

  showShared(req, res) {
    Share.query()
      .where('url', req.params.url)
      .first()
      .then(share => {

        if (!share) {
          return Utils.sendError(res, 'Not found');
        }
        return Share.query()
        .where('id', share.id)
        .patch({ views: share.views + 1 })
        .then(incremented => {

          Utils.sendJSON(res, share);
        })
      });

    // })
    // .catch(error => Utils.sendError(res, error));

  }
}
