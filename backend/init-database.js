const mongoose = require('mongoose');
require('dotenv').config();

// Import model
const User = require('./models/User');

// Kết nối MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ MongoDB connected successfully');
    } catch (error) {
        console.error('❌ MongoDB connection failed:', error.message);
        process.exit(1);
    }
};

// Dữ liệu mẫu
const sampleUsers = [
    {
        fullname: 'Nguyễn Văn Admin',
        phone: '0123456789',
        email: 'admin@example.com',
        password: 'Test123!'
    },
    {
        fullname: 'Trần Thị User',
        phone: '0987654321',
        email: 'user@example.com',
        password: 'Test123!'
    },
    {
        fullname: 'Lê Minh Demo',
        phone: '0912345678',
        email: 'demo@example.com',
        password: 'Test123!'
    }
];

// Hàm khởi tạo dữ liệu
const initializeData = async () => {
    try {
        console.log('🔄 Đang khởi tạo dữ liệu mẫu...');

        // Xóa tất cả user cũ (nếu có)
        await User.deleteMany({});
        console.log('🗑️  Đã xóa dữ liệu cũ');

        // Tạo user mẫu
        for (const userData of sampleUsers) {
            try {
                const user = await User.createUser(userData);
                console.log(`✅ Đã tạo user: ${user.email}`);
            } catch (error) {
                console.error(`❌ Lỗi tạo user ${userData.email}:`, error.message);
            }
        }

        console.log('✅ Khởi tạo dữ liệu hoàn tất!');
        
        // Hiển thị danh sách user
        const users = await User.find({}).select('-password');
        console.log('\n📋 Danh sách user trong database:');
        users.forEach(user => {
            console.log(`- ID: ${user._id}`);
            console.log(`  Email: ${user.email}`);
            console.log(`  Tên: ${user.fullname}`);
            console.log(`  SĐT: ${user.phone}`);
            console.log(`  Tạo lúc: ${user.createdAt}`);
            console.log('---');
        });

    } catch (error) {
        console.error('❌ Lỗi khởi tạo dữ liệu:', error);
    }
};

// Chạy script
const main = async () => {
    await connectDB();
    await initializeData();
    process.exit(0);
};

main().catch(error => {
    console.error('❌ Script failed:', error);
    process.exit(1);
});
