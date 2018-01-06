import express from 'express';
const router = express.Router();
import Authentication from '../controllers/authentication_controller';
import notesController from '../controllers/notes_controller';
import passport from 'passport';

const requireSignin = passport.authenticate('local', { session: false });

router.post('/signin', requireSignin, Authentication.signin);
router.post('/signup', Authentication.signup);

router.get('/shared/:url', notesController.showShared);

// router.post('/auth/google', Authentication.authenticateWithGoogle);
// router.get('/auth/google', Authentication.googleLoginUrl);

module.exports = router;
