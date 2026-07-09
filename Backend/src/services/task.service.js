import { taskRepository } from '../repositories/task.repository.js';
import { userRepository } from '../repositories/user.repository.js';

class TaskService {
    async createTask(adminId, taskData) {
        // Resolve asignTo (first name) to user
        const employees = await userRepository.findAllEmployees();
        const employee = employees.find(
            (emp) => emp.firstName.toLowerCase() === taskData.asignTo.toLowerCase()
        );

        if (!employee) {
            const error = new Error(`Employee with name "${taskData.asignTo}" was not found or is inactive`);
            error.statusCode = 404;
            throw error;
        }

        const task = await taskRepository.create({
            title: taskData.taskTitle,
            description: taskData.taskDescription,
            category: taskData.category,
            dueDate: new Date(taskData.taskDate),
            assignedTo: employee._id,
            assignedBy: adminId,
            status: 'NEW'
        });

        return task;
    }

    async updateTaskStatus(userId, userRole, taskId, targetStatus) {
        const task = await taskRepository.findById(taskId);
        if (!task) {
            const error = new Error('Task not found');
            error.statusCode = 404;
            throw error;
        }

        // Authorization check: Only the assigned employee (or an admin) can update the task
        if (userRole !== 'admin' && String(task.assignedTo._id) !== String(userId)) {
            const error = new Error('You are not authorized to update this task status');
            error.statusCode = 403;
            throw error;
        }

        // Finite State Machine transitions validation
        const currentStatus = task.status;
        const allowedTransitions = {
            'NEW': ['ACTIVE'],
            'ACTIVE': ['COMPLETED', 'FAILED'],
            'COMPLETED': [],
            'FAILED': []
        };

        if (!allowedTransitions[currentStatus].includes(targetStatus)) {
            const error = new Error(`Invalid status transition from ${currentStatus} to ${targetStatus}`);
            error.statusCode = 400;
            throw error;
        }

        const updatedTask = await taskRepository.updateStatus(taskId, targetStatus);
        return updatedTask;
    }

    async getEmployeeTasks(employeeId) {
        return taskRepository.findByEmployee(employeeId);
    }

    async getAllTasks() {
        return taskRepository.findAll();
    }

    async getTaskById(taskId) {
        const task = await taskRepository.findById(taskId);
        if (!task) {
            const error = new Error('Task not found');
            error.statusCode = 404;
            throw error;
        }
        return task;
    }

    async deleteTask(taskId) {
        const task = await taskRepository.findById(taskId);
        if (!task) {
            const error = new Error('Task not found');
            error.statusCode = 404;
            throw error;
        }
        await taskRepository.delete(taskId);
        return { message: 'Task deleted successfully' };
    }
}

export const taskService = new TaskService();
