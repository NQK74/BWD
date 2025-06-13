const express = require('express');
const { body } = require('express-validator');
const { register, login, getProfile, logout } = require('../controller/authController');
const { authenticateToken } = require('../middleware/authMiddleware');

const router = express.Router();

// Validation rules cho đăng ký
const registerValidation = [
    body('fullname')
        .trim()
        .notEmpty()
        .withMessage('Họ tên không được để trống')
        .isLength({ min: 2, max: 100 })
        .withMessage('Họ tên phải từ 2-100 ký tự'),
    
    body('email')
        .trim()
        .notEmpty()
        .withMessage('Email không được để trống')
        .isEmail()
        .withMessage('Email không hợp lệ')
        .normalizeEmail(),
    
    body('password')
        .isLength({ min: 6 })
        .withMessage('Mật khẩu phải có ít nhất 6 ký tự')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
        .withMessage('Mật khẩu phải chứa ít nhất 1 chữ hoa, 1 chữ thường và 1 số'),
    
    body('confirmPassword')
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error('Mật khẩu xác nhận không khớp');
            }
            return true;
        })
];

// Validation rules cho đăng nhập
const loginValidation = [
    body('email')
        .trim()
        .notEmpty()
        .withMessage('Email không được để trống')
        .isEmail()
        .withMessage('Email không hợp lệ')
        .normalizeEmail(),
    
    body('password')
        .notEmpty()
        .withMessage('Mật khẩu không được để trống')
];

// Routes
router.post('/register', registerValidation, register);
router.post('/login', loginValidation, login);
router.get('/profile', authenticateToken, getProfile);
router.post('/logout', authenticateToken, logout);

// Route test
router.get('/test', (req, res) => {
    res.json({
        success: true,
        message: 'Auth routes working!'
    });
});

module.exports = router;