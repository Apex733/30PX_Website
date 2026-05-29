
document.addEventListener('DOMContentLoaded', () => {
    // --- Mobile Menu Toggle ---
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');

            // Animate hamburger to X
            const spans = mobileMenuBtn.querySelectorAll('span');
            if (mobileMenu.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.transform = 'rotate(-45deg) translate(5px, -5px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.transform = 'none';
            }
        });

        // Close menu when clicking a link
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                spans[0].style.transform = 'none';
                spans[1].style.transform = 'none';
            });
        });
    }

    // --- Pain Points Interaction ---
    const painPointBtns = document.querySelectorAll('.pain-point-btn');
    const responseContents = document.querySelectorAll('.response-content');

    if (painPointBtns.length > 0) {
        painPointBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all buttons
                painPointBtns.forEach(b => b.classList.remove('active'));

                // Add active class to clicked button
                btn.classList.add('active');

                // Get target ID
                const targetId = btn.getAttribute('data-id');

                // Hide all responses
                responseContents.forEach(content => content.classList.remove('active'));

                // Show target response
                const targetResponse = document.getElementById(`response-${targetId}`);
                if (targetResponse) {
                    targetResponse.classList.add('active');
                }
            });
        });
    }

    // --- FAQ Accordion ---
    const faqItems = document.querySelectorAll('.faq-item');

    if (faqItems.length > 0) {
        faqItems.forEach(item => {
            const questionBtn = item.querySelector('.faq-question');

            questionBtn.addEventListener('click', () => {
                // Toggle current item
                const isActive = item.classList.contains('active');

                // Close all other items (optional: accordion behavior)
                faqItems.forEach(faq => faq.classList.remove('active'));

                if (!isActive) {
                    item.classList.add('active');
                }
            });
        });
    }

    // --- Sticky Header Scroll Effect ---
    const header = document.querySelector('.header');

    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';
            } else {
                header.style.boxShadow = 'none';
            }
        });
    }

    // --- Smooth Anchor Scrolling (Offset for Header) ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });
});
