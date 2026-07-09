import React, { useEffect, useState } from 'react';
import Header from '../others/header';
import TaskListNumbers from '../others/TaskNumbers';
import TaskList from '../TaskList/TaskList';
import { api } from '../../utils/api.js';

const EmployeeDashboard = (props) => {
    const [dashboardData, setDashboardData] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchDashboardData = async () => {
        try {
            const res = await api.get('/dashboard');
            if (res.success && res.data) {
                setDashboardData(res.data);
            }
        } catch (err) {
            console.error('Failed to retrieve employee dashboard tasks', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDashboardData();
    }, []);

    return (
        <div className="min-h-screen w-full bg-[#070b19] text-white p-6 md:p-10 relative overflow-hidden font-sans selection:bg-emerald-500/30 selection:text-emerald-400">
            {/* Ambient Background Glows */}
            <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-600/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="relative z-10 max-w-7xl mx-auto space-y-8">
                <Header changeUser={props.changeUser} data={props.data} />
                {loading ? (
                    <div className="text-center py-10 text-gray-500">Loading workspace tasks...</div>
                ) : (
                    <>
                        <TaskListNumbers data={dashboardData} />
                        <TaskList data={dashboardData} onTaskUpdate={fetchDashboardData} />
                    </>
                )}
            </div>
        </div>
    );
};

export default EmployeeDashboard;