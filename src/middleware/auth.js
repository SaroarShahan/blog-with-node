const { verifyToken } = require("../utils/jwt");

exports.authenticateToken = async (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1]; // Bearer <token>

        if (!token) {
            return res.status(401).json({
                status: false,
                message: 'Access token required'
            });
        }

        const payload = await verifyToken(token);
        req.user = payload;
        next();
    } catch (error) {
        return res.status(403).json({
            status: false,
            message: 'Invalid or expired token',
            error: error.message
        });
    }
};