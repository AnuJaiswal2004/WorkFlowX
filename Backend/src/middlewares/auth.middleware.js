import jwt from 'jsonwebtoken';
import { config } from '../config/index.js';
import { userRepository } from '../repositories/user.repository.js';

export const protect = async (req, res, next) => {
    try {
        let token;
        
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }

        if (!token) {
            const error = new Error('Not authorized to access this route');
            error.statusCode = 401;
            throw error;
        }

        // Verify token
        const decoded = jwt.verify(token, config.jwtAccessSecret);

        // Get user from database
        const user = await userRepository.findById(decoded.id);
        if (!user || !user.isActive) {
            const error = new Error('User not found or is currently suspended');
            error.statusCode = 401;
            throw error;
        }

        // Attach user to req
        req.user = user;
        next();
    } catch (err) {
        next(err);
    }
};
