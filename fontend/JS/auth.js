const API_BASE_URL = 'http://localhost:3000/api';

// Utility functions
function showMessage(message, isError = false, elementId = null) {
    if (elementId) {
        const element = document.getElementById(elementId);
        if (element) {
            element.textContent = message;
            element.style.display = 'block';
            setTimeout(() => {
                element.style.display = 'none';
            }, 5000);
        }
    } else {
        alert(message);
    }
}

function clearMessages() {
    const errorElements = document.querySelectorAll('.error-message, .success-message');
    errorElements.forEach(element => {
        element.style.display = 'none';
        element.textContent = '';
    });
}

function showLoading(buttonElement, isLoading = true) {
    const spinner = buttonElement.querySelector('.loading-spinner');
    if (isLoading) {
        buttonElement.disabled = true;
        if (spinner) spinner.style.display = 'inline-block';
        if (!buttonElement.getAttribute('data-original-text')) {
            buttonElement.setAttribute('data-original-text', buttonElement.textContent.trim());
        }
    } else {
        buttonElement.disabled = false;
        if (spinner) spinner.style.display = 'none';
    }
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePassword(password) {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
    return passwordRegex.test(password);
}

// Session Storage functions
function saveToken(token) {
    sessionStorage.setItem('authToken', token);
}

function getToken() {
    return sessionStorage.getItem('authToken');
}

function removeToken() {
    sessionStorage.removeItem('authToken');
}

function saveUser(user) {
    sessionStorage.setItem('userData', JSON.stringify(user));
}

function getUser() {
    const userData = sessionStorage.getItem('userData');
    return userData ? JSON.parse(userData) : null;
}

function removeUser() {
    sessionStorage.removeItem('userData');
}

// Đăng nhập
async function loginUser() {
    const email = document.getElementById("login-email").value.trim();
    const password = document.getElementById("login-password").value;
    const loginButton = document.getElementById('login-btn');

    clearMessages();

    if (!email || !password) {
        showMessage('Vui lòng nhập đầy đủ email và mật khẩu!', true, 'login-error');
        return;
    }

    if (!validateEmail(email)) {
        showMessage('Email không hợp lệ!', true, 'login-email-error');
        return;
    }

    try {
        showLoading(loginButton, true);

        const response = await fetch(`${API_BASE_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        });

        const data = await response.json();        if (response.ok && data.success) {
            // Lưu token và user vào session
            console.log('Login successful - data received:', data);
            console.log('Token:', data.data?.token || data.token);
            console.log('User data:', data.data?.user || data.user);
            
            // Backend trả về data.data.user và data.data.token
            const token = data.data?.token || data.token;
            const user = data.data?.user || data.user;
            
            saveToken(token);
            saveUser(user);
            
            // Verify data was saved
            console.log('Saved token:', getToken());
            console.log('Saved user:', getUser());
            
            showMessage('Đăng nhập thành công!', false, 'login-success');
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1000);
        } else {
            showMessage(data.message || 'Đăng nhập thất bại!', true, 'login-error');
        }
    } catch (error) {
        console.error('Login error:', error);
        showMessage('Lỗi kết nối! Vui lòng kiểm tra server backend.', true, 'login-error');
    } finally {
        showLoading(loginButton, false);
    }
}

// Đăng ký
async function registerUser() {
    const fullname = document.getElementById("reg-fullname").value.trim();
    const email = document.getElementById("reg-email").value.trim();
    const password = document.getElementById("reg-password").value;
    const confirmPassword = document.getElementById("reg-confirm-password").value;
    const registerButton = document.getElementById('register-btn');

    clearMessages();

    if (!fullname || !email || !password || !confirmPassword) {
        showMessage('Vui lòng nhập đầy đủ thông tin!', true, 'register-error');
        return;
    }

    if (fullname.length < 2 || fullname.length > 100) {
        showMessage('Họ tên phải từ 2-100 ký tự!', true, 'reg-fullname-error');
        return;
    }

    if (!validateEmail(email)) {
        showMessage('Email không hợp lệ!', true, 'reg-email-error');
        return;
    }

    if (!validatePassword(password)) {
        showMessage('Mật khẩu phải có ít nhất 6 ký tự, bao gồm chữ hoa, chữ thường và số!', true, 'reg-password-error');
        return;
    }

    if (password !== confirmPassword) {
        showMessage('Mật khẩu xác nhận không khớp!', true, 'reg-confirm-password-error');
        return;
    }

    try {
        showLoading(registerButton, true);

        const response = await fetch(`${API_BASE_URL}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                fullname: fullname,
                email: email,
                password: password,
                confirmPassword: confirmPassword
            })
        });

        const data = await response.json();

        if (response.ok && data.success) {
            saveToken(data.data.token);
            saveUser(data.data.user);
            showMessage('Đăng ký thành công! Đang chuyển hướng...', false, 'register-success');
            updateAuthUI();
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1500);
        } else {
            showMessage(data.message || 'Đăng ký thất bại!', true, 'register-error');
            if (data.errors && Array.isArray(data.errors)) {
                data.errors.forEach(error => {
                    const fieldName = error.path || error.param;
                    switch(fieldName) {
                        case 'fullname':
                            showMessage(error.msg || error.message, true, 'reg-fullname-error');
                            break;
                        case 'email':
                            showMessage(error.msg || error.message, true, 'reg-email-error');
                            break;
                        case 'password':
                            showMessage(error.msg || error.message, true, 'reg-password-error');
                            break;
                        case 'confirmPassword':
                            showMessage(error.msg || error.message, true, 'reg-confirm-password-error');
                            break;
                    }
                });
            }
        }
    } catch (error) {
        console.error('Register error:', error);
        showMessage('Lỗi kết nối! Vui lòng kiểm tra server backend.', true, 'register-error');
    } finally {
        showLoading(registerButton, false);
    }
}

