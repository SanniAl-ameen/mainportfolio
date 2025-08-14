 // Mobile menu toggle
        document.getElementById('menu-btn').addEventListener('click', function() {
            document.getElementById('mobile-menu').classList.toggle('hidden');
        });
        
        // Close mobile menu when clicking a link
        document.querySelectorAll('#mobile-menu a').forEach(link => {
            link.addEventListener('click', function() {
                document.getElementById('mobile-menu').classList.add('hidden');
            });
        });
        
        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });
        
        // Initialize ScrollReveal
        ScrollReveal().reveal('.gradient-text', {
            delay: 200,
            duration: 1000,
            distance: '20px',
            origin: 'bottom',
            opacity: 0,
            easing: 'cubic-bezier(0.5, 0, 0, 1)',
        });
        
        ScrollReveal().reveal('nav', {
            delay: 100,
            duration: 800,
            distance: '20px',
            origin: 'top',
            opacity: 0,
            easing: 'ease-in-out',
        });
        
        ScrollReveal().reveal('#home h1, #home h2', {
            delay: 300,
            duration: 1000,
            distance: '20px',
            origin: 'left',
            opacity: 0,
            easing: 'ease-in-out',
            interval: 100
        });
        
        ScrollReveal().reveal('#home p, #home a', {
            delay: 500,
            duration: 1000,
            distance: '20px',
            origin: 'left',
            opacity: 0,
            easing: 'ease-in-out',
            interval: 100
        });
        
        ScrollReveal().reveal('section', {
            delay: 200,
            duration: 800,
            distance: '20px',
            origin: 'bottom',
            opacity: 0,
            easing: 'ease-in-out',
            interval: 100
        });
        
        // Animate skill bars on scroll
        const skillBars = document.querySelectorAll('.skill-bar');
        
        function animateSkillBars() {
            skillBars.forEach(bar => {
                const width = bar.style.width;
                bar.style.width = '0';
                setTimeout(() => {
                    bar.style.width = width;
                }, 100);
            });
        }
        
        // Intersection Observer for skill bars
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateSkillBars();
                    observer.unobserve(entry.target);
                }
            });
        }, {threshold: 0.5});
        
        document.querySelectorAll('#skills').forEach(section => {
            observer.observe(section);
        });

        // Load more projects functionality
        document.getElementById('load-more-btn').addEventListener('click', function() {
            const moreProjects = document.getElementById('more-projects');
            const portfolioGrid = document.getElementById('portfolio-grid');
            
            // Show loading state
            this.innerHTML = '<div class="loader"></div>';
            
            // Simulate loading delay for better UX
            setTimeout(() => {
                // Append all hidden projects to the grid
                while (moreProjects.firstChild) {
                    portfolioGrid.appendChild(moreProjects.firstChild);
                }
                
                // Hide the button after loading
                this.style.display = 'none';
                
                // Reinitialize ScrollReveal for the new elements
                ScrollReveal().reveal('.project-card', {
                    delay: 200,
                    duration: 800,
                    distance: '20px',
                    origin: 'bottom',
                    opacity: 0,
                    easing: 'ease-in-out',
                    interval: 100
                });
            }, 800);
        });

        // Image modal functionality
        function openModal(imageSrc, captionText) {
            const modal = document.getElementById('imageModal');
            const modalImg = document.getElementById('modalImage');
            const caption = document.getElementById('caption');
            
            modal.style.display = 'flex';
            modal.style.alignItems = 'center';
            modal.style.justifyContent = 'center';
            modalImg.src = imageSrc;
            caption.innerHTML = captionText;
            
            // Close modal when clicking outside the image
            modal.onclick = function(event) {
                if (event.target === modal) {
                    closeModal();
                }
            };
        }
        
        function closeModal() {
            document.getElementById('imageModal').style.display = 'none';
        }
        
        // Close modal with ESC key
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape') {
                closeModal();
            }
        });

        // Contact form submission
        const form = document.getElementById('contact-form');
        const formStatus = document.getElementById('form-status');
        
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show loading state
            const submitButton = form.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.innerHTML;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitButton.disabled = true;
            
            // Get form data
            const formData = new FormData(this);
            
            // Send form data using Formspree
            fetch(form.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    formStatus.textContent = 'Thank you for your message! I will get back to you soon.';
                    formStatus.classList.remove('hidden', 'bg-red-100', 'text-red-700');
                    formStatus.classList.add('bg-green-100', 'text-green-700');
                    form.reset();
                } else {
                    throw new Error('Network response was not ok');
                }
            })
            .catch(error => {
                formStatus.textContent = 'There was a problem sending your message. Please try again later or contact me directly at sannialameenayomikun@gmail.com';
                formStatus.classList.remove('hidden', 'bg-green-100', 'text-green-700');
                formStatus.classList.add('bg-red-100', 'text-red-700');
                console.error('Error:', error);
            })
            .finally(() => {
                submitButton.innerHTML = originalButtonText;
                submitButton.disabled = false;
                formStatus.classList.remove('hidden');
                
                // Hide status message after 5 seconds
                setTimeout(() => {
                    formStatus.classList.add('hidden');
                }, 5000);
            });
        });


        // Dark/Light mode toggle
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const htmlElement = document.documentElement;

// Check for saved user preference or use system preference
const savedTheme = localStorage.getItem('theme') || 
                  (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

// Apply the saved theme
if (savedTheme === 'dark') {
    htmlElement.classList.add('dark');
    themeIcon.classList.replace('fa-moon', 'fa-sun');
} else {
    htmlElement.classList.remove('dark');
    themeIcon.classList.replace('fa-sun', 'fa-moon');
}

// Toggle theme on button click
themeToggle.addEventListener('click', () => {
    htmlElement.classList.toggle('dark');
    
    if (htmlElement.classList.contains('dark')) {
        themeIcon.classList.replace('fa-moon', 'fa-sun');
        localStorage.setItem('theme', 'dark');
    } else {
        themeIcon.classList.replace('fa-sun', 'fa-moon');
        localStorage.setItem('theme', 'light');
    }
});