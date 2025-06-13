const axios = require('axios');

const API_BASE_URL = 'http://localhost:3000/api';

// Test API endpoints
async function testAPI() {
    console.log('🧪 Bắt đầu test API...\n');

    try {
        // Test 1: Health check
        console.log('1️⃣ Test health check...');
        const healthResponse = await axios.get('http://localhost:3000');
        console.log('✅ Health check:', healthResponse.data.message);
        console.log('');

        // Test 2: Register new user
        console.log('2️⃣ Test đăng ký user mới...');
        const registerData = {
            fullname: 'Test User API',
            phone: '0999888777',
            email: `test-${Date.now()}@example.com`,
            password: 'Test123!'
        };

        const registerResponse = await axios.post(`${API_BASE_URL}/auth/register`, registerData);
        console.log('✅ Đăng ký thành công:', registerResponse.data.message);
        console.log('📧 Email:', registerResponse.data.data.user.email);
        console.log('🔑 Token:', registerResponse.data.data.token.substring(0, 50) + '...');
        console.log('');

        const token = registerResponse.data.data.token;

        // Test 3: Login with demo account
        console.log('3️⃣ Test đăng nhập với tài khoản demo...');
        const loginData = {
            email: 'admin@example.com',
            password: 'Test123!'
        };

        const loginResponse = await axios.post(`${API_BASE_URL}/auth/login`, loginData);
        console.log('✅ Đăng nhập thành công:', loginResponse.data.message);
        console.log('👤 User:', loginResponse.data.data.user.fullname);
        console.log('');

        const adminToken = loginResponse.data.data.token;

        // Test 4: Get profile
        console.log('4️⃣ Test lấy thông tin profile...');
        const profileResponse = await axios.get(`${API_BASE_URL}/auth/profile`, {
            headers: {
                'Authorization': `Bearer ${adminToken}`
            }
        });
        console.log('✅ Lấy profile thành công');
        console.log('👤 Tên:', profileResponse.data.data.user.fullname);
        console.log('📧 Email:', profileResponse.data.data.user.email);
        console.log('📞 SĐT:', profileResponse.data.data.user.phone);
        console.log('');

        // Test 5: Test validation errors
        console.log('5️⃣ Test validation errors...');
        try {
            await axios.post(`${API_BASE_URL}/auth/register`, {
                fullname: '',
                phone: '123',
                email: 'invalid-email',
                password: '123'
            });
        } catch (error) {
            if (error.response && error.response.status === 400) {
                console.log('✅ Validation errors hoạt động đúng');
                console.log('❌ Errors:', error.response.data.errors?.length || 'Có lỗi validation');
            }
        }
        console.log('');

        // Test 6: Test duplicate email
        console.log('6️⃣ Test duplicate email...');
        try {
            await axios.post(`${API_BASE_URL}/auth/register`, {
                fullname: 'Another User',
                phone: '0888777666',
                email: 'admin@example.com',
                password: 'Test123!'
            });
        } catch (error) {
            if (error.response && error.response.status === 409) {
                console.log('✅ Duplicate email detection hoạt động đúng');
                console.log('⚠️ Message:', error.response.data.message);
            }
        }
        console.log('');

        console.log('🎉 Tất cả tests đều passed!');
        console.log('✨ API backend hoạt động hoàn hảo!');

    } catch (error) {
        console.error('❌ Test failed:', error.message);
        if (error.response) {
            console.error('📄 Response data:', error.response.data);
        }
    }
}

// Chạy test
testAPI();
