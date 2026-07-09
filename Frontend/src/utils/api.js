const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const getHeaders = () => {
    const token = localStorage.getItem('accessToken');
    const headers = {
        'Content-Type': 'application/json',
    };
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }
    return headers;
};

const handleResponse = async (response) => {
    let data;
    try {
        data = await response.json();
    } catch (err) {
        data = { success: false, message: 'JSON parsing error' };
    }

    if (!response.ok) {
        const errorMsg = data.message || `HTTP error! Status: ${response.status}`;
        const error = new Error(errorMsg);
        error.status = response.status;
        error.errors = data.errors;
        throw error;
    }

    return data;
};

export const api = {
    get: async (endpoint) => {
        const response = await fetch(`${BASE_URL}${endpoint}`, {
            method: 'GET',
            headers: getHeaders(),
        });
        return handleResponse(response);
    },

    post: async (endpoint, body) => {
        const response = await fetch(`${BASE_URL}${endpoint}`, {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify(body),
        });
        return handleResponse(response);
    },

    patch: async (endpoint, body) => {
        const response = await fetch(`${BASE_URL}${endpoint}`, {
            method: 'PATCH',
            headers: getHeaders(),
            body: JSON.stringify(body),
        });
        return handleResponse(response);
    },

    delete: async (endpoint) => {
        const response = await fetch(`${BASE_URL}${endpoint}`, {
            method: 'DELETE',
            headers: getHeaders(),
        });
        return handleResponse(response);
    },
};
