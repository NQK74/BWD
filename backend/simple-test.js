// Simple test without axios
const http = require('http');

const testLogin = () => {
    const postData = JSON.stringify({
        email: 'admin@example.com',
        password: 'Test123!'
    });

    const options = {
        hostname: 'localhost',
        port: 3000,
        path: '/api/auth/login',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(postData)
        }
    };

    const req = http.request(options, (res) => {
        let data = '';

        res.on('data', (chunk) => {
            data += chunk;
        });

        res.on('end', () => {
            console.log('Status:', res.statusCode);
            console.log('Response:', JSON.parse(data));
        });
    });

    req.on('error', (e) => {
        console.error('Error:', e.message);
    });

    req.write(postData);
    req.end();
};

console.log('🧪 Testing login API...');
testLogin();
