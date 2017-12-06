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
    res.send({ token: tokenForUser(req.user) });
  },
  signup(req, res, next) {
    const email = req.body.email;

    User.query().where('email', email)
      .then(users => {
        if (users.length > 0) {
          return Utils.sendError(res, 'Email already exists', 422);
        }

        User.query().insert({
          email: email,
          password: req.body.password
        })
        .then(user => {
          console.log('user');
          console.dir(user);
          Utils.sendJSON(res, { token: tokenForUser(user) }, 201)
        })
        .catch(error => Utils.sendError(res, error));
      })
      .catch(error => Utils.sendError(res, error));
  }
}
