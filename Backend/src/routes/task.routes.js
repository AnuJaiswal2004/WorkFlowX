import express from 'express';
import {
    createTask,
    updateTaskStatus,
    getAllTasks,
    getMyTasks,
    getTaskById,
    deleteTask
} from '../controllers/task.controller.js';
import { protect } from '../middlewares/auth.middleware.js';
import { authorize } from '../middlewares/role.middleware.js';
import { validate } from '../middlewares/validate.middleware.js';
import { createTaskSchema, updateTaskStatusSchema } from '../validators/task.validator.js';

const router = express.Router();

// General protect middleware applies to all routes here
router.use(protect);

// Admin-only tasks overview
router.get('/', authorize('admin'), getAllTasks);

// Create task - Admin only
router.post('/', authorize('admin'), validate(createTaskSchema), createTask);

// Get my tasks - Employee only
router.get('/my-tasks', authorize('employee'), getMyTasks);

// Get single task by ID
router.get('/:id', getTaskById);

// Update task status (finite state machine checks apply inside)
router.patch('/:id/status', validate(updateTaskStatusSchema), updateTaskStatus);

// Delete task - Admin only
router.delete('/:id', authorize('admin'), deleteTask);

export default router;
