const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

// Tạo JWT token
const generateToken = (userId) => {
    return jwt.sign(
        { userId },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN }
    );
};

// Đăng ký user mới
const register = async (req, res) => {
    try {
        // Kiểm tra validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                message: 'Dữ liệu không hợp lệ',
                errors: errors.array()
            });
        }        const { fullname, email, password, confirmPassword } = req.body;

        // Kiểm tra mật khẩu xác nhận
        if (password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: 'Mật khẩu xác nhận không khớp'
            });
        }

        // Kiểm tra email đã tồn tại chưa
        const existingUser = await User.findByEmail(email);
        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: 'Email đã được sử dụng'
            });
        }

        // Tạo user mới
        const newUser = await User.createUser({ fullname, email, password });

        // Tạo token
        const token = generateToken(newUser._id);

        res.status(201).json({
            success: true,
            message: 'Đăng ký thành công',
            data: {
                user: newUser.toJSON(),
                token
            }
        });

    } catch (error) {
        console.error('Register error:', error);
        
        // Xử lý lỗi MongoDB duplicate key
        if (error.code === 11000) {
            return res.status(409).json({
                success: false,
                message: 'Email đã được sử dụng'
            });
        }

        // Xử lý lỗi validation của Mongoose
        if (error.name === 'ValidationError') {
            const validationErrors = Object.values(error.errors).map(err => ({
                field: err.path,
                message: err.message
            }));
            
            return res.status(400).json({
                success: false,
                message: 'Dữ liệu không hợp lệ',
                errors: validationErrors
            });
        }

        res.status(500).json({
            success: false,
            message: 'Lỗi server khi đăng ký',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

// Đăng nhập
const login = async (req, res) => {
    try {
        // Kiểm tra validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                message: 'Dữ liệu không hợp lệ',
                errors: errors.array()
            });
        }

        const { email, password } = req.body;

        // Tìm user theo email
        const user = await User.findByEmail(email);
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Email hoặc mật khẩu không đúng'
            });
        }

        // Kiểm tra password
        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: 'Email hoặc mật khẩu không đúng'
            });
        }

        // Tạo token
        const token = generateToken(user._id);

        res.json({
            success: true,
            message: 'Đăng nhập thành công',
            data: {
                user: user.toJSON(),
                token
            }
        });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({
            success: false,
            message: 'Lỗi server khi đăng nhập',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

// Lấy thông tin user hiện tại
const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'Không tìm thấy user'
            });
        }

        res.json({
            success: true,
            data: {
                user: user.toJSON()
            }
        });

    } catch (error) {
        console.error('Get profile error:', error);
        res.status(500).json({
            success: false,
            message: 'Lỗi server khi lấy thông tin user',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

// Đăng xuất (chỉ trả về thông báo, token sẽ được xử lý ở frontend)
const logout = async (req, res) => {
    res.json({
        success: true,
        message: 'Đăng xuất thành công'
    });
};

module.exports = {
    register,
    login,
    getProfile,
    logout
};