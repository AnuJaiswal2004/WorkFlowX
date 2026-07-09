import express from 'express';
import { getAllEmployees, getEmployeeProfile } from '../controllers/user.controller.js';
import { protect } from '../middlewares/auth.middleware.js';
import { authorize } from '../middlewares/role.middleware.js';

const router = express.Router();

// Admin only route to get all employees
router.get('/', protect, authorize('admin'), getAllEmployees);

// View individual employee profile
router.get('/:id', protect, getEmployeeProfile);

export default router;
