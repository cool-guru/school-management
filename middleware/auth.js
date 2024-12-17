const jwt = require('jsonwebtoken');

/**
 * Middleware to authenticate requests using JWT.
 * Verifies the JWT token and attaches the user payload to the request object.
 */
exports.authenticateJWT = (req, res, next) => {
    const token = req.header('Authorization');

    // Check if token is provided
    if (!token) {
        return res.status(401).json({ message: 'Access Denied: No token provided' });
    }

    try {
        // Verify the token and decode it
        const decoded = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET);

        // Attach user information to request
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(403).json({ message: 'Invalid Token' });
    }
};

/**
 * Middleware to authorize user roles.
 * Allows access only if the user's role matches the required roles.
 *
 * @param {Array} roles - List of roles allowed to access the route.
 */
exports.authorizeRoles = (roles) => {
    return (req, res, next) => {
        if (!req.user || !roles.includes(req.user.role)) {
            return res.status(403).json({ message: 'Access Forbidden: Insufficient role permissions' });
        }
        next();
    };
};
