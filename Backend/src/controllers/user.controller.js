import { userService } from '../services/user.service.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const getAllEmployees = asyncHandler(async (req, res) => {
    const employees = await userService.getAllEmployees();
    res.status(200).json({
        success: true,
        message: 'Employees list retrieved successfully',
        data: employees
    });
});

export const getEmployeeProfile = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const profile = await userService.getUserProfile(id);
    res.status(200).json({
        success: true,
        message: 'Employee profile retrieved successfully',
        data: profile
    });
});
