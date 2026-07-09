import { Task } from '../models/task.model.js';
import mongoose from 'mongoose';

class TaskRepository {
    async create(taskData) {
        const task = new Task(taskData);
        return task.save();
    }

    async findById(id) {
        return Task.findById(id).populate('assignedTo', 'firstName email').populate('assignedBy', 'firstName email');
    }

    async findByEmployee(employeeId) {
        return Task.find({ assignedTo: employeeId }).populate('assignedBy', 'firstName email').sort({ createdAt: -1 });
    }

    async updateStatus(id, status) {
        return Task.findByIdAndUpdate(id, { status }, { new: true, runValidators: true });
    }

    async delete(id) {
        return Task.findByIdAndDelete(id);
    }

    async findAll() {
        return Task.find()
            .populate('assignedTo', 'firstName email')
            .populate('assignedBy', 'firstName email')
            .sort({ createdAt: -1 });
    }

    async getTaskCountsByEmployee(employeeId) {
        const objectId = new mongoose.Types.ObjectId(String(employeeId));
        const aggregations = await Task.aggregate([
            { $match: { assignedTo: objectId } },
            { $group: { _id: '$status', count: { $sum: 1 } } }
        ]);

        const counts = { NEW: 0, ACTIVE: 0, COMPLETED: 0, FAILED: 0 };
        aggregations.forEach(item => {
            if (counts[item._id] !== undefined) {
                counts[item._id] = item.count;
            }
        });
        return counts;
    }

    async getAdminTaskCounts() {
        const aggregations = await Task.aggregate([
            { $group: { _id: '$status', count: { $sum: 1 } } }
        ]);

        const counts = { NEW: 0, ACTIVE: 0, COMPLETED: 0, FAILED: 0 };
        aggregations.forEach(item => {
            if (counts[item._id] !== undefined) {
                counts[item._id] = item.count;
            }
        });
        return counts;
    }
}

export const taskRepository = new TaskRepository();
