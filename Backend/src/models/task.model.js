import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true,
        default: ''
    },
    category: {
        type: String,
        required: true,
        trim: true
    },
    status: {
        type: String,
        enum: ['NEW', 'ACTIVE', 'COMPLETED', 'FAILED'],
        default: 'NEW',
        index: true
    },
    dueDate: {
        type: Date,
        required: true
    },
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    },
    assignedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
});

// Compound index or individual index already covered, but let's ensure we have optimized performance.
// The user explicitly requested index on assignedTo and status.
taskSchema.index({ assignedTo: 1, status: 1 });

export const Task = mongoose.model('Task', taskSchema);
