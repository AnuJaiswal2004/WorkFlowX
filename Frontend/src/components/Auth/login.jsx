import React, { useState } from 'react'

const Login = ({ handleLogin, toggleAuthView }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [submitting, setSubmitting] = useState(false)

    const submitHandler = (e) => {
        e.preventDefault()
        setSubmitting(true)
        try {
            handleLogin(email, password)
        } finally {
            setSubmitting(false)
            setPassword('') // Keep email populated for better UX on failed login
        }
    }

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-[#070b19] p-4 md:p-10 font-sans selection:bg-emerald-500/30 selection:text-emerald-400 relative overflow-hidden">
            {/* Ambient Background Glows */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

            <main className="relative z-10 w-full max-w-5xl grid grid-cols-1 md:grid-cols-12 gap-6 bg-[#0f1424]/40 backdrop-blur-md p-4 md:p-6 rounded-3xl border border-gray-800/60 shadow-2xl">
                
                {/* Left Side: Modern Interactive Showcase Board */}
                <aside className="hidden md:flex md:col-span-5 flex-col justify-between rounded-2xl bg-gradient-to-b from-[#131b31] to-[#0c1122] p-8 border border-gray-800/40 relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    
                    <div>
                        <div className="flex items-center gap-2 mb-8">
                            <div className="h-6 w-6 rounded-lg bg-gradient-to-tr from-emerald-500 to-teal-400 shadow-lg shadow-emerald-500/20" />
                            <span className="text-white font-bold tracking-wider text-sm">WORKFLOWX</span>
                        </div>
                        <h2 className="text-3xl font-extrabold text-white tracking-tight leading-tight">
                            Manage your <br />
                            <span className="bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">workforce smarter.</span>
                        </h2>
                        <p className="mt-3 text-sm text-gray-400 leading-relaxed">
                            A highly intuitive dashboard designed to streamline employee tasks, track performance analytics, and boost overall team productivity.
                        </p>
                    </div>

                    {/* Integrated Mini-Dashboard Mock Widget */}
                    <div className="mt-8 relative rounded-xl bg-[#090d1a]/90 p-5 border border-gray-800/80 shadow-inner">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-xs font-semibold text-gray-400">Team Activity</span>
                            <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded-full font-medium">+12.4%</span>
                        </div>
                        <div className="space-y-3">
                            <div className="h-2 w-3/4 rounded bg-gray-800/80 animate-pulse" />
                            <div className="h-2 w-full rounded bg-gray-800/60 animate-pulse" />
                            <div className="h-2 w-1/2 rounded bg-gray-800/40 animate-pulse" />
                        </div>
                        <div className="mt-5 pt-4 border-t border-gray-900 flex justify-between items-center text-xs text-gray-500">
                            <span>Updated just now</span>
                            <div className="flex gap-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                <span className="w-1.5 h-1.5 rounded-full bg-gray-700" />
                                <span className="w-1.5 h-1.5 rounded-full bg-gray-700" />
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Right Side: Login Form Card */}
                <section className="md:col-span-7 flex flex-col justify-center px-4 py-8 md:p-10">
                    <header className="mb-8">
                        <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">Welcome back</h1>
                        <p className="mt-2 text-sm text-gray-400">Please enter your details to sign in.</p>
                    </header>

                    <form onSubmit={submitHandler} className="space-y-5" aria-label="Login form">
                        <div>
                            <label htmlFor="email" className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Email Address</label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-[#0a0e1a]/60 border border-gray-800 text-white placeholder-gray-600 rounded-xl px-4 py-3.5 focus:outline-none focus:border-emerald-500/80 focus:ring-4 focus:ring-emerald-500/10 transition-all duration-200"
                                placeholder="name@company.com"
                            />
                        </div>

                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <label htmlFor="password" className="block text-xs font-semibold text-gray-400 uppercase tracking-wider">Password</label>
                                <a href="#" className="text-xs text-emerald-400 hover:text-emerald-300 transition-colors">Forgot password?</a>
                            </div>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-[#0a0e1a]/60 border border-gray-800 text-white placeholder-gray-600 rounded-xl px-4 py-3.5 focus:outline-none focus:border-emerald-500/80 focus:ring-4 focus:ring-emerald-500/10 transition-all duration-200"
                                placeholder="••••••••"
                            />
                        </div>

                        <div className="flex items-center pt-1">
                            <label className="inline-flex items-center text-sm text-gray-400 cursor-pointer select-none group">
                                <input 
                                    type="checkbox" 
                                    className="h-4 w-4 text-emerald-500 bg-[#0a0e1a] border border-gray-800 rounded focus:ring-0 focus:ring-offset-0 accent-emerald-500 cursor-pointer transition duration-150 ease-in-out" 
                                />
                                <span className="ml-2 group-hover:text-gray-300 transition-colors">Keep me signed in</span>
                            </label>
                        </div>

                        <div className="pt-2">
                            <button
                                type="submit"
                                disabled={submitting}
                                className="w-full relative group overflow-hidden bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-medium py-3.5 rounded-xl transition-all duration-300 shadow-lg shadow-emerald-900/20 active:scale-[0.99] disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
                            >
                                <span className="relative z-10 flex items-center justify-center gap-2">
                                    {submitting ? (
                                        <>
                                            <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                            </svg>
                                            Signing in...
                                        </>
                                    ) : 'Sign In'}
                                </span>
                            </button>
                        </div>
                    </form>
                    <footer className="mt-6 text-center">
                        <p className="text-sm text-gray-400">
                            Don't have an account?{' '}
                            <button
                                onClick={toggleAuthView}
                                className="text-emerald-400 hover:text-emerald-300 font-semibold cursor-pointer transition-colors focus:outline-none"
                            >
                                Register
                            </button>
                        </p>
                    </footer>
                </section>
            </main>
        </div>
    )
}

export default Login