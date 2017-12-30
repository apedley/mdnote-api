import express from 'express';
const router = express.Router();
import Authentication from '../controllers/authentication_controller';
import passport from 'passport';

const requireSignin = passport.authenticate('local', { session: false });

router.post('/signin', requireSignin, Authentication.signinWithEmail);
router.post('/signup', Authentication.signupWithEmail);

router.get('/auth/google', passport.authenticate('google', {
  scope: ['https://www.googleapis.com/auth/userinfo.profile', 'https://www.googleapis.com/auth/userinfo.email']
}));

router.get('/auth/google/redirect', passport.authenticate('google', { failureRedirect: '/' }), Authentication.authRedirect);
// router.get('/auth/google/redirect', passport.authenticate('google'), Authentication.authRedirect);
module.exports = router;
