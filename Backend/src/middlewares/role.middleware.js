export const authorize = (...roles) => {
    return (req, res, next) => {
        if (!req.user || !roles.includes(req.user.role)) {
            const error = new Error(`Role "${req.user ? req.user.role : 'guest'}" is not authorized to access this resource`);
            error.statusCode = 403;
            return next(error);
        }
        next();
    };
};
