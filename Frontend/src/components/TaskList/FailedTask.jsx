import React from 'react'

const FailedTask = ({data}) => {
  return (
    <div className="flex-shrink-0 w-[300px] md:w-[320px] p-6 bg-[#0f1424]/60 backdrop-blur-md border border-gray-800/80 rounded-2xl flex flex-col justify-between hover:border-rose-500/30 transition-all duration-300 shadow-xl group">
        <div>
            <div className="flex justify-between items-center">
                <span className="bg-rose-500/10 text-rose-400 border border-rose-500/20 text-xs px-2.5 py-0.5 rounded-full font-semibold">
                    {data.category}
                </span>
                <span className="text-xs text-gray-500 font-medium">{data.taskDate}</span>
            </div>
            <h2 className="mt-5 text-xl font-bold text-white group-hover:text-rose-300 transition-colors duration-200">
                {data.taskTitle}
            </h2>
            <p className="text-sm text-gray-400 mt-2.5 leading-relaxed">
                {data.taskDescription}
            </p>
        </div>
        <div className="mt-6">
            <div className="w-full text-center bg-rose-500/10 text-rose-400 border border-rose-500/20 font-semibold py-2 px-3 rounded-xl text-xs flex items-center justify-center gap-1.5">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                Failed
            </div>
        </div>
    </div>
  )
}

export default FailedTask