// Check if user is authenticated
function checkAuth() {
    const token = getToken();
    const userData = getUser();
    return token && userData;
}

// Authentication state management functions
function updateAuthUI() {
    const isAuthenticated = checkAuth();
    console.log('updateAuthUI called - isAuthenticated:', isAuthenticated);
    
    const guestMenu = document.getElementById('guest-menu');
    const userMenuLogged = document.getElementById('user-menu-logged');
    
    console.log('Guest menu element:', guestMenu);
    console.log('User menu element:', userMenuLogged);
    
    if (isAuthenticated) {
        document.body.classList.add('user-authenticated');
        
        if (guestMenu) {
            guestMenu.style.display = 'none';
            console.log('Guest menu hidden');
        }
        
        if (userMenuLogged) {
            userMenuLogged.style.display = 'flex';
            userMenuLogged.style.alignItems = 'center';
            console.log('User menu shown');
        }
        
        updateUserInfo();
    } else {
        document.body.classList.remove('user-authenticated');
        
        if (guestMenu) {
            guestMenu.style.display = 'flex';
            guestMenu.style.alignItems = 'center';
            console.log('Guest menu shown');
        }
        
        if (userMenuLogged) {
            userMenuLogged.style.display = 'none';
            console.log('User menu hidden');
        }
    }
    
    // Setup dropdown functionality after UI update
    setTimeout(() => {
        setupDropdownFunctionality();
    }, 100);
}

// Setup Bootstrap dropdown functionality
function setupDropdownFunctionality() {
    // Remove existing event listeners to prevent duplication
    const dropdownButtons = document.querySelectorAll('[data-toggle="dropdown"]');
    
    dropdownButtons.forEach(button => {
        // Remove previous listeners
        const newButton = button.cloneNode(true);
        button.parentNode.replaceChild(newButton, button);
        
        // Add new event listener
        newButton.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const dropdown = this.parentNode.querySelector('.dropdown-menu');
            if (!dropdown) return;
            
            // Close all other dropdowns
            document.querySelectorAll('.dropdown-menu.show').forEach(otherDropdown => {
                if (otherDropdown !== dropdown) {
                    otherDropdown.classList.remove('show');
                }
            });
            
            // Toggle current dropdown
            dropdown.classList.toggle('show');
        });
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.btn-group')) {
            document.querySelectorAll('.dropdown-menu.show').forEach(dropdown => {
                dropdown.classList.remove('show');
            });
        }
    });
}

function updateUserInfo() {
    const user = getUser();
    console.log('updateUserInfo called - user data:', user);
    
    if (user) {
        const dropdownUserNameEl = document.getElementById('dropdown-user-name');
        const dropdownUserEmailEl = document.getElementById('dropdown-user-email');
        const userAvatarEl = document.getElementById('user-avatar');
        const dropdownAvatarEl = document.getElementById('dropdown-avatar');
        const userNameEl = document.getElementById('user-name');
        
        console.log('Elements found:', {
            dropdownUserNameEl,
            dropdownUserEmailEl,
            userAvatarEl,
            dropdownAvatarEl,
            userNameEl
        });
        
        // Cập nhật tên người dùng
        const displayName = user.fullname || user.name || user.email.split('@')[0];
        if (dropdownUserNameEl) dropdownUserNameEl.textContent = displayName;
        if (dropdownUserEmailEl) dropdownUserEmailEl.textContent = user.email;
        if (userNameEl) userNameEl.textContent = displayName;
        
        // Cập nhật avatar
        const avatarUrl = user.avatar || '../img/avatar-login.jpg';
        console.log('Setting avatar URL:', avatarUrl);
        
        if (userAvatarEl) {
            userAvatarEl.src = avatarUrl;
            userAvatarEl.alt = displayName;
            console.log('User avatar updated');
        }
        if (dropdownAvatarEl) {
            dropdownAvatarEl.src = avatarUrl;
            dropdownAvatarEl.alt = displayName;
            console.log('Dropdown avatar updated');
        }
    } else {
        console.log('No user data found for updateUserInfo');
    }
}

// Profile and settings functions
function viewProfile() {
    alert('Chức năng xem thông tin cá nhân đang được phát triển!');
}

function viewSettings() {
    alert('Chức năng cài đặt đang được phát triển!');
}

// Enhanced logout function
function logout() {
    if (confirm('Bạn có chắc chắn muốn đăng xuất?')) {
        // Clear session storage
        removeToken();
        removeUser();
        
        // Update UI
        updateAuthUI();
        
        // Redirect to login page
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 500);
    }
}

// Initialize authentication state when page loads
function initAuthState() {
    console.log('initAuthState called');
    
    // Wait a bit to ensure DOM is fully loaded
    setTimeout(() => {
        console.log('Calling updateAuthUI from initAuthState');
        updateAuthUI();
    }, 100);
    
    // Listen for session storage changes
    window.addEventListener('storage', function(e) {
        if (e.key === 'authToken' || e.key === 'userData') {
            console.log('Storage changed, updating auth UI');
            updateAuthUI();
        }
    });
}

// Call initAuthState when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM Content Loaded - initializing auth state');
    initAuthState();
});