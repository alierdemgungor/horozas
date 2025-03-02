// Handle sticky header
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Handle smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Handle FAQ accordion
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent event bubbling
        
        // Get the parent faq-item of the clicked question
        const clickedItem = question.closest('.faq-item');
        
        // If this item is already active, just close it
        if (clickedItem.classList.contains('active')) {
            clickedItem.classList.remove('active');
            return;
        }
        
        // Close all FAQ items
        document.querySelectorAll('.faq-item').forEach(item => {
            item.classList.remove('active');
        });
        
        // Open only the clicked item
        clickedItem.classList.add('active');
    });
});

// Handle contact form submission
const contactForm = document.getElementById('contact-form');
const formSuccess = document.getElementById('form-success');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Get form data
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value
    };

    try {
        // Here you would typically send the form data to your backend
        // For now, we'll simulate a successful submission
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Show success message
        contactForm.style.display = 'none';
        formSuccess.style.display = 'block';

        // Clear form
        contactForm.reset();

        // Hide success message after 5 seconds and show form again
        setTimeout(() => {
            formSuccess.style.display = 'none';
            contactForm.style.display = 'block';
        }, 5000);

    } catch (error) {
        console.error('Error submitting form:', error);
        alert('There was an error submitting the form. Please try again later.');
    }
});

// Mobile navigation toggle
const mobileNav = () => {
    const navLinks = document.querySelector('.nav-links');
    const isMobile = window.innerWidth <= 768;

    if (isMobile) {
        navLinks.style.display = navLinks.style.display === 'none' ? 'flex' : 'none';
    }
};

// Initialize mobile navigation
document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelector('.nav-links');
    if (window.innerWidth <= 768) {
        navLinks.style.display = 'none';
    }
});

// Handle window resize for mobile navigation
window.addEventListener('resize', () => {
    const navLinks = document.querySelector('.nav-links');
    if (window.innerWidth > 768) {
        navLinks.style.display = 'flex';
    } else {
        navLinks.style.display = 'none';
    }
});

// Add mobile menu button click handler
document.querySelector('.cta-button').addEventListener('click', () => {
    const contactSection = document.querySelector('#contact');
    contactSection.scrollIntoView({ behavior: 'smooth' });
});

// References Slider
document.addEventListener('DOMContentLoaded', () => {
    const slider = document.querySelector('.references-container');
    const slides = document.querySelectorAll('.reference-card');
    const dots = document.querySelectorAll('.dot');
    const prevButton = document.querySelector('.slider-arrow.prev');
    const nextButton = document.querySelector('.slider-arrow.next');
    
    let currentSlide = 0;
    const slideCount = slides.length;
    
    function updateSlider() {
        // Update slide positions
        slider.style.transform = `translateX(-${currentSlide * 100}%)`;
        
        // Update active states
        slides.forEach((slide, index) => {
            slide.classList.toggle('active', index === currentSlide);
        });
        
        // Update dots
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
        
        // Update arrow states
        prevButton.style.opacity = currentSlide === 0 ? '0.5' : '1';
        prevButton.style.pointerEvents = currentSlide === 0 ? 'none' : 'auto';
        
        nextButton.style.opacity = currentSlide === slideCount - 1 ? '0.5' : '1';
        nextButton.style.pointerEvents = currentSlide === slideCount - 1 ? 'none' : 'auto';
    }
    
    function nextSlide() {
        if (currentSlide < slideCount - 1) {
            currentSlide++;
            updateSlider();
        }
    }
    
    function prevSlide() {
        if (currentSlide > 0) {
            currentSlide--;
            updateSlider();
        }
    }
    
    // Event listeners
    nextButton.addEventListener('click', nextSlide);
    prevButton.addEventListener('click', prevSlide);
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            updateSlider();
        });
    });
    
    // Initialize slider
    updateSlider();
    
    // Auto-slide every 5 seconds
    const autoSlideInterval = setInterval(() => {
        if (currentSlide === slideCount - 1) {
            currentSlide = 0;
        } else {
            currentSlide++;
        }
        updateSlider();
    }, 5000);
    
    // Pause auto-slide on hover
    slider.addEventListener('mouseenter', () => {
        clearInterval(autoSlideInterval);
    });
});

// Function to handle catalogue download with email collection
function handleCatalogueForm() {
    const catalogueForm = document.querySelector('.catalogue-form');
    catalogueForm.classList.toggle('active');
}

// Function to handle form submission and download
function handleDownloadSubmit(e) {
    e.preventDefault();
    const email = document.querySelector('#download-email').value;
    
    // Store the email (you would typically send this to your backend)
    console.log('Customer email collected:', email);
    
    // Show success message
    alert('Thank you! Your download will begin shortly.');
    
    // Trigger the download
    const pdfPath = 'assets/catalogue.pdf';
    const link = document.createElement('a');
    link.href = pdfPath;
    link.download = 'TowelCraft_Catalogue.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Reset and close the form
    e.target.reset();
    document.querySelector('.catalogue-form').classList.remove('active');
}

// Close form when clicking outside
document.addEventListener('click', (e) => {
    const catalogueForm = document.querySelector('.catalogue-form');
    const catalogueBtn = document.querySelector('.catalogue-btn');
    const catalogueBtnInline = document.querySelector('.catalogue-btn-inline');
    
    if (!catalogueForm.contains(e.target) && 
        e.target !== catalogueBtn && 
        e.target !== catalogueBtnInline && 
        !catalogueBtn.contains(e.target) && 
        !catalogueBtnInline.contains(e.target)) {
        catalogueForm.classList.remove('active');
    }
});

// Add event listeners
document.addEventListener('DOMContentLoaded', () => {
    const catalogueBtn = document.querySelector('.catalogue-btn');
    const catalogueBtnInline = document.querySelector('.catalogue-btn-inline');
    const downloadForm = document.querySelector('#download-form');

    if (catalogueBtn) {
        catalogueBtn.addEventListener('click', handleCatalogueForm);
    }
    
    if (catalogueBtnInline) {
        catalogueBtnInline.addEventListener('click', handleCatalogueForm);
    }
    
    if (downloadForm) {
        downloadForm.addEventListener('submit', handleDownloadSubmit);
    }
}); 