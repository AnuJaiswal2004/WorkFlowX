import React, { useContext, useState } from 'react';
import Login from './components/Auth/login';
import Register from './components/Auth/Register';
import EmployeeDashboard from './components/DashBoard/Employee';
import AdminDashboard from './components/DashBoard/Admin';
import { AuthContext } from './context/AuthContext';

const App = () => {
    const { user, login, register, logout } = useContext(AuthContext);
    const [isRegisterView, setIsRegisterView] = useState(false);

    const handleLogin = async (email, password) => {
        try {
            await login(email, password);
        } catch (err) {
            alert(err.message || 'Invalid Credentials');
        }
    };

    const handleRegister = async (userData) => {
        try {
            await register(userData);
        } catch (err) {
            alert(err.message || 'Registration failed');
        }
    };

    if (!user) {
        return isRegisterView ? (
            <Register 
                handleRegister={handleRegister} 
                toggleAuthView={() => setIsRegisterView(false)} 
            />
        ) : (
            <Login 
                handleLogin={handleLogin} 
                toggleAuthView={() => setIsRegisterView(true)} 
            />
        );
    }

    return user.role === 'admin' ? (
        <AdminDashboard changeUser={logout} />
    ) : (
        <EmployeeDashboard changeUser={logout} data={user} />
    );
};

export default App;