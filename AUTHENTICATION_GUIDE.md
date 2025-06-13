# Vietnamese Culture Website - Authentication System Guide

## 🚀 Features Implemented

### Dynamic User Authentication Menu

- **Before Login**: Shows user icon with "Đăng Nhập" (Login) and "Đăng Ký" (Register) dropdown options
- **After Login**: Shows user avatar with name and dropdown containing profile info and "Đăng xuất" (Logout) option
- **Responsive Design**: Dropdown automatically adjusts position on mobile/small screens to prevent overflow
- **Cross-tab Synchronization**: Authentication state syncs across browser tabs

## 🎯 How to Test

### 1. Test with Demo Account (Development Mode)

1. Open `index.html` in your browser
2. Look for the green "Test Login" button in the bottom-left corner
3. Click it to simulate a successful login
4. Watch the user menu dynamically change to show the authenticated state

### 2. Test with Real Backend

1. Start your backend server (`npm start` in the backend folder)
2. Navigate to the login page via the dropdown menu
3. Use the registration/login forms as normal
4. The system will automatically update the UI upon successful authentication

## 🔧 File Structure

### Key Files Modified:

- `fontend/html/index.html` - Dynamic user menu HTML structure
- `fontend/JS/auth.js` - Authentication logic and UI state management
- `fontend/css/index-style.css` - User menu styling and responsive design
- `fontend/html/login.html` - Login/registration forms

## 🎨 UI Components

### Guest Menu (Not Logged In)

```html
<div id="guest-menu">
  <button type="button" class="btn dropdown-toggle">
    <i class="bi bi-person-fill"></i>
  </button>
  <div class="dropdown-menu">
    <a class="dropdown-item" href="login.html#login-form">Đăng Nhập</a>
    <a class="dropdown-item" href="login.html#register-form">Đăng Ký</a>
  </div>
</div>
```

### User Menu (Logged In)

```html
<div id="user-menu-logged">
  <button type="button" class="btn dropdown-toggle user-avatar-btn">
    <img src="../img/avatar-demo.jpg" alt="User Avatar" class="user-avatar" />
    <span class="user-name">User Name</span>
  </button>
  <div class="dropdown-menu">
    <div class="dropdown-header">
      <!-- User info display -->
    </div>
    <a class="dropdown-item" href="#profile">Thông tin cá nhân</a>
    <a class="dropdown-item" href="#settings">Cài đặt</a>
    <a class="dropdown-item text-danger" onclick="logout()">Đăng xuất</a>
  </div>
</div>
```

## 📱 Responsive Features

### Mobile Optimization

- User name hides on screens < 768px width
- Dropdown repositions to prevent overflow
- Avatar size reduces on mobile devices
- Touch-friendly button sizes

### Responsive Breakpoints

- **≤ 480px**: Minimum dropdown width with condensed layout
- **≤ 576px**: Optimized for mobile phones
- **≤ 768px**: Tablet-friendly adjustments
- **> 768px**: Full desktop experience

## 🔐 Authentication Functions

### Core Functions in `auth.js`:

- `updateAuthUI()` - Updates menu based on authentication state
- `updateUserInfo()` - Refreshes user information in menu
- `testLogin()` - Development function for testing (remove in production)
- `logout()` - Enhanced logout with confirmation
- `initAuthState()` - Initialize authentication state on page load
- `adjustDropdownPosition()` - Smart dropdown positioning

### Local Storage Management:

- `saveToken(token)` - Save authentication token
- `getToken()` - Retrieve authentication token
- `saveUser(user)` - Save user information
- `getUser()` - Retrieve user information
- `checkAuth()` - Check if user is authenticated

## 🎯 Development Notes

### Test Login Button

- **Location**: Bottom-left corner (green button)
- **Purpose**: Simulate login without backend
- **User Created**: "Người dùng test" with test@example.com
- **⚠️ IMPORTANT**: Remove this button before production deployment!

### Production Deployment

1. Remove the test login button from `index.html`:

   ```html
   <!-- Remove this section -->
   <button onclick="testLogin()" class="test-login-btn">Test Login</button>
   ```

2. Remove the test login CSS from `index-style.css`:

   ```css
   /* Remove this section */
   .test-login-btn {
     ...;
   }
   ```

3. Remove or comment out the `testLogin()` function in `auth.js`

## 🔄 Cross-Browser Compatibility

- ✅ Chrome 80+
- ✅ Firefox 75+
- ✅ Safari 13+
- ✅ Edge 80+

## 🛠️ Troubleshooting

### Common Issues:

1. **Dropdown not showing**: Check Bootstrap 4.x is properly loaded
2. **Authentication state not updating**: Verify `auth.js` is included after jQuery
3. **Mobile positioning issues**: Clear browser cache and test on actual mobile device
4. **Cross-tab sync not working**: Check localStorage permissions in browser

### Debug Tips:

- Open browser console to see authentication debug logs
- Check localStorage for `authToken` and `userData` entries
- Verify CSS classes are applied correctly using browser developer tools

## 🎉 Success!

Your Vietnamese culture website now has a fully functional, responsive authentication system that provides an excellent user experience across all devices!

### Next Steps:

1. Test thoroughly on different devices and browsers
2. Remove development/test code before production
3. Integrate with your backend authentication API
4. Consider adding more user profile features

---

_Developed with ❤️ for Vietnamese Culture Website_
