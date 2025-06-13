# Hướng Dẫn Sử Dụng Hệ Thống Authentication UI

## Tổng Quan

Hệ thống authentication UI đã được tích hợp vào trang chủ (`index.html`) với hai trạng thái:

1. **Guest Mode** - Khi chưa đăng nhập
2. **Logged In Mode** - Khi đã đăng nhập thành công

## Cấu Trúc Files

### HTML Files

- `index.html` - Trang chủ với hệ thống authentication UI
- `login.html` - Trang đăng nhập/đăng ký

### JavaScript Files

- `auth.js` - Xử lý logic authentication
- `index.js` - Logic trang chủ

### CSS Files

- `index-style.css` - Chứa styles cho authentication UI

## Chức Năng

### 1. Guest Mode (Chưa đăng nhập)

- Hiển thị icon người dùng với dropdown menu
- Menu chứa:
  - "Đăng Nhập" - chuyển đến `login.html`
  - "Đăng Ký" - chuyển đến `login.html#register-form`

### 2. Logged In Mode (Đã đăng nhập)

- Hiển thị avatar người dùng và tên
- Dropdown menu chứa:
  - Header với avatar, tên và email
  - "Thông tin cá nhân"
  - "Cài đặt"
  - "Đăng xuất"

## Cách Test

### Test Manual

1. Mở `index.html` trong browser
2. Mở Developer Console (F12)
3. Gõ `testLogin()` để demo đăng nhập
4. Gõ `testLogout()` để demo đăng xuất

### Test với Server

1. Khởi động backend server
2. Truy cập `login.html`
3. Đăng nhập/Đăng ký
4. Sau khi thành công, sẽ chuyển về `index.html` với UI đã đăng nhập

## Tùy Chỉnh

### Thay Đổi Avatar

- Thay file `img/avatar-login.jpg`
- Hoặc cập nhật URL trong `user.avatar` property

### Thay Đổi Thông Tin User

```javascript
const testUser = {
  fullname: "Tên Người Dùng",
  email: "email@example.com",
  phone: "0123456789",
  avatar: "../img/avatar-custom.jpg",
};
```

### Thêm Menu Items

Chỉnh sửa dropdown menu trong `index.html`:

```html
<a class="dropdown-item" href="#" onclick="yourFunction()">
  <i class="bi bi-your-icon"></i> Menu Item Mới
</a>
```

## Responsive Design

- Trên desktop: Hiển thị avatar + tên
- Trên mobile: Chỉ hiển thị avatar
- Dropdown menu tự động điều chỉnh kích thước

## Browser Support

- Chrome, Firefox, Safari, Edge
- Bootstrap 4 compatible
- Mobile responsive

## Troubleshooting

### UI không cập nhật sau đăng nhập

- Kiểm tra console có lỗi JavaScript
- Đảm bảo `auth.js` được load
- Gọi `updateAuthUI()` manually

### Dropdown không hoạt động

- Kiểm tra Bootstrap JS được load
- Kiểm tra jQuery được load
- Kiểm tra console có lỗi

### Avatar không hiển thị

- Kiểm tra path đến file avatar
- Đảm bảo file tồn tại trong thư mục `img/`
- Kiểm tra user data trong localStorage

## Demo Commands

```javascript
// Trong Developer Console:
testLogin(); // Demo đăng nhập
testLogout(); // Demo đăng xuất
checkAuth(); // Kiểm tra trạng thái đăng nhập
getUser(); // Xem thông tin user hiện tại
```
