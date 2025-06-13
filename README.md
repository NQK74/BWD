# BWD Exam 2 - Authentication System

Hệ thống xác thực người dùng với đăng nhập và đăng ký cho ứng dụng Quảng Bá Văn Hóa Việt.

## Cấu trúc dự án

```
BWD_EXAM2/
├── backend/                 # Backend API (Node.js + Express)
│   ├── src/                # Source code chính
│   ├── config/             # Cấu hình database
│   ├── controller/         # Controllers xử lý logic
│   ├── middleware/         # Middleware xác thực
│   ├── models/            # Models cho database
│   ├── routes/            # API routes
│   └── package.json       # Dependencies backend
├── frontend/              # Frontend (HTML + CSS + JS)
│   ├── html/              # Các file HTML
│   ├── css/               # Stylesheets
│   ├── JS/                # JavaScript files
│   └── img/               # Hình ảnh
├── database/              # Scripts database
│   └── init.sql           # Script khởi tạo database
└── README.md
```

## Yêu cầu hệ thống

- **Node.js**: v14.0.0 trở lên
- **MongoDB**: v4.4 trở lên
- **Browser**: Chrome, Firefox, Safari, Edge (phiên bản mới nhất)

## Cài đặt và chạy dự án

### 1. Chuẩn bị Database

1. Khởi động MongoDB server
2. Tạo database và collection bằng cách chạy script:

   ```bash
   cd backend
   npm run init-db
   ```

   Hoặc khởi động MongoDB Compass để quản lý database trực quan.

### 2. Cài đặt Backend

1. Di chuyển vào thư mục backend:

   ```bash
   cd backend
   ```

2. Cài đặt dependencies:

   ```bash
   npm install
   ```

3. Cấu hình biến môi trường:

   - Sao chép file `.env` và cập nhật thông tin MongoDB của bạn:

   ```env
   MONGODB_URI=mongodb://localhost:27017/bwd_exam2
   DB_NAME=bwd_exam2
   JWT_SECRET=your_jwt_secret_key
   PORT=3000
   ```

4. Chạy server backend:

   ```bash
   npm start
   ```

   Hoặc chạy trong development mode:

   ```bash
   npm run dev
   ```

   Server sẽ chạy tại: `http://localhost:3000`

### 3. Chạy Frontend

1. Mở thư mục `fontend/html` trong VS Code
2. Cài đặt extension "Live Server" (nếu chưa có)
3. Click chuột phải vào file `login.html` và chọn "Open with Live Server"
4. Frontend sẽ chạy tại: `http://localhost:5500` (hoặc port khác)

## API Endpoints

### Authentication Routes

| Method | Endpoint             | Description        | Body                                    |
| ------ | -------------------- | ------------------ | --------------------------------------- |
| POST   | `/api/auth/register` | Đăng ký user mới   | `{fullname, phone, email, password}`    |
| POST   | `/api/auth/login`    | Đăng nhập          | `{email, password}`                     |
| GET    | `/api/auth/profile`  | Lấy thông tin user | Header: `Authorization: Bearer <token>` |
| POST   | `/api/auth/logout`   | Đăng xuất          | Header: `Authorization: Bearer <token>` |

### Response Format

**Success Response:**

```json
{
  "success": true,
  "message": "Success message",
  "data": {
    "user": {...},
    "token": "jwt_token"
  }
}
```

**Error Response:**

```json
{
  "success": false,
  "message": "Error message",
  "errors": [...] // Chi tiết lỗi validation (nếu có)
}
```

## Chức năng

### Đăng ký

- Validation đầy đủ cho tất cả các trường
- Mã hóa mật khẩu với bcrypt
- Kiểm tra email trùng lặp
- Tự động đăng nhập sau khi đăng ký thành công

### Đăng nhập

- Xác thực email và mật khẩu
- Tạo JWT token khi đăng nhập thành công
- Lưu token và thông tin user trong localStorage

### Bảo mật

- Mật khẩu được hash bằng bcrypt với salt rounds = 12
- JWT token có thời hạn (7 ngày)
- Middleware xác thực cho các route cần bảo vệ
- Validation đầu vào để tránh SQL injection

## Tài khoản demo

Sau khi chạy script `npm run init-db`, bạn có thể sử dụng tài khoản sau để test:

**Email:** `admin@example.com`  
**Password:** `Test123!`

**Email:** `user@example.com`  
**Password:** `Test123!`

## Troubleshooting

### Backend không chạy được

1. Kiểm tra MongoDB server đã khởi động chưa
2. Kiểm tra thông tin MongoDB URI trong file `.env`
3. Đảm bảo port 3000 không bị chiếm dụng

### Frontend không kết nối được backend

1. Kiểm tra backend đã chạy tại `http://localhost:3000`
2. Kiểm tra CORS settings trong `app.js`
3. Kiểm tra browser console để xem lỗi chi tiết

### Database connection failed

1. Kiểm tra MongoDB service đã start chưa
2. Kiểm tra MongoDB URI trong `.env`
3. Đảm bảo MongoDB đang chạy trên port 27017

## Technologies Used

**Backend:**

- Node.js + Express.js
- MongoDB + Mongoose
- bcryptjs (password hashing)
- jsonwebtoken (JWT authentication)
- express-validator (input validation)
- cors (cross-origin requests)

**Frontend:**

- HTML5 + CSS3 + JavaScript (ES6+)
- Bootstrap 4
- Unicons (icons)

## Phát triển thêm

- [ ] Chức năng quên mật khẩu
- [ ] Xác thực email qua OTP
- [ ] Social login (Google, Facebook)
- [ ] Quản lý sessions
- [ ] Rate limiting cho API
- [ ] Logging và monitoring
