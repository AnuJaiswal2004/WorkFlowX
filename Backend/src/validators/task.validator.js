import { z } from 'zod';

export const createTaskSchema = z.object({
    body: z.object({
        taskTitle: z.string().min(1, 'Task title is required').max(100),
        taskDescription: z.string().max(1000).optional().default(''),
        taskDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
            message: 'Due date must be a valid date format (e.g. YYYY-MM-DD)'
        }),
        category: z.string().min(1, 'Category is required').max(50),
        asignTo: z.string().min(1, 'AssignTo (employee name) is required')
    })
});

export const updateTaskStatusSchema = z.object({
    body: z.object({
        status: z.enum(['ACTIVE', 'COMPLETED', 'FAILED'], {
            errorMap: () => ({ message: 'Status must be one of: ACTIVE, COMPLETED, FAILED' })
        })
    }),
    params: z.object({
        id: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid task ID format')
    })
});
