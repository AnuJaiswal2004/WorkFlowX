import React, { useState } from 'react';

const Register = ({ handleRegister, toggleAuthView }) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('employee');
    const [submitting, setSubmitting] = useState(false);

    const submitHandler = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            await handleRegister({ firstName, lastName, email, password, role });
        } finally {
            setSubmitting(false);
        }
    };

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
                            Create your <br />
                            <span className="bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">account today.</span>
                        </h2>
                        <p className="mt-3 text-sm text-gray-400 leading-relaxed">
                            Join the workspace to manage tasks, collaborate with team members, and check real-time progress analytics.
                        </p>
                    </div>

                    <div className="mt-8 relative rounded-xl bg-[#090d1a]/90 p-5 border border-gray-800/80 shadow-inner">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-xs font-semibold text-gray-400">Workspace Stats</span>
                            <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded-full font-medium">Active</span>
                        </div>
                        <div className="space-y-3">
                            <div className="h-2 w-full rounded bg-gray-800/80" />
                            <div className="h-2 w-5/6 rounded bg-gray-800/60" />
                        </div>
                        <div className="mt-5 pt-4 border-t border-gray-900 flex justify-between items-center text-[10px] text-gray-500">
                            <span>Ready to scale</span>
                            <span>v1.0.0</span>
                        </div>
                    </div>
                </aside>

                {/* Right Side: Registration Form Card */}
                <section className="md:col-span-7 flex flex-col justify-center px-4 py-8 md:p-10">
                    <header className="mb-6">
                        <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">Create Account</h1>
                        <p className="mt-2 text-sm text-gray-400">Fill in the fields to join WorkFlowX.</p>
                    </header>

                    <form onSubmit={submitHandler} className="space-y-4" aria-label="Registration form">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="firstName" className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">First Name</label>
                                <input
                                    id="firstName"
                                    type="text"
                                    required
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    className="w-full bg-[#0a0e1a]/60 border border-gray-800 text-white placeholder-gray-600 rounded-xl px-4 py-3 focus:outline-none focus:border-emerald-500/80 focus:ring-4 focus:ring-emerald-500/10 transition-all duration-200 text-sm"
                                    placeholder="Arjun"
                                />
                            </div>
                            <div>
                                <label htmlFor="lastName" className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Last Name</label>
                                <input
                                    id="lastName"
                                    type="text"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    className="w-full bg-[#0a0e1a]/60 border border-gray-800 text-white placeholder-gray-600 rounded-xl px-4 py-3 focus:outline-none focus:border-emerald-500/80 focus:ring-4 focus:ring-emerald-500/10 transition-all duration-200 text-sm"
                                    placeholder="Jaiswal"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Email Address</label>
                            <input
                                id="email"
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-[#0a0e1a]/60 border border-gray-800 text-white placeholder-gray-600 rounded-xl px-4 py-3 focus:outline-none focus:border-emerald-500/80 focus:ring-4 focus:ring-emerald-500/10 transition-all duration-200 text-sm"
                                placeholder="name@company.com"
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Password</label>
                            <input
                                id="password"
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-[#0a0e1a]/60 border border-gray-800 text-white placeholder-gray-600 rounded-xl px-4 py-3 focus:outline-none focus:border-emerald-500/80 focus:ring-4 focus:ring-emerald-500/10 transition-all duration-200 text-sm"
                                placeholder="••••••••"
                            />
                        </div>

                        <div>
                            <label htmlFor="role" className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Choose Role</label>
                            <select
                                id="role"
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                                className="w-full bg-[#0a0e1a]/60 border border-gray-800 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-emerald-500/80 focus:ring-4 focus:ring-emerald-500/10 transition-all duration-200 text-sm appearance-none cursor-pointer"
                            >
                                <option value="employee" className="bg-[#0f1424] text-white">Employee</option>
                                <option value="admin" className="bg-[#0f1424] text-white">Admin</option>
                            </select>
                        </div>

                        <div className="pt-2">
                            <button
                                type="submit"
                                disabled={submitting}
                                className="w-full relative group overflow-hidden bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-medium py-3.5 rounded-xl transition-all duration-300 shadow-lg shadow-emerald-950/20 active:scale-[0.99] disabled:opacity-50 disabled:pointer-events-none cursor-pointer text-sm"
                            >
                                <span className="relative z-10 flex items-center justify-center gap-2">
                                    {submitting ? 'Registering...' : 'Register'}
                                </span>
                            </button>
                        </div>
                    </form>

                    <footer className="mt-6 text-center">
                        <p className="text-sm text-gray-400">
                            Already have an account?{' '}
                            <button
                                onClick={toggleAuthView}
                                className="text-emerald-400 hover:text-emerald-300 font-semibold cursor-pointer transition-colors focus:outline-none"
                            >
                                Sign In
                            </button>
                        </p>
                    </footer>
                </section>
            </main>
        </div>
    );
};

export default Register;
