import express from 'express';
const router = express.Router();
import categoriesController from '../controllers/categories_controller';

import passport from 'passport';

const requireAuth = passport.authenticate('jwt', { session: false });

router.post('/', requireAuth, categoriesController.create);
router.get('/', requireAuth, categoriesController.list);
router.get('/:id', requireAuth, categoriesController.show);
router.delete('/:id', requireAuth, categoriesController.delete);
router.patch('/:id', requireAuth, categoriesController.patch);


// router.post('/', categoriesController.create);
// router.get('/', categoriesController.list);
// router.get('/:id', categoriesController.show);
// router.delete('/:id', categoriesController.delete);
// router.patch('/:id', categoriesController.patch);

export default router;
