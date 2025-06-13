// Hiệu ứng progress bar
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

// Sidebar
const sidebarToggle = document.getElementById('sidebarToggle');
const sidebarMenu = document.getElementById('sidebarMenu');
const closeSidebar = document.getElementById('closeSidebar');

sidebarToggle.addEventListener('click', () => {
  sidebarMenu.classList.toggle('active');
});

closeSidebar.addEventListener('click', () => {
  sidebarMenu.classList.remove('active');
});

// Active nav link khi scroll
const sections = document.querySelectorAll("article[id], main[id], section[id]");
const navLinks = document.querySelectorAll(".navbar-nav .nav-link");

function activateNavLink() {
  let scrollY = window.pageYOffset;

  sections.forEach(current => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 80;
    const sectionId = current.getAttribute("id");

    if (scrollY >= sectionTop - window.innerHeight / 2 && scrollY < sectionTop + sectionHeight - window.innerHeight / 2) {
      navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${sectionId}`) {
          link.classList.add("active");
        }
      });
    }
  });
}

window.addEventListener("scroll", activateNavLink);

// Active nav link khi click + đóng sidebar nếu đang mở (trên mobile)
navLinks.forEach(link => {
  link.addEventListener("click", function () {
    navLinks.forEach(l => l.classList.remove("active"));
    this.classList.add("active");

    // Đóng sidebar nếu đang mở (trên mobile)
    sidebarMenu.classList.remove("active");
  });
});
