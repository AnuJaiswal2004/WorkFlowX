import { authService } from '../services/auth.service.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const register = asyncHandler(async (req, res) => {
    const result = await authService.register(req.body);

    res.cookie('refreshToken', result.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    res.status(201).json({
        success: true,
        message: 'Registration successful',
        data: {
            user: result.user,
            accessToken: result.accessToken,
            refreshToken: result.refreshToken
        }
    });
});

export const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const result = await authService.login(email, password);

    // Set refresh token as httpOnly cookie (optional but highly recommended for security)
    res.cookie('refreshToken', result.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    res.status(200).json({
        success: true,
        message: 'Login successful',
        data: {
            user: result.user,
            accessToken: result.accessToken,
            refreshToken: result.refreshToken // also return in body for flex/local storage integration
        }
    });
});

export const logout = asyncHandler(async (req, res) => {
    const token = req.body.refreshToken || req.cookies?.refreshToken;
    if (token) {
        await authService.logout(token);
    }
    
    res.clearCookie('refreshToken');
    res.status(200).json({
        success: true,
        message: 'Logged out successfully'
    });
});

export const refresh = asyncHandler(async (req, res) => {
    const token = req.body.refreshToken || req.cookies?.refreshToken;
    if (!token) {
        const error = new Error('Refresh token is required');
        error.statusCode = 400;
        throw error;
    }

    const result = await authService.refresh(token);
    res.status(200).json({
        success: true,
        message: 'Token refreshed successfully',
        data: {
            accessToken: result.accessToken
        }
    });
});

export const getMe = asyncHandler(async (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Current user profile retrieved',
        data: {
            id: req.user._id,
            firstName: req.user.firstName,
            lastName: req.user.lastName,
            email: req.user.email,
            role: req.user.role
        }
    });
});
