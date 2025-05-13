// Main JavaScript file for Vietnam Culture website

document.addEventListener('DOMContentLoaded', () => {
    // Back to top button functionality
    const backToTopButton = document.getElementById('back-to-top');
    
    // Show back to top button when user scrolls down
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopButton.style.display = 'flex';
        } else {
            backToTopButton.style.display = 'none';
        }
    });
    
    // Smooth scroll to top when button is clicked
    backToTopButton.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 60, // Offset for navbar
                    behavior: 'smooth'
                });
                
                // Update active nav item
                document.querySelectorAll('.nav-link').forEach(navLink => {
                    navLink.classList.remove('active');
                });
                this.classList.add('active');
            }
        });
    });
    
    // Active nav item on scroll
    window.addEventListener('scroll', () => {
        let current = '';
        const sections = document.querySelectorAll('section');
        const navHeight = 70;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - navHeight;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop) {
                current = section.getAttribute('id');
            }
        });
        
        document.querySelectorAll('.nav-link').forEach(navLink => {
            navLink.classList.remove('active');
            if (navLink.getAttribute('href') === `#${current}`) {
                navLink.classList.add('active');
            }
        });
    });
    
    // Animation on scroll
    const sectionAnimations = document.querySelectorAll('.section-animation');
    
    // Initial check for elements in view
    checkSectionAnimations();
    
    // Check elements in view on scroll
    window.addEventListener('scroll', checkSectionAnimations);
    
    function checkSectionAnimations() {
        const triggerBottom = window.innerHeight * 0.8;
        
        sectionAnimations.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            
            if (sectionTop < triggerBottom) {
                section.classList.add('visible');
            }
        });
    }
    
    // Gallery lightbox
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const imgSrc = item.querySelector('img').getAttribute('src');
            const imgTitle = item.querySelector('h4').textContent;
            const imgDesc = item.querySelector('p').textContent;
            
            openLightbox(imgSrc, imgTitle, imgDesc);
        });
    });
    
    function openLightbox(src, title, desc) {
        // Create lightbox elements
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        
        lightbox.innerHTML = `
            <div class="lightbox-content">
                <span class="close-lightbox">&times;</span>
                <img src="${src}" alt="${title}">
                <div class="lightbox-caption">
                    <h4>${title}</h4>
                    <p>${desc}</p>
                </div>
            </div>
        `;
        
        // Add lightbox to body
        document.body.appendChild(lightbox);
        
        // Add lightbox styles
        lightbox.style.display = 'flex';
        lightbox.style.position = 'fixed';
        lightbox.style.top = '0';
        lightbox.style.left = '0';
        lightbox.style.width = '100%';
        lightbox.style.height = '100%';
        lightbox.style.backgroundColor = 'rgba(0,0,0,0.9)';
        lightbox.style.zIndex = '1000';
        lightbox.style.justifyContent = 'center';
        lightbox.style.alignItems = 'center';
        
        const lightboxContent = lightbox.querySelector('.lightbox-content');
        lightboxContent.style.position = 'relative';
        lightboxContent.style.maxWidth = '80%';
        lightboxContent.style.animation = 'zoomIn 0.3s ease';
        
        const closeBtn = lightbox.querySelector('.close-lightbox');
        closeBtn.style.position = 'absolute';
        closeBtn.style.top = '10px';
        closeBtn.style.right = '20px';
        closeBtn.style.fontSize = '30px';
        closeBtn.style.color = 'white';
        closeBtn.style.cursor = 'pointer';
        
        const lightboxCaption = lightbox.querySelector('.lightbox-caption');
        lightboxCaption.style.backgroundColor = 'rgba(0,0,0,0.7)';
        lightboxCaption.style.padding = '15px';
        lightboxCaption.style.color = 'white';
        lightboxCaption.style.width = '100%';
        lightboxCaption.style.position = 'absolute';
        lightboxCaption.style.bottom = '0';
        lightboxCaption.style.left = '0';
        lightboxCaption.style.textAlign = 'center';
        
        // Close lightbox on click
        closeBtn.addEventListener('click', () => {
            document.body.removeChild(lightbox);
        });
        
        // Close lightbox when clicking outside content
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                document.body.removeChild(lightbox);
            }
        });
    }
    
    // Form submissions
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form values
            const name = contactForm.querySelector('input[type="text"]').value;
            const email = contactForm.querySelector('input[type="email"]').value;
            const message = contactForm.querySelector('textarea').value;
            
            // Basic validation
            if (name && email && message) {
                // Here you would typically send the form data to a server
                // For demo purposes, we'll just show a success message
                showFormSubmissionMessage('Cảm ơn bạn đã liên hệ với chúng tôi! Chúng tôi sẽ phản hồi trong thời gian sớm nhất.');
                contactForm.reset();
            } else {
                showFormSubmissionMessage('Vui lòng điền đầy đủ thông tin.', false);
            }
        });
    }
    
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const email = newsletterForm.querySelector('input[type="email"]').value;
            
            if (email) {
                showFormSubmissionMessage('Cảm ơn bạn đã đăng ký nhận tin! Bạn sẽ nhận được những thông tin mới nhất về văn hóa Việt Nam.');
                newsletterForm.reset();
            } else {
                showFormSubmissionMessage('Vui lòng nhập địa chỉ email của bạn.', false);
            }
        });
    }
    
    function showFormSubmissionMessage(message, success = true) {
        const alertDiv = document.createElement('div');
        alertDiv.className = `alert ${success ? 'alert-success' : 'alert-danger'} alert-dismissible fade show mt-3`;
        alertDiv.role = 'alert';
        
        alertDiv.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        `;
        
        // Find the form that was submitted
        const form = event.target;
        form.parentNode.insertBefore(alertDiv, form.nextSibling);
        
        // Remove the alert after 5 seconds
        setTimeout(() => {
            alertDiv.remove();
        }, 5000);
    }
    
    // Initialize section animations for elements already in view
    sectionAnimations.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        if (sectionTop < window.innerHeight) {
            section.classList.add('visible');
        }
    });
    
    // Add section-animation class to sections if not already added in HTML
    document.querySelectorAll('section').forEach(section => {
        if (!section.classList.contains('section-animation')) {
            const children = section.querySelectorAll('.row, .section-title');
            children.forEach(child => {
                if (!child.classList.contains('section-animation')) {
                    child.classList.add('section-animation');
                    // Check if in view
                    const childTop = child.getBoundingClientRect().top;
                    if (childTop < window.innerHeight * 0.8) {
                        child.classList.add('visible');
                    }
                }
            });
        }
    });
});