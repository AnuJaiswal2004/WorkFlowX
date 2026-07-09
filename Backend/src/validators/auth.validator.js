import { z } from 'zod';

export const loginSchema = z.object({
    body: z.object({
        email: z.string().email('Please enter a valid email address'),
        password: z.string().min(1, 'Password is required')
    })
});

export const registerSchema = z.object({
    body: z.object({
        firstName: z.string().min(1, 'First name is required').max(50),
        lastName: z.string().max(50).optional(),
        email: z.string().email('Please enter a valid email address'),
        password: z.string().min(6, 'Password must be at least 6 characters long'),
        role: z.enum(['admin', 'employee']).optional()
    })
});
