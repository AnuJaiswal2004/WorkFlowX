import { User } from '../models/user.model.js';

class UserRepository {
    async findById(id) {
        return User.findById(id);
    }

    async findByEmail(email) {
        return User.findOne({ email });
    }

    async create(userData) {
        const user = new User(userData);
        return user.save();
    }

    async update(id, updateData) {
        return User.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
    }

    async findAllEmployees() {
        return User.find({ role: 'employee' }).select('-password');
    }
}

export const userRepository = new UserRepository();
