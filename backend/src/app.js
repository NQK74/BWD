const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Import database connection
const connectDB = require('../config/database');

// Import routes
const authRoutes = require('../routes/authRoutes');

const app = express();

// Kết nối database
connectDB();

// Middleware
app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps, curl, postman)
        if (!origin) return callback(null, true);
        
        // Allow localhost, file:// protocol, and any local development
        if (origin.startsWith('http://localhost') || 
            origin.startsWith('file://') ||
            origin.startsWith('http://127.0.0.1') ||
            origin === process.env.FRONTEND_URL) {
            return callback(null, true);
        }
        
        // For production, you might want to be more restrictive
        if (process.env.NODE_ENV === 'development') {
            return callback(null, true);
        }
        
        callback(new Error('Not allowed by CORS'));
    },
    credentials: true
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Routes
app.use('/api/auth', authRoutes);

// Route gốc
app.get('/', (req, res) => {
    res.json({
        success: true,
        message: 'BWD Exam 2 - Backend API đang hoạt động!',
        version: '1.0.0'
    });
});

// Xử lý 404
app.use('*', (req, res) => {
    res.status(404).json({
        success: false,
        message: 'API endpoint không tồn tại'
    });
});

// Global error handler
app.use((error, req, res, next) => {
    console.error('Global error handler:', error);
    res.status(500).json({
        success: false,
        message: 'Có lỗi xảy ra trên server',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`🚀 Server đang chạy tại cổng ${PORT}`);
    console.log(`📍 API URL: http://localhost:${PORT}`);
    console.log(`🌍 Environment: ${process.env.NODE_ENV}`);
});