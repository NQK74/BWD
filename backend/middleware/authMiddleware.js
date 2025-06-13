const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware xác thực JWT token
const authenticateToken = async (req, res, next) => {
    try {
        // Lấy token từ header
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Access token không được cung cấp'
            });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
          // Kiểm tra user có tồn tại không
        const user = await User.findById(decoded.userId);
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Token không hợp lệ - user không tồn tại'
            });
        }

        // Thêm userId vào request object
        req.userId = decoded.userId;
        next();

    } catch (error) {
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({
                success: false,
                message: 'Token không hợp lệ'
            });
        }
        
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                success: false,
                message: 'Token đã hết hạn'
            });
        }

        console.error('Auth middleware error:', error);
        res.status(500).json({
            success: false,
            message: 'Lỗi server khi xác thực token'
        });
    }
};

// Middleware kiểm tra token tùy chọn (không bắt buộc)
const optionalAuth = async (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if (token) {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const user = await User.findById(decoded.userId);
            
            if (user) {
                req.userId = decoded.userId;
            }
        }

        next();
    } catch (error) {
        // Nếu có lỗi, vẫn tiếp tục nhưng không set userId
        next();
    }
};

module.exports = {
    authenticateToken,
    optionalAuth
};