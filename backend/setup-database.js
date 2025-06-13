const mysql = require('mysql2/promise');
require('dotenv').config();

async function createDatabase() {
    let connection;
    
    try {
        // Kết nối đến MySQL server (không kết nối đến database cụ thể)
        connection = await mysql.createConnection({
            host: process.env.DB_HOST || 'localhost',
            port: process.env.DB_PORT || 3306,
            user: process.env.DB_USER || 'root',
            password: process.env.DB_PASSWORD || ''
        });

        console.log('✅ Connected to MySQL server');

        // Tạo database nếu chưa tồn tại
        const dbName = process.env.DB_NAME || 'bwd_exam2';
        await connection.execute(`CREATE DATABASE IF NOT EXISTS ${dbName} CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`);
        console.log(`✅ Database '${dbName}' created or already exists`);

        // Chọn database
        await connection.execute(`USE ${dbName}`);

        // Tạo bảng users
        await connection.execute(`
            CREATE TABLE IF NOT EXISTS users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                fullname VARCHAR(100) NOT NULL,
                phone VARCHAR(20) NOT NULL,
                email VARCHAR(100) NOT NULL UNIQUE,
                password VARCHAR(255) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                INDEX idx_email (email),
                INDEX idx_created_at (created_at)
            )
        `);
        console.log('✅ Table users created or already exists');

        // Thêm dữ liệu mẫu nếu chưa có
        const [rows] = await connection.execute('SELECT COUNT(*) as count FROM users');
        
        if (rows[0].count === 0) {
            await connection.execute(`
                INSERT INTO users (fullname, phone, email, password) VALUES
                ('Nguyễn Văn Admin', '0123456789', 'admin@example.com', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewGfgE.lEpW5zDpa'),
                ('Trần Thị User', '0987654321', 'user@example.com', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewGfgE.lEpW5zDpa')
            `);
            console.log('✅ Sample data inserted');
        } else {
            console.log('✅ Sample data already exists');
        }

        console.log('\n🎉 Database setup completed successfully!');
        console.log('\nTest accounts:');
        console.log('Email: admin@example.com | Password: Test123!');
        console.log('Email: user@example.com | Password: Test123!');

    } catch (error) {
        console.error('❌ Database setup failed:', error.message);
        
        if (error.code === 'ER_ACCESS_DENIED_ERROR') {
            console.log('\n💡 Please check your database credentials in .env file');
        } else if (error.code === 'ECONNREFUSED') {
            console.log('\n💡 Please make sure MySQL server is running');
        }
        
        process.exit(1);
    } finally {
        if (connection) {
            await connection.end();
        }
    }
}

createDatabase();
