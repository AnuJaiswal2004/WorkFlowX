import React, { useState } from 'react';
import { api } from '../../utils/api.js';

const AcceptTask = ({ data, onTaskUpdate }) => {
    const [updating, setUpdating] = useState(false);

    const updateStatus = async (targetStatus) => {
        setUpdating(true);
        try {
            const res = await api.patch(`/tasks/${data.id}/status`, { status: targetStatus });
            if (res.success && onTaskUpdate) {
                onTaskUpdate();
            }
        } catch (err) {
            alert(err.message || `Failed to transition task to ${targetStatus}`);
        } finally {
            setUpdating(false);
        }
    };

    return (
        <div className="flex-shrink-0 w-[300px] md:w-[320px] p-6 bg-[#0f1424]/60 backdrop-blur-md border border-gray-800/80 rounded-2xl flex flex-col justify-between hover:border-amber-500/30 transition-all duration-300 shadow-xl group">
            <div>
                <div className="flex justify-between items-center">
                    <span className="bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs px-2.5 py-0.5 rounded-full font-semibold">
                        {data.category}
                    </span>
                    <span className="text-xs text-gray-500 font-medium">{data.taskDate}</span>
                </div>
                <h2 className="mt-5 text-xl font-bold text-white group-hover:text-amber-300 transition-colors duration-200">
                    {data.taskTitle}
                </h2>
                <p className="text-sm text-gray-400 mt-2.5 leading-relaxed">
                    {data.taskDescription}
                </p>
            </div>
            <div className="flex items-center gap-3 mt-6">
                <button 
                    onClick={() => updateStatus('COMPLETED')}
                    disabled={updating}
                    className="flex-1 bg-emerald-600/15 hover:bg-emerald-600 text-emerald-300 hover:text-white border border-emerald-500/30 hover:border-emerald-500 font-semibold py-2 px-3 rounded-xl text-xs transition-all duration-200 cursor-pointer active:scale-[0.97] disabled:opacity-50"
                >
                    Complete
                </button>
                <button 
                    onClick={() => updateStatus('FAILED')}
                    disabled={updating}
                    className="flex-1 bg-red-600/15 hover:bg-red-600 text-red-300 hover:text-white border border-red-500/30 hover:border-red-500 font-semibold py-2 px-3 rounded-xl text-xs transition-all duration-200 cursor-pointer active:scale-[0.97] disabled:opacity-50"
                >
                    Fail
                </button>
            </div>
        </div>
    );
};

export default AcceptTask;