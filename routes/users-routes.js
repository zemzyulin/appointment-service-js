import express from 'express';
import { getAll, addOne, getOne, updateOne, deleteOne } from '../controllers/users-controller.js';
import { validateUser } from '../middleware/validation.js';

var router = express.Router();

// user routes
router.get('/', getAll);
router.post('/', addOne);
router.get('/:id', validateUser, getOne);
router.put('/:id', validateUser, updateOne);
router.delete('/:id', validateUser, deleteOne);

export default router;