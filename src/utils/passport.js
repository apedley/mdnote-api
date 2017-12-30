import passport from 'passport';
import config from '../../config';
import User from '../models/user';
import passportJwt from 'passport-jwt';
import LocalStrategy from 'passport-local';

import GoogleStrategyOauth from 'passport-google-oauth';
const GoogleStrategy = GoogleStrategyOauth.OAuth2Strategy;

const JwtStrategy = passportJwt.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;

const localOptions = {
  usernameField: 'email'
}

const localLogin = new LocalStrategy(localOptions, (email, password, done) => {
  User.query().where('email', email).first()
    .then(user => {
      if (!user) {
        return done(null, false);
      }

      user.verifyPassword(password)
        .then(results => {
          if (!results) {
            return done(null, false);
          }
          return done(null, user);
        })

    });
});

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.secret
};

const jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => {
  User.query().findById(payload)
    .then(user => {
      if (user) {
        done(null, user);
      } else {
        done(null, false);
      }
    })
    .catch(err => {
      debugger;
      return done(err, false);
    })
})

const googleLogin = new GoogleStrategy({
  clientID: config.google.clientID,
  clientSecret: config.google.clientSecret,
  callbackURL: config.google.callbackURL
}, (token, refreshToken, profile, done) => {
  const email = profile.emails[0].value;

  User.query().where('email', email).first()
    .then(user => {
      // debugger;
      if (!user) {
        return done(null, false);
      }

      const googleData = {
        id: profile.id,
        displayName: profile.displayName,
        token
      };

      if (profile.photos && profile.photos.length > 0) {
        googleData.photo = profile.photos[0].value;
      }


      User.query().patch({google: googleData}).where('email', email)
        .then(patchResults => {
          debugger;
          return done(null, user);
        })
    })
  // debugger;
  // return done(null, { profile: profile, token: token });
});


passport.use(localLogin);
passport.use(jwtLogin);
passport.use(googleLogin);

module.exports = passport;
