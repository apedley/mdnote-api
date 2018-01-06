
import User from '../models/user';
import * as Utils from '../utils';

module.exports = {

  deleteSelf(req, res, next) {
    User.query().delete()
      .where('id', req.user.id)
      .then(rowsDeleted => Utils.sendJSON(res, rowsDeleted))
  }
};
