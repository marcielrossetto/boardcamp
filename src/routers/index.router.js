import { Router } from 'express';
import gameRouter from './game.router.js';
import customerRouter from './customer.router.js';
import rentalRouter from './rental.router.js';

const router = Router();

router.use(gameRouter);
router.use(customerRouter);
router.use(rentalRouter);

export default router;