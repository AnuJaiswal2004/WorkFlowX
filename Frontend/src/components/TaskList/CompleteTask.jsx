import React from 'react'

const CompleteTask = ({data}) => {
  return (
    <div className="flex-shrink-0 w-[300px] md:w-[320px] p-6 bg-[#0f1424]/60 backdrop-blur-md border border-gray-800/80 rounded-2xl flex flex-col justify-between hover:border-emerald-500/30 transition-all duration-300 shadow-xl group">
        <div>
            <div className="flex justify-between items-center">
                <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs px-2.5 py-0.5 rounded-full font-semibold">
                    {data.category}
                </span>
                <span className="text-xs text-gray-500 font-medium">{data.taskDate}</span>
            </div>
            <h2 className="mt-5 text-xl font-bold text-white group-hover:text-emerald-300 transition-colors duration-200">
                {data.taskTitle}
            </h2>
            <p className="text-sm text-gray-400 mt-2.5 leading-relaxed">
                {data.taskDescription}
            </p>
        </div>
        <div className="mt-6">
            <div className="w-full text-center bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold py-2 px-3 rounded-xl text-xs flex items-center justify-center gap-1.5">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                </svg>
                Completed
            </div>
        </div>
    </div>
  )
}

export default CompleteTask