import User from '../models/user';
import * as Utils from '../utils';
import jwt from 'jwt-simple';
import config from '../../config';

function tokenForUser(user) {
  const secret = config.secret;
  return jwt.encode(user.id, secret);
}

module.exports = {
  signin(req, res, next) {
    const token = tokenForUser(req.user);

    User.query().findById(req.user.id).then(user => {
      const tokens = [ ...user.tokens, token ];

      const responseUser = {
        id: user.id,
        email: user.email
      }
      User.query().patch({tokens}).where('id', req.user.id)
        .then(result => Utils.sendJSON(res, { user: responseUser, token }))
    })
  },

  signup(req, res, next) {
    const email = req.body.email;

    User.query().where('email', email)
      .then(users => {
        if (users.length > 0) {
          return Utils.sendError(res, 'Email already exists', 400);
        }

        User.query().insert({
          email: email,
          password: req.body.password
        })
        .then(user => {
          // const token = tokenForUser(user);
          // Utils.sendJSON(res, { token }, 201);
          return Utils.sendJSON(res, { user }, 201);
        })
      })
  }
}
