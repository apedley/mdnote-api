import express from 'express';
const router = express.Router();
import notesController from '../controllers/notes_controller';
import passport from 'passport';

// const requireAuth = passport.authenticate('jwt', { session: false });
import requireAuth from './index';

router.post('/', requireAuth, notesController.create);
router.get('/', requireAuth, notesController.list);
router.get('/:id', requireAuth, notesController.show);
router.delete('/:id', requireAuth, notesController.delete);
// router.put('/:id', requireAuth, notesController.update);
router.patch('/:id', requireAuth, notesController.patch);

export default router;
