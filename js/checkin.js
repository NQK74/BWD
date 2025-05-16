
// Khi nhấn navbar
$(document).ready(function () {
  // Mở menu
  $(".bar-toggle").click(function () {
    $("#navbarToggleExternalContent").removeClass("hide").addClass("show");
  });

  // Đóng menu với hiệu ứng trượt
  $("#close-icon").click(function () {
    // Thêm class 'hide' để trượt ra ngoài
    $("#navbarToggleExternalContent").removeClass("show").addClass("hide");

    // Sau 300ms (thời gian chuyển động), xóa luôn class 'hide' để reset trạng thái
    setTimeout(() => {
      $("#navbarToggleExternalContent").removeClass("hide");
    }, 300);
  });

  // Counter animation (giữ nguyên)
  function animateCounter($element, duration = 3000) {
    const target = +$element.data("counter");
    $({ countNum: 0 }).animate(
      { countNum: target },
      {
        duration: duration,
        easing: "swing",
        step: function () {
          $element.text(Math.floor(this.countNum));
        },
        complete: function () {
          $element.text(this.countNum);
        }
      }
    );
  }

  $(".counter").each(function () {
    animateCounter($(this));
  });
});


// Khi nhấn vào nút "Xem thêm"

// Lấy tất cả các button và menu dropdown
const btnSuccess = document.querySelectorAll('.btn-success');
const dropdownMenus = document.querySelectorAll('.dropdown-menu');

// Lặp qua tất cả các button và menu dropdown
avartarButton.forEach((btnSuccess, index) => {
  const dropdownMenu = dropdownMenus[index]; // Lấy menu tương ứng với button
  // Khi click vào button, hiển thị/ẩn menu
  avartarButton.addEventListener('click', function (event) {
    const isVisible = dropdownMenu.style.display === 'block';
    dropdownMenu.style.display = isVisible ? 'none' : 'block';
    event.stopPropagation(); // Ngừng sự kiện nổi bọt để tránh đóng menu nếu click bên ngoài
  });

  // Ngừng đóng menu khi click vào chính menu dropdown
  dropdownMenu.addEventListener('click', function (event) {
    event.stopPropagation();
  });
});
// Đóng tất cả các menu khi click ra ngoài
window.addEventListener('click', function () {
  dropdownMenus.forEach((dropdownMenu) => {
    dropdownMenu.style.display = 'none';
  });
});



// Đếm

const counter = document.querySelectorAll('.counter');
counters.forEach(counter => {
  const updateCount = () => {
    const target = +counter.getAttribute('data-count');
    const count = +counter.innerText;
    const increment = target / 200; // speed control

    if (count < target) {
      counter.innerText = Math.ceil(count + increment);
      setTimeout(updateCount, 10);
    } else {
      counter.innerText = target;
    }
  };
  updateCount();
});

// Đếm 

const counters = document.querySelectorAll('.counter');

const startCounting = (counter) => {
  counter.innerText = '0';
  const target = +counter.getAttribute('data-target');

  const updateCount = () => {
    const count = +counter.innerText;
    const increment = target / 200;

    if (count < target) {
      counter.innerText = Math.ceil(count + increment);
      setTimeout(updateCount, 10);
    } else {
      counter.innerText = target;
    }
  };

  updateCount();
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      startCounting(entry.target);
    }
  });
}, {
  threshold: 0 // 70% trong tầm nhìn mới đếm
});

counters.forEach(counter => {
  observer.observe(counter);
});