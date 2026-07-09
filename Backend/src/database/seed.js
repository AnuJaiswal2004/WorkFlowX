import mongoose from 'mongoose';
import { User } from '../models/user.model.js';
import { Task } from '../models/task.model.js';
import { connectDB } from './db.js';
import { logger } from '../utils/logger.js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../../.env') });

const seedUsers = [
    { firstName: 'Admin', email: 'admin@example.com', password: '123', role: 'admin' },
    { firstName: 'Arjun', email: 'e@e.com', password: '123', role: 'employee' },
    { firstName: 'Sneha', email: 'employee2@example.com', password: '123', role: 'employee' },
    { firstName: 'Ravi', email: 'employee3@example.com', password: '123', role: 'employee' },
    { firstName: 'Priya', email: 'employee4@example.com', password: '123', role: 'employee' },
    { firstName: 'Karan', email: 'employee5@example.com', password: '123', role: 'employee' }
];

const seedTasks = [
    {
        title: 'Update website',
        description: 'Revamp the homepage design',
        dueDate: new Date('2026-10-12'),
        category: 'Design',
        status: 'NEW',
        assignedToEmail: 'e@e.com'
    },
    {
        title: 'Client meeting',
        description: 'Discuss project requirements',
        dueDate: new Date('2026-10-10'),
        category: 'Meeting',
        status: 'COMPLETED',
        assignedToEmail: 'e@e.com'
    },
    {
        title: 'Fix bugs',
        description: 'Resolve bugs reported in issue tracker',
        dueDate: new Date('2026-10-14'),
        category: 'Development',
        status: 'ACTIVE',
        assignedToEmail: 'e@e.com'
    },
    {
        title: 'Database optimization',
        description: 'Optimize queries for better performance',
        dueDate: new Date('2026-10-11'),
        category: 'Database',
        status: 'ACTIVE',
        assignedToEmail: 'employee2@example.com'
    },
    {
        title: 'Design new feature',
        description: 'Create mockups for the new feature',
        dueDate: new Date('2026-10-09'),
        category: 'Design',
        status: 'COMPLETED',
        assignedToEmail: 'employee2@example.com'
    }
];

const runSeed = async () => {
    try {
        await connectDB();

        logger.info('Starting database seeding...');

        // 1. Seed Users
        const emailToUserMap = {};
        for (const u of seedUsers) {
            let user = await User.findOne({ email: u.email });
            if (!user) {
                user = new User(u);
                await user.save();
                logger.info(`Seeded User: ${u.firstName} (${u.email})`);
            } else {
                logger.info(`Skipped User (already exists): ${u.firstName} (${u.email})`);
            }
            emailToUserMap[u.email] = user;
        }

        // Get admin user for assignment
        const adminUser = await User.findOne({ role: 'admin' });
        if (!adminUser) {
            throw new Error('Admin user was not seeded/found.');
        }

        // 2. Seed Tasks
        for (const t of seedTasks) {
            const assignedUser = emailToUserMap[t.assignedToEmail];
            if (!assignedUser) {
                logger.warn(`Could not assign task "${t.title}" - user ${t.assignedToEmail} not found`);
                continue;
            }

            const existingTask = await Task.findOne({
                title: t.title,
                assignedTo: assignedUser._id
            });

            if (!existingTask) {
                const newTask = new Task({
                    title: t.title,
                    description: t.description,
                    dueDate: t.dueDate,
                    category: t.category,
                    status: t.status,
                    assignedTo: assignedUser._id,
                    assignedBy: adminUser._id
                });
                await newTask.save();
                logger.info(`Seeded Task: "${t.title}" assigned to ${assignedUser.firstName}`);
            } else {
                logger.info(`Skipped Task (already exists): "${t.title}" for ${assignedUser.firstName}`);
            }
        }

        logger.info('Database seeding completed successfully.');
        process.exit(0);
    } catch (err) {
        logger.error(`Database seeding failed: ${err.message}`);
        process.exit(1);
    }
};

runSeed();
