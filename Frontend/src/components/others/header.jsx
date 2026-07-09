import React from 'react'

const Header = (props) => {
  const username = props.data ? props.data.firstName : 'Admin'

  const logOutUser = ()=>{
    localStorage.setItem('loggedInUser','')
    props.changeUser('')
  }

  return (
    <header className="flex items-center justify-between border-b border-gray-800/40 pb-6">
        <div>
            <h1 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Workspace</h1>
            <p className="text-2xl md:text-3xl font-extrabold text-white mt-1">
                Hello, <span className="bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">{username} 👋</span>
            </p>
        </div>
        <button 
            onClick={logOutUser} 
            className="border border-red-500/20 hover:border-red-500/80 bg-red-500/5 hover:bg-red-600 text-red-400 hover:text-white px-5 py-2 rounded-xl text-sm font-semibold transition-all duration-300 shadow-md shadow-red-900/5 cursor-pointer active:scale-[0.98]"
        >
            Log Out
        </button>
    </header>
  )
}

export default Header