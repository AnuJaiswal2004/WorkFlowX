import jwt from 'jsonwebtoken';
import { userRepository } from '../repositories/user.repository.js';
import { RefreshToken } from '../models/refreshToken.model.js';
import { config } from '../config/index.js';

class AuthService {
    async register(userData) {
        const existingUser = await userRepository.findByEmail(userData.email);
        if (existingUser) {
            const error = new Error('Email is already registered');
            error.statusCode = 400;
            throw error;
        }

        const user = await userRepository.create({
            firstName: userData.firstName,
            lastName: userData.lastName || '',
            email: userData.email,
            password: userData.password,
            role: userData.role || 'employee',
            isActive: true
        });

        const accessToken = this.generateAccessToken(user);
        const refreshToken = await this.generateRefreshToken(user);

        return {
            user: {
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                role: user.role
            },
            accessToken,
            refreshToken
        };
    }

    async login(email, password) {
        const user = await userRepository.findByEmail(email);
        if (!user || !user.isActive) {
            const error = new Error('Invalid email or password');
            error.statusCode = 401;
            throw error;
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            const error = new Error('Invalid email or password');
            error.statusCode = 401;
            throw error;
        }

        const accessToken = this.generateAccessToken(user);
        const refreshToken = await this.generateRefreshToken(user);

        return {
            user: {
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                role: user.role
            },
            accessToken,
            refreshToken
        };
    }

    async logout(tokenString) {
        await RefreshToken.deleteOne({ token: tokenString });
    }

    async refresh(tokenString) {
        const storedToken = await RefreshToken.findOne({ token: tokenString });
        if (!storedToken) {
            const error = new Error('Invalid refresh token');
            error.statusCode = 401;
            throw error;
        }

        // Verify token expiration
        if (storedToken.expiresAt < new Date()) {
            await RefreshToken.deleteOne({ _id: storedToken._id });
            const error = new Error('Refresh token has expired');
            error.statusCode = 401;
            throw error;
        }

        let decoded;
        try {
            decoded = jwt.verify(tokenString, config.jwtRefreshSecret);
        } catch (err) {
            await RefreshToken.deleteOne({ _id: storedToken._id });
            const error = new Error('Invalid or compromised refresh token');
            error.statusCode = 401;
            throw error;
        }

        const user = await userRepository.findById(decoded.id);
        if (!user || !user.isActive) {
            const error = new Error('User inactive or not found');
            error.statusCode = 401;
            throw error;
        }

        const newAccessToken = this.generateAccessToken(user);
        return { accessToken: newAccessToken };
    }

    generateAccessToken(user) {
        return jwt.sign(
            { id: user._id, role: user.role },
            config.jwtAccessSecret,
            { expiresIn: '30m' } // 30 mins access token lifetime as requested
        );
    }

    async generateRefreshToken(user) {
        const tokenString = jwt.sign(
            { id: user._id },
            config.jwtRefreshSecret,
            { expiresIn: '7d' } // 7 days refresh token lifetime
        );

        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + 7);

        // Delete any existing refresh token for this user to limit sessions (optional, but clean)
        await RefreshToken.deleteMany({ userId: user._id });

        const refreshToken = new RefreshToken({
            token: tokenString,
            userId: user._id,
            expiresAt
        });

        await refreshToken.save();
        return tokenString;
    }
}

export const authService = new AuthService();
