# 🚀 Hướng Dẫn Setup Nhanh - BWD Exam 2

## Yêu cầu hệ thống

- ✅ Node.js (v14+)
- ✅ MongoDB (v4.4+)
- ✅ VS Code với Live Server extension

## Bước 1: Cài đặt MongoDB

1. Tải MongoDB Community từ: https://www.mongodb.com/try/download/community
2. Cài đặt và khởi động MongoDB service
3. (Tùy chọn) Cài MongoDB Compass để quản lý database

## Bước 2: Setup Backend

```bash
# Di chuyển vào thư mục backend
cd backend

# Cài đặt dependencies
npm install

# Khởi tạo dữ liệu mẫu
npm run init-db

# Khởi động server
npm start
```

## Bước 3: Setup Frontend

1. Mở VS Code
2. Mở thư mục `fontend/html`
3. Cài đặt extension "Live Server"
4. Click chuột phải vào `login.html` → "Open with Live Server"

## Bước 4: Test Hệ Thống

1. Mở http://localhost:5500 (hoặc port Live Server)
2. Thử đăng nhập với:
   - **Email**: admin@example.com
   - **Password**: Test123!

## Tài khoản demo có sẵn:

- admin@example.com / Test123!
- user@example.com / Test123!
- demo@example.com / Test123!

## Troubleshooting

- ❌ **MongoDB connection failed**: Kiểm tra MongoDB service đã khởi động
- ❌ **CORS error**: Đảm bảo frontend chạy trên port 5500
- ❌ **Port 3000 in use**: Tắt các ứng dụng khác đang dùng port này

## API Endpoints

- **POST** `/api/auth/register` - Đăng ký
- **POST** `/api/auth/login` - Đăng nhập
- **GET** `/api/auth/profile` - Lấy thông tin user
- **POST** `/api/auth/logout` - Đăng xuất

## Chạy nhanh

Chạy file `start-server.bat` để khởi động backend một cách nhanh chóng!

---

✨ **Chúc bạn code vui vẻ!** ✨
