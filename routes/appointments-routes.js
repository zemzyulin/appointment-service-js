import express from 'express';
import { getAll, addOne, getOne, deleteOne } from '../controllers/appointments-controller.js';
import { validateUser, validateDoctor, validateAppointment } from '../middleware/validation.js';

var router = express.Router();

// appointments routes
router.get('/', getAll);
router.post('/', validateUser, validateDoctor, addOne);
router.get('/:id', validateAppointment, getOne);
router.delete('/:id', validateAppointment, deleteOne);

export default router;