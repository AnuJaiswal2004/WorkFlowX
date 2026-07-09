import { taskService } from '../services/task.service.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const createTask = asyncHandler(async (req, res) => {
    const task = await taskService.createTask(req.user._id, req.body);
    res.status(201).json({
        success: true,
        message: 'Task created and assigned successfully',
        data: task
    });
});

export const updateTaskStatus = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    
    const task = await taskService.updateTaskStatus(
        req.user._id,
        req.user.role,
        id,
        status
    );

    res.status(200).json({
        success: true,
        message: `Task status updated to ${status} successfully`,
        data: task
    });
});

export const getAllTasks = asyncHandler(async (req, res) => {
    const tasks = await taskService.getAllTasks();
    res.status(200).json({
        success: true,
        message: 'All tasks retrieved successfully',
        data: tasks
    });
});

export const getMyTasks = asyncHandler(async (req, res) => {
    const tasks = await taskService.getEmployeeTasks(req.user._id);
    res.status(200).json({
        success: true,
        message: 'Tasks retrieved successfully',
        data: tasks
    });
});

export const getTaskById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const task = await taskService.getTaskById(id);
    res.status(200).json({
        success: true,
        message: 'Task details retrieved successfully',
        data: task
    });
});

export const deleteTask = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const result = await taskService.deleteTask(id);
    res.status(200).json({
        success: true,
        message: result.message
    });
});
