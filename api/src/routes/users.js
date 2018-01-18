import express from 'express';
const router = express.Router();
import usersController from '../controllers/users_controller';

import passport from 'passport';

const requireAuth = passport.authenticate('jwt', { session: false });

router.delete('/self', requireAuth, usersController.deleteSelf);
export default router;
