import express from 'express';
const router = express.Router();
import categoriesController from '../controllers/categories_controller';
import passportService from '../utils/passport';
import passport from 'passport';

const requireAuth = passport.authenticate('jwt', { session: false });

router.post('/', requireAuth, categoriesController.create);
router.get('/', requireAuth, categoriesController.list);
router.get('/:id', requireAuth, categoriesController.show);
router.delete('/:id', requireAuth, categoriesController.delete);
router.patch('/:id', requireAuth, categoriesController.patch);

export default router;
