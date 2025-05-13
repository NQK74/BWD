# Cấu Trúc Trang Web Văn Hóa Việt Nam

Dưới đây là cấu trúc file và thư mục của trang web:

```
vietnam-culture-website/
│
├── index.html                # File HTML chính 
│
├── css/
│   ├── style.css             # CSS chính
│   └── animation.css         # CSS cho hiệu ứng animation
│
├── js/
│   └── main.js               # JavaScript chính
│
├── images/                      # Thư mục hình ảnh (cần thêm)
│   ├── hero-bg.jpg
│   ├── about-img.jpg
│   ├── traditions/
│   │   ├── tet.jpg
│   │   ├── ao-dai.jpg
│   │   └── mua-roi-nuoc.jpg
│   ├── cuisine/
│   │   ├── pho.jpg
│   │   ├── banh-mi.jpg
│   │   ├── bun-cha.jpg
│   │   └── com-tam.jpg
│   ├── gallery/
│   │   ├── halong.jpg
│   │   ├── hoian.jpg
│   │   ├── sapa.jpg
│   │   ├── hue.jpg
│   │   ├── phongnha.jpg
│   │   └── muine.jpg
│   └── logo.png
│
└── favicon.ico               # Favicon
```

## Mô tả cấu trúc

### 1. File HTML

- **index.html**: File HTML chính chứa cấu trúc trang web với các section: Hero, About, Traditions, Cuisine, Gallery và Contact.

### 2. Thư mục CSS

- **style.css**: File CSS chính định nghĩa style cho tất cả các phần tử trong trang web.
- **animation.css**: File CSS chứa các animation và transition.

### 3. Thư mục JavaScript

- **main.js**: File JavaScript chính xử lý các tính năng tương tác như smooth scrolling, lightbox gallery, form submission và hiệu ứng animation.

### 4. Thư mục Images

Cần thêm các hình ảnh thực tế vào thư mục tương ứng để thay thế các placeholder.

## Cách sử dụng

1. **Cài đặt**:
   - Tải tất cả các file và thư mục vào server hoặc hosting của bạn
   - Đảm bảo giữ nguyên cấu trúc thư mục

2. **Thay thế hình ảnh**:
   - Thay thế các placeholder bằng hình ảnh thực tế của bạn
   - Đảm bảo hình ảnh có kích thước phù hợp để tối ưu thời gian tải trang

3. **Tùy chỉnh nội dung**:
   - Chỉnh sửa nội dung trong index.html để phù hợp với mục đích của bạn
   - Thay đổi thông tin liên hệ, địa chỉ và liên kết mạng xã hội

4. **Tùy chỉnh style**:
   - Thay đổi màu sắc và giao diện trong style.css nếu muốn

## Tính năng

1. **Responsive Design**: Tương thích với mọi kích thước màn hình
2. **Smooth Scrolling**: Cuộn mượt giữa các section
3. **Animation Effects**: Hiệu ứng animation cho các phần tử
4. **Image Gallery**: Thư viện hình ảnh với lightbox
5. **Contact Form**: Form liên hệ với validation
6. **Back to Top Button**: Nút quay lại đầu trang
7. **Active Navigation**: Tự động đánh dấu mục menu đang xem

## Lưu ý

- Thêm chức năng xử lý form liên hệ trong back-end để nhận và lưu thông tin người dùng
- Tối ưu hình ảnh để tăng tốc độ tải trang
- Có thể thêm các tính năng nâng cao như đa ngôn ngữ, blog, hoặc trang sản phẩm nếu cần