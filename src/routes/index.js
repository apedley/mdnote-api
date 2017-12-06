import express from 'express';
const router = express.Router();
import Authentication from '../controllers/authentication_controller';
import passport from 'passport';

const requireSignin = passport.authenticate('local', { session: false });

router.post('/signin', requireSignin, Authentication.signin);
router.post('/signup', Authentication.signup);


module.exports = router;
