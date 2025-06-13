function toggleLike(button) {
  const likeText = button.querySelector('.like-text');
  const countSpan = button.querySelector('.like-count');
  let count = parseInt(button.dataset.count, 10) || 0;

  const isLiked = button.classList.toggle('liked');

  if (isLiked) {
    likeText.textContent = 'Liked';
    count++;
    button.style.color = '#e74c3c';
  } else {
    likeText.textContent = 'Like';
    count = Math.max(0, count - 1); // không để số âm
    button.style.color = '';
  }

  button.dataset.count = count;
  countSpan.textContent = count;
}


function markAllRead() {
  const notis = document.querySelectorAll('.notification-list li');
  notis.forEach(noti => {
    noti.style.opacity = '0.5';
  });
}

// Lọc theo loại thông báo
document.getElementById('filter').addEventListener('change', function () {
  const type = this.value;
  const notis = document.querySelectorAll('.notification-list li');

  notis.forEach(noti => {
    if (type === 'all' || noti.dataset.type === type) {
      noti.style.display = 'flex';
    } else {
      noti.style.display = 'none';
    }
  });
});


window.addEventListener('scroll', function() {
  var searchContainer = document.querySelector('.global-search-container');
  
  if (window.scrollY > 0) {
    searchContainer.style.top = '0'; /* Khi cuộn xuống, phần tử vẫn ở vị trí cố định */
  } else {
    searchContainer.style.top = '20px'; /* Khi cuộn lên đầu trang, giữ khoảng cách với đỉnh */
  }
});

function expandNotifications() {
  const list = document.getElementById("notificationList");
  list.classList.remove("collapsed");
  document.getElementById("seeAllBtn").style.display = "none";
}

// Khi tải trang, áp dụng chế độ thu gọn nếu > 4 thông báo
document.addEventListener("DOMContentLoaded", function () {
  const list = document.getElementById("notificationList");
  const items = list.querySelectorAll("li");

  if (items.length > 4) {
    list.classList.add("collapsed");
  } else {
    document.getElementById("seeAllBtn").style.display = "none";
  }
});

// Toggle navbar và sidebar trên mobile
document.addEventListener("DOMContentLoaded", function () {
  const toggleNav = document.getElementById("toggleNav");
  const toggleSidebar = document.getElementById("toggleSidebar");
  const navbar = document.querySelector(".navbar");
  const sidebar = document.querySelector(".sidebar");

  toggleNav.addEventListener("click", function () {
    navbar.classList.toggle("show");
    sidebar.classList.remove("show");
  });

  toggleSidebar.addEventListener("click", function () {
    sidebar.classList.toggle("show");
    navbar.classList.remove("show");
  });
});
