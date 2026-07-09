import { userRepository } from '../repositories/user.repository.js';

class UserService {
    async getUserProfile(userId) {
        const user = await userRepository.findById(userId);
        if (!user) {
            const error = new Error('User not found');
            error.statusCode = 404;
            throw error;
        }
        return {
            id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: user.role,
            isActive: user.isActive
        };
    }

    async getAllEmployees() {
        return userRepository.findAllEmployees();
    }
}

export const userService = new UserService();
