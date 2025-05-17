function loginUser() {
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  // Tài khoản và mật khẩu cố định (hardcoded)
  const fixedEmail = "admin@example.com";
  const fixedPassword = "123456";

  if (email === fixedEmail && password === fixedPassword) {
    alert("Đăng nhập thành công!");
    window.location.href = "home.html"; // chuyển đến trang chính
  } else {
    alert("Email hoặc mật khẩu không đúng!");
  }
}

function registerUser() {
  // Không xử lý thật sự đăng ký vì không dùng cơ sở dữ liệu
  alert("Chức năng đăng ký đang bị tắt (demo không dùng cơ sở dữ liệu).");
}
