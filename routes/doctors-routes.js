import express from 'express';
import { getAll, addOne, getOne, updateOne, deleteOne } from '../controllers/doctors-controller.js';
import { validateDoctor } from '../middleware/validation.js';

var router = express.Router();

// doctor routes
router.get('/', getAll);
router.post('/', addOne);
router.get('/:id', validateDoctor, getOne);
router.put('/:id', validateDoctor, updateOne);
router.delete('/:id', validateDoctor, deleteOne);

export default router;