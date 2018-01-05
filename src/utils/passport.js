import passport from 'passport';
import config from '../../config';
import User from '../models/user';
import passportJwt from 'passport-jwt';
import LocalStrategy from 'passport-local';
// import PassportGoogle from 'passport-google-oauth';

// const GoogleOAuth2Strategy = PassportGoogle.OAuth2Strategy;
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

  User.query().findById(payload.sub)
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

// const googleStrategy = new GoogleOAuth2Strategy({
//   clientID: config.google.clientId,
//   clientSecret: config.google.clientSecret,
//   callbackURL: config.google.redirectUrl
// }, (accessToken, refreshToken, profile, done) => {
//   const email = profile.emails[0];

//   User.query().where('email', email).first()
//     .then(user => {
//       debugger;
//     })
// })

passport.use(localLogin);
passport.use(jwtLogin);
