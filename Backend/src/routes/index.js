import express from 'express';
import authRoutes from './auth.routes.js';
import userRoutes from './user.routes.js';
import taskRoutes from './task.routes.js';
import dashboardRoutes from './dashboard.routes.js';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/tasks', taskRoutes);
router.use('/dashboard', dashboardRoutes);

export default router;
