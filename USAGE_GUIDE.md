# 🚀 Hướng Dẫn Sử Dụng Hệ Thống Đăng Nhập - BWD Exam 2

## ✅ Trạng thái hiện tại

- ✅ Backend MongoDB hoạt động tại http://localhost:3000
- ✅ Frontend login.html với UI cải tiến
- ✅ 3 tài khoản demo sẵn sàng
- ✅ Trang home.html hiển thị thông tin user

## 🔑 Tài khoản demo

1. **Admin**: admin@example.com / Test123!
2. **User**: user@example.com / Test123!
3. **Demo**: demo@example.com / Test123!

## 🎯 Tính năng đã hoàn thành

### 🔐 Đăng nhập

- Validation email và password
- Hiển thị lỗi chi tiết
- Click vào tài khoản demo để tự điền
- Loading spinner khi đang xử lý
- Chuyển hướng đến home.html sau khi thành công

### 📝 Đăng ký

- Validation đầy đủ cho tất cả trường
- Kiểm tra password phức tạp
- Hiển thị lỗi validation riêng cho từng trường
- Tự động đăng nhập sau khi đăng ký thành công

### 🏠 Trang Home

- Hiển thị thông tin user đăng nhập
- Các nút điều hướng đến các trang khác
- Chức năng đăng xuất
- Tự động chuyển đến login nếu chưa đăng nhập

### 🔧 Backend API

- RESTful API với MongoDB
- JWT authentication
- Password hashing với bcrypt
- Input validation
- Error handling toàn diện

## 🚀 Cách sử dụng

### Bước 1: Khởi động Backend

```bash
cd d:\Workspace\BWD_EXAM2\backend
npm start
```

### Bước 2: Mở Frontend

- Mở file `d:\Workspace\BWD_EXAM2\fontend\html\login.html` trong browser
- Hoặc sử dụng Live Server trong VS Code

### Bước 3: Test Hệ Thống

1. **Test đăng nhập**:

   - Click vào một tài khoản demo để tự điền
   - Hoặc nhập thủ công: admin@example.com / Test123!
   - Click "Đăng Nhập"

2. **Test đăng ký**:

   - Chuyển sang tab "Đăng Ký"
   - Điền đầy đủ thông tin
   - Password phải có ít nhất 6 ký tự, bao gồm chữ hoa, thường, số
   - Click "Đăng Ký"

3. **Test trang Home**:
   - Sau khi đăng nhập thành công, sẽ chuyển đến home.html
   - Xem thông tin user
   - Test chức năng đăng xuất

## 🐛 Troubleshooting

### Backend không hoạt động

- Kiểm tra MongoDB đang chạy
- Kiểm tra port 3000 không bị chiếm
- Xem log server trong terminal

### Frontend không kết nối được

- Kiểm tra backend đang chạy tại localhost:3000
- Mở Developer Tools (F12) để xem lỗi console
- Kiểm tra CORS settings

### Lỗi đăng nhập

- Đảm bảo đã chạy `npm run init-db` để tạo tài khoản demo
- Kiểm tra email/password chính xác
- Xem response trong Network tab của DevTools

## 📚 API Endpoints

- `POST /api/auth/login` - Đăng nhập
- `POST /api/auth/register` - Đăng ký
- `GET /api/auth/profile` - Lấy thông tin user
- `POST /api/auth/logout` - Đăng xuất

## 🎉 Kết luận

Hệ thống đăng nhập đã hoàn thành với đầy đủ tính năng:

- ✅ UI/UX thân thiện
- ✅ Validation toàn diện
- ✅ Security tốt (JWT + bcrypt)
- ✅ Error handling chi tiết
- ✅ MongoDB integration
- ✅ Responsive design

Bạn có thể sử dụng hệ thống này làm cơ sở cho các dự án lớn hơn!
