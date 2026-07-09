import React from 'react'

const TaskListNumbers = ({data}) => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mt-8">
        
        {/* New Tasks Card */}
        <div className="bg-[#0f1424]/40 backdrop-blur-md border border-gray-800/60 p-6 rounded-2xl flex flex-col justify-between hover:border-blue-500/20 hover:bg-[#0f1424]/60 transition-all duration-300 shadow-lg group">
            <h2 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300 origin-left">
                {data?.taskCounts?.newTask || 0}
            </h2>
            <h3 className="text-xs md:text-sm font-semibold text-gray-400 uppercase tracking-wider mt-4">
                New Tasks
            </h3>
        </div>

        {/* Completed Tasks Card */}
        <div className="bg-[#0f1424]/40 backdrop-blur-md border border-gray-800/60 p-6 rounded-2xl flex flex-col justify-between hover:border-emerald-500/20 hover:bg-[#0f1424]/60 transition-all duration-300 shadow-lg group">
            <h2 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300 origin-left">
                {data?.taskCounts?.completed || 0}
            </h2>
            <h3 className="text-xs md:text-sm font-semibold text-gray-400 uppercase tracking-wider mt-4">
                Completed
            </h3>
        </div>

        {/* Accepted (Active) Tasks Card */}
        <div className="bg-[#0f1424]/40 backdrop-blur-md border border-gray-800/60 p-6 rounded-2xl flex flex-col justify-between hover:border-amber-500/20 hover:bg-[#0f1424]/60 transition-all duration-300 shadow-lg group">
            <h2 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-amber-400 to-yellow-400 bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300 origin-left">
                {data?.taskCounts?.active || 0}
            </h2>
            <h3 className="text-xs md:text-sm font-semibold text-gray-400 uppercase tracking-wider mt-4">
                Active Tasks
            </h3>
        </div>

        {/* Failed Tasks Card */}
        <div className="bg-[#0f1424]/40 backdrop-blur-md border border-gray-800/60 p-6 rounded-2xl flex flex-col justify-between hover:border-rose-500/20 hover:bg-[#0f1424]/60 transition-all duration-300 shadow-lg group">
            <h2 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-rose-400 to-red-400 bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300 origin-left">
                {data?.taskCounts?.failed || 0}
            </h2>
            <h3 className="text-xs md:text-sm font-semibold text-gray-400 uppercase tracking-wider mt-4">
                Failed Tasks
            </h3>
        </div>

    </div>
  )
}

export default TaskListNumbers