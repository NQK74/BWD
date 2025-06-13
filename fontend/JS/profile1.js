function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top <= window.innerHeight &&
    rect.bottom >= 0
  );
}

function animateProgress() {
  const bars = document.querySelectorAll('.progress-bar');
  bars.forEach(bar => {
    const target = bar.getAttribute('data-percent');
    if (!bar.classList.contains('animated') && isInViewport(bar)) {
      bar.classList.add('animated');
      let count = 0;
      const interval = setInterval(() => {
        if (count >= target) {
          clearInterval(interval);
        } else {
          count++;
          bar.style.width = count + '%';
          bar.innerText = count + '%';
        }
      }, 10);
    }
  });
}

window.addEventListener('scroll', animateProgress);
window.addEventListener('load', animateProgress);
// sidebar
const sidebarToggle = document.getElementById('sidebarToggle');
const sidebarMenu = document.getElementById('sidebarMenu');
const closeSidebar = document.getElementById('closeSidebar');

sidebarToggle.addEventListener('click', () => {
  sidebarMenu.classList.toggle('active');
});

closeSidebar.addEventListener('click', () => {
  sidebarMenu.classList.remove('active');
});
// lấy tất cả section có id
const sections = document.querySelectorAll("article[id], main[id], section[id]");
const navLinks = document.querySelectorAll(".navbar-nav .nav-link");

// hàm cập nhật active link
function activateNavLink() {
  let scrollY = window.pageYOffset;

  sections.forEach(current => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 80; // trừ padding-top của header
    const sectionId = current.getAttribute("id");

    if (scrollY >= sectionTop - window.innerHeight / 2 && scrollY < sectionTop + sectionHeight - window.innerHeight / 2) {

      // active link
      navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${sectionId}`) {
          link.classList.add("active");
        }
      });
    }
  });
}

// chạy hàm khi scroll
window.addEventListener("scroll", activateNavLink);

// khi click menu → active luôn + smooth scroll
navLinks.forEach(link => {
  link.addEventListener("click", function () {
    navLinks.forEach(l => l.classList.remove("active"));
    this.classList.add("active");
  });
});
//gửi email
document.getElementById('contactForm').addEventListener('submit', function (e) {
  e.preventDefault();

  emailjs.send('service_user1', 'template_2vyhnvh', {
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    message: document.getElementById('message').value,
    reason: document.getElementById('reason').value,
    subject: document.getElementById('reason').options[document.getElementById('reason').selectedIndex].text
  })
    .then(function (response) {
      alert('Gửi thành công!');
    }, function (error) {
      alert('Gửi thất bại:', error);
    });
});
