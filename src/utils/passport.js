import passport from 'passport';
import config from '../../config';
import User from '../models/user';
import passportJwt from 'passport-jwt';
import LocalStrategy from 'passport-local';

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

    })
    // .catch(err => {
    //   return done(err);
    // })
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
    // .catch(err => {
    //   return done(err, false);
    // })
})

passport.use(localLogin);
passport.use(jwtLogin);
