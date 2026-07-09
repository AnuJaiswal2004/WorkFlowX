import { dashboardService } from '../services/dashboard.service.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const getDashboardData = asyncHandler(async (req, res) => {
    let dashboardData;
    
    if (req.user.role === 'admin') {
        dashboardData = await dashboardService.getAdminDashboard();
    } else {
        dashboardData = await dashboardService.getEmployeeDashboard(req.user._id);
    }

    res.status(200).json({
        success: true,
        message: `${req.user.role.charAt(0).toUpperCase() + req.user.role.slice(1)} dashboard metrics loaded`,
        data: dashboardData
    });
});
