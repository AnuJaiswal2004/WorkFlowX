import { taskRepository } from '../repositories/task.repository.js';
import { userRepository } from '../repositories/user.repository.js';

class DashboardService {
    async getEmployeeDashboard(employeeId) {
        const user = await userRepository.findById(employeeId);
        if (!user) {
            const error = new Error('Employee not found');
            error.statusCode = 404;
            throw error;
        }

        const rawCounts = await taskRepository.getTaskCountsByEmployee(employeeId);
        const tasks = await taskRepository.findByEmployee(employeeId);

        // Map database status enums to frontend lowerCamelCase counts keys
        const taskCounts = {
            newTask: rawCounts.NEW || 0,
            active: rawCounts.ACTIVE || 0,
            completed: rawCounts.COMPLETED || 0,
            failed: rawCounts.FAILED || 0
        };

        // Format tasks to support frontend booleans if it still reads them, while passing raw status
        const formattedTasks = tasks.map(t => ({
            id: t._id,
            taskTitle: t.title,
            taskDescription: t.description,
            taskDate: t.dueDate.toISOString().split('T')[0], // YYYY-MM-DD
            category: t.category,
            status: t.status,
            active: t.status === 'ACTIVE',
            newTask: t.status === 'NEW',
            completed: t.status === 'COMPLETED',
            failed: t.status === 'FAILED'
        }));

        return {
            profile: {
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                role: user.role
            },
            taskCounts,
            tasks: formattedTasks
        };
    }

    async getAdminDashboard() {
        const employees = await userRepository.findAllEmployees();
        
        const employeeDataList = [];

        for (const emp of employees) {
            const rawCounts = await taskRepository.getTaskCountsByEmployee(emp._id);
            const tasks = await taskRepository.findByEmployee(emp._id);

            const taskCounts = {
                newTask: rawCounts.NEW || 0,
                active: rawCounts.ACTIVE || 0,
                completed: rawCounts.COMPLETED || 0,
                failed: rawCounts.FAILED || 0
            };

            const formattedTasks = tasks.map(t => ({
                id: t._id,
                taskTitle: t.title,
                taskDescription: t.description,
                taskDate: t.dueDate.toISOString().split('T')[0],
                category: t.category,
                status: t.status,
                active: t.status === 'ACTIVE',
                newTask: t.status === 'NEW',
                completed: t.status === 'COMPLETED',
                failed: t.status === 'FAILED'
            }));

            employeeDataList.push({
                id: emp._id,
                firstName: emp.firstName,
                lastName: emp.lastName,
                email: emp.email,
                role: emp.role,
                taskCounts,
                tasks: formattedTasks
            });
        }

        const globalCountsRaw = await taskRepository.getAdminTaskCounts();
        const globalTaskCounts = {
            newTask: globalCountsRaw.NEW || 0,
            active: globalCountsRaw.ACTIVE || 0,
            completed: globalCountsRaw.COMPLETED || 0,
            failed: globalCountsRaw.FAILED || 0
        };

        return {
            globalTaskCounts,
            employees: employeeDataList
        };
    }
}

export const dashboardService = new DashboardService();
