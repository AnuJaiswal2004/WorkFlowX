import React, { createContext, useEffect, useState } from 'react';
import { api } from '../utils/api.js';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const verifyUser = async () => {
            const token = localStorage.getItem('accessToken');
            const storedUser = localStorage.getItem('user');
            
            if (token && storedUser) {
                try {
                    // Quick check if token is still valid
                    const res = await api.get('/auth/me');
                    if (res.success) {
                        setUser(res.data);
                    } else {
                        handleLocalLogout();
                    }
                } catch (err) {
                    console.error('Session verification failed, logging out locally', err);
                    handleLocalLogout();
                }
            }
            setLoading(false);
        };
        verifyUser();
    }, []);

    const handleLocalLogout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
        setUser(null);
    };

    const login = async (email, password) => {
        const res = await api.post('/auth/login', { email, password });
        if (res.success && res.data) {
            localStorage.setItem('accessToken', res.data.accessToken);
            localStorage.setItem('refreshToken', res.data.refreshToken);
            localStorage.setItem('user', JSON.stringify(res.data.user));
            setUser(res.data.user);
            return res.data.user;
        }
        throw new Error(res.message || 'Login failed');
    };

    const register = async (userData) => {
        const res = await api.post('/auth/register', userData);
        if (res.success && res.data) {
            localStorage.setItem('accessToken', res.data.accessToken);
            localStorage.setItem('refreshToken', res.data.refreshToken);
            localStorage.setItem('user', JSON.stringify(res.data.user));
            setUser(res.data.user);
            return res.data.user;
        }
        throw new Error(res.message || 'Registration failed');
    };

    const logout = async () => {
        const refreshToken = localStorage.getItem('refreshToken');
        try {
            await api.post('/auth/logout', { refreshToken });
        } catch (err) {
            console.error('Logout error on backend', err);
        } finally {
            handleLocalLogout();
        }
    };

    return (
        <AuthContext.Provider value={{ user, setUser, login, logout, register, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;