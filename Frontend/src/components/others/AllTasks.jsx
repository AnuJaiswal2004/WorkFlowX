import React from 'react';

const AllTask = ({ employees }) => {
    return (
        <section className="bg-[#0f1424]/40 backdrop-blur-md border border-gray-800/60 p-6 md:p-8 rounded-3xl shadow-2xl mt-6">
            <header className="mb-6">
                <h2 className="text-xl font-bold text-white tracking-tight">Team Performance</h2>
                <p className="text-sm text-gray-400 mt-1">Overview of assigned, active, completed, and failed tasks across all employees.</p>
            </header>
            
            <div className="overflow-x-auto">
                <div className="min-w-[600px] space-y-3">
                    {/* Table Header */}
                    <div className="grid grid-cols-5 text-center items-center bg-[#090d1a]/60 border border-gray-800/80 text-gray-400 font-semibold text-xs tracking-wider py-3.5 px-5 rounded-xl">
                        <h2 className="text-left">Employee Name</h2>
                        <h2>New Tasks</h2>
                        <h2>Active Tasks</h2>
                        <h2>Completed</h2>
                        <h2>Failed</h2>
                    </div>

                    {/* Table Body */}
                    <div className="space-y-2.5">
                        {employees && employees.map(function(elem, idx){
                            return (
                                <div key={idx} className="grid grid-cols-5 text-center items-center bg-[#0f1424]/30 border border-gray-800/40 hover:border-gray-700/60 hover:bg-[#0f1424]/50 py-3.5 px-5 rounded-xl transition-all duration-200 shadow-sm group">
                                    <h2 className="text-left font-bold text-white group-hover:text-emerald-300 transition-colors duration-200">
                                        {elem.firstName}
                                    </h2>
                                    <h3 className="font-bold text-blue-400">{elem.taskCounts.newTask}</h3>
                                    <h5 className="font-bold text-amber-400">{elem.taskCounts.active}</h5>
                                    <h5 className="font-bold text-emerald-400">{elem.taskCounts.completed}</h5>
                                    <h5 className="font-bold text-rose-500">{elem.taskCounts.failed}</h5>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AllTask;