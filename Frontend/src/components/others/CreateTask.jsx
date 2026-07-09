import React, { useState } from 'react';
import { api } from '../../utils/api.js';

const CreateTask = ({ onTaskCreated }) => {
    const [taskTitle, setTaskTitle] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [taskDate, setTaskDate] = useState('');
    const [asignTo, setAsignTo] = useState('');
    const [category, setCategory] = useState('');
    const [submitting, setSubmitting] = useState(false);

    const submitHandler = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            await api.post('/tasks', {
                taskTitle,
                taskDescription,
                taskDate,
                category,
                asignTo
            });

            setTaskTitle('');
            setCategory('');
            setAsignTo('');
            setTaskDate('');
            setTaskDescription('');

            if (onTaskCreated) {
                onTaskCreated();
            }
        } catch (err) {
            alert(err.message || 'Failed to assign task');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <section className="bg-[#0f1424]/40 backdrop-blur-md border border-gray-800/60 p-6 md:p-8 rounded-3xl shadow-2xl relative overflow-hidden mt-6">
            <header className="mb-6">
                <h2 className="text-xl font-bold text-white tracking-tight">Create New Task</h2>
                <p className="text-sm text-gray-400 mt-1">Fill out the details to assign a task to your team members.</p>
            </header>

            <form onSubmit={submitHandler} className="grid grid-cols-1 md:grid-cols-12 gap-6 w-full items-start">
                <div className="md:col-span-6 space-y-4">
                    <div>
                        <label htmlFor="taskTitle" className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Task Title</label>
                        <input
                            id="taskTitle"
                            required
                            value={taskTitle}
                            onChange={(e) => setTaskTitle(e.target.value)}
                            className="w-full bg-[#0a0e1a]/60 border border-gray-800 text-white placeholder-gray-600 rounded-xl px-4 py-2.5 focus:outline-none focus:border-emerald-500/80 focus:ring-4 focus:ring-emerald-500/10 transition-all duration-200 text-sm"
                            type="text" 
                            placeholder="Make a UI design"
                        />
                    </div>
                    <div>
                        <label htmlFor="taskDate" className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Due Date</label>
                        <input
                            id="taskDate"
                            required
                            value={taskDate}
                            onChange={(e) => setTaskDate(e.target.value)}
                            className="w-full bg-[#0a0e1a]/60 border border-gray-800 text-white rounded-xl px-4 py-2.5 focus:outline-none focus:border-emerald-500/80 focus:ring-4 focus:ring-emerald-500/10 transition-all duration-200 text-sm scheme-dark" 
                            type="date" 
                        />
                    </div>
                    <div>
                        <label htmlFor="asignTo" className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Assign To</label>
                        <input
                            id="asignTo"
                            required
                            value={asignTo}
                            onChange={(e) => setAsignTo(e.target.value)}
                            className="w-full bg-[#0a0e1a]/60 border border-gray-800 text-white placeholder-gray-600 rounded-xl px-4 py-2.5 focus:outline-none focus:border-emerald-500/80 focus:ring-4 focus:ring-emerald-500/10 transition-all duration-200 text-sm"
                            type="text" 
                            placeholder="Employee first name (e.g. Arjun)" 
                        />
                    </div>
                    <div>
                        <label htmlFor="category" className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Category</label>
                        <input
                            id="category"
                            required
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="w-full bg-[#0a0e1a]/60 border border-gray-800 text-white placeholder-gray-600 rounded-xl px-4 py-2.5 focus:outline-none focus:border-emerald-500/80 focus:ring-4 focus:ring-emerald-500/10 transition-all duration-200 text-sm"
                            type="text" 
                            placeholder="Design, Dev, QA, etc." 
                        />
                    </div>
                </div>

                <div className="md:col-span-6 flex flex-col h-full justify-between">
                    <div className="w-full">
                        <label htmlFor="taskDescription" className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Description</label>
                        <textarea 
                            id="taskDescription"
                            required
                            value={taskDescription}
                            onChange={(e) => setTaskDescription(e.target.value)} 
                            className="w-full h-48 bg-[#0a0e1a]/60 border border-gray-800 text-white placeholder-gray-600 rounded-xl px-4 py-3.5 focus:outline-none focus:border-emerald-500/80 focus:ring-4 focus:ring-emerald-500/10 transition-all duration-200 text-sm resize-none" 
                            placeholder="Provide a detailed description of the task..."
                        />
                    </div>
                    <button 
                        disabled={submitting}
                        className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-semibold py-3.5 rounded-xl transition-all duration-300 shadow-lg shadow-emerald-950/20 active:scale-[0.99] cursor-pointer mt-4 text-sm disabled:opacity-50"
                    >
                        {submitting ? 'Creating Task...' : 'Create Task'}
                    </button>
                </div>
            </form>
        </section>
    );
};

export default CreateTask;