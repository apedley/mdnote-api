import jwt from 'jwt-simple';
import moment from 'moment';
import bcrypt from 'bcryptjs';

import User from '../models/user';
import * as Utils from '../utils';
import config from '../../config';
// import googleapis from 'googleapis';

// const OAuth2 = googleapis.auth.OAuth2;

// const oauth2Client = new OAuth2(
//   config.google.clientId,
//   config.google.clientSecret,
//   config.google.redirectUrl
// );

function tokenForUser(user) {
  const secret = config.secret;

  const payload = {
    exp: moment().add(7, 'days').unix(),
    iat: moment().unix(),
    sub: user.id,
  }

  return jwt.encode(payload, secret);
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
    const salt = bcrypt.genSaltSync();
    const hash = bcrypt.hashSync(req.body.password, salt);
    User.query().where('email', email)
      .then(users => {
        if (users.length > 0) {
          return Utils.sendError(res, 'Email already exists', 400);
        }

        User.query().insert({
          email: email,
          password: hash
        })
        .then(user => {
          const token = tokenForUser(user);
          Utils.sendJSON(res, {
            user: {
              id: user.id,
              email: user.email
            },
            token
          } , 201);
          // return Utils.sendJSON(res, { user }, 201);
        })
      })
  },


  // googleLoginUrl(req, res, next) {
  //   const scopes = [
  //     'https://www.googleapis.com/auth/userinfo.profile',
  //     'https://www.googleapis.com/auth/plus.me'
  //   ];

  //   var url = oauth2Client.generateAuthUrl({
  //     access_type: 'online',
  //     scope: scopes,
  //   });

  //   Utils.sendJSON(res, { url });
  // },

  // authenticateWithGoogle(req, res, next) {
  //   if (!req.body || !req.body.code) {
  //     return Utils.sendError(res, 'Code is required.');
  //   }

  //   const code = req.body.code;

  //   oauth2Client.getToken(code, function (err, tokens) {
  //     if (tokens && tokens.access_token) {
  //       Utils.sendJSON(res, { token: tokens.access_token })
  //     }
  //   });

  // }
}
