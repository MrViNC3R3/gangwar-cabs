// Gulati Cab Website JavaScript - Fixed Version

document.addEventListener('DOMContentLoaded', function() {
    console.log('Initializing Gulati Cab website...');
    
    // Initialize all functionality
    initMobileMenu();
    initFAQ();
    initBookingForm();
    initRouteBookingForm();
    initRouteLinks();
    initSmoothScrolling();
    initDatePicker();
    initPhoneLinks();
    
    console.log('Gulati Cab website loaded successfully!');
});

// Mobile Menu Functionality
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const nav = document.getElementById('nav');
    
    if (mobileMenuBtn && nav) {
        mobileMenuBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            nav.classList.toggle('mobile-open');
            
            // Toggle menu icon
            const icon = mobileMenuBtn.querySelector('i');
            if (nav.classList.contains('mobile-open')) {
                icon.className = 'fas fa-times';
            } else {
                icon.className = 'fas fa-bars';
            }
        });
        
        // Close mobile menu when clicking nav links
        const navLinks = nav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                nav.classList.remove('mobile-open');
                const menuIcon = mobileMenuBtn.querySelector('i');
                if (menuIcon) {
                    menuIcon.className = 'fas fa-bars';
                }
            });
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!mobileMenuBtn.contains(e.target) && !nav.contains(e.target)) {
                nav.classList.remove('mobile-open');
                const menuIcon = mobileMenuBtn.querySelector('i');
                if (menuIcon) {
                    menuIcon.className = 'fas fa-bars';
                }
            }
        });
    }
}

// FAQ Accordion Functionality - Fixed
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        if (question) {
            question.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                // Close all other FAQ items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item && otherItem.classList.contains('active')) {
                        otherItem.classList.remove('active');
                    }
                });
                
                // Toggle current item
                item.classList.toggle('active');
            });
        }
    });
}

// Phone Links Functionality
function initPhoneLinks() {
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    phoneLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Allow default behavior for tel: links
            console.log('Initiating phone call to:', this.href);
        });
    });
}

// Booking Form Functionality - Fixed
function initBookingForm() {
    const bookingForm = document.getElementById('booking-form');
    
    if (bookingForm) {
        // Visual focus styling (optional)
        const inputs = bookingForm.querySelectorAll('input, select');
        inputs.forEach(input => {
            input.addEventListener('focus', function() {
                this.style.outline = '2px solid var(--color-primary)';
            });
            input.addEventListener('blur', function() {
                this.style.outline = '';
            });
        });
        
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Stop default submit initially

            // Gather form data for validation
            const formData = new FormData(bookingForm);
            const bookingData = {};
            for (let [key, value] of formData.entries()) {
                bookingData[key] = value;
            }
            
            // Validate
            if (validateBookingForm(bookingData)) {
                // Optional: show loading state
                const submitBtn = bookingForm.querySelector('button[type="submit"]');
                showLoadingState(submitBtn);

                setTimeout(() => {
                    // Remove loading state immediately before submit
                    hideLoadingState(submitBtn);
                    bookingForm.submit(); // Native POST to Formspree
                }, 600);
            }
            // If invalid, showValidationErrors will handle it
        });
    }
}


// Route Booking Form Functionality - Fixed
function initRouteBookingForm() {
    const routeBookingForm = document.getElementById('route-booking-form');
    if (routeBookingForm) {
        routeBookingForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Always intercept first for validation

            // Gather form data
            const formData = new FormData(routeBookingForm);
            const bookingData = {};
            for (let [key, value] of formData.entries()) {
                bookingData[key] = value;
            }

            // Your custom validation
            if (validateBookingForm(bookingData)) {
                // Optional: show loading indicator before submit (UI feedback)
                const submitBtn = routeBookingForm.querySelector('button[type="submit"]');
                showLoadingState(submitBtn);

                // Remove loading feedback before submit (optional, or after submit if you like)
                setTimeout(() => {
                    hideLoadingState(submitBtn);
                    // Actually submit the form to Formspree via standard HTTP POST
                    routeBookingForm.submit();
                }, 600); // fast, but lets button UI show briefly
            }
            // If invalid, validation errors are shown by validateBookingForm
        });
    }
}


// Route Links Functionality - Fixed
function initRouteLinks() {
    const routeLinks = document.querySelectorAll('.route-link');
    
    routeLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const route = this.getAttribute('data-route');
            const distance = this.getAttribute('data-distance');
            const time = this.getAttribute('data-time');
            const price = this.getAttribute('data-price');
            
            console.log('Route link clicked:', { route, distance, time, price });
            
            if (route && distance && time && price) {
                showRoutePage(route, distance, time, price);
                trackRouteView(route);
            } else {
                console.error('Missing route data attributes');
            }
        });
    });
}

// Show Route Page - Fixed
function showRoutePage(route, distance, time, price) {
    const routePage = document.getElementById('route-page');
    const mainContent = document.querySelector('main');
    const header = document.querySelector('.header');
    const footer = document.querySelector('.footer');
    
    if (routePage) {
        // Update route page content
        const routeTitle = document.getElementById('route-title');
        const routeDistance = document.getElementById('route-distance');
        const routeTime = document.getElementById('route-time');
        const routePrice = document.getElementById('route-price');
        const routeDestination = document.getElementById('route-destination');
        const destinationMarker = document.getElementById('destination-marker');
        
        const destinationName = route.charAt(0).toUpperCase() + route.slice(1);
        
        if (routeTitle) routeTitle.textContent = `Bareilly to ${destinationName}`;
        if (routeDistance) routeDistance.textContent = distance;
        if (routeTime) routeTime.textContent = time;
        if (routePrice) routePrice.textContent = price;
        if (routeDestination) routeDestination.value = destinationName;
        if (destinationMarker) destinationMarker.textContent = destinationName;
        
        // Show route page and hide main content
        routePage.style.display = 'block';
        if (mainContent) mainContent.style.display = 'none';
        if (footer) footer.style.display = 'none';
        
        // Scroll to top
        window.scrollTo(0, 0);
        
        console.log(`Navigated to route: Bareilly to ${destinationName}`);
        
        // Initialize date picker for route form
        initDatePicker();
    } else {
        console.error('Route page element not found');
    }
}

// Go back to main page - Fixed
function goBack() {
    const routePage = document.getElementById('route-page');
    const mainContent = document.querySelector('main');
    const footer = document.querySelector('.footer');
    
    if (routePage) routePage.style.display = 'none';
    if (mainContent) mainContent.style.display = 'block';
    if (footer) footer.style.display = 'block';
    
    // Scroll to top
    window.scrollTo(0, 0);
    
    console.log('Returned to main page');
}

// Smooth Scrolling Navigation - Fixed
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const header = document.querySelector('.header');
                const headerHeight = header ? header.offsetHeight : 80;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: Math.max(0, targetPosition),
                    behavior: 'smooth'
                });
                
                console.log(`Scrolled to section: ${targetId}`);
            } else {
                console.warn(`Target element not found: ${targetId}`);
            }
        });
    });
}

// Initialize Date Picker - Fixed
function initDatePicker() {
    const dateInputs = document.querySelectorAll('input[type="date"]');
    const today = new Date();
    const todayString = today.toISOString().split('T')[0];
    
    dateInputs.forEach(input => {
        input.min = todayString;
        if (!input.value) {
            input.value = todayString;
        }
    });
}

// Form Validation - Enhanced
function validateBookingForm(data) {
    const errors = [];
    
    // Required field validation
    if (!data.pickup || data.pickup.trim() === '') {
        errors.push('Pickup city is required');
    }
    
    if (!data.destination || data.destination.trim() === '') {
        errors.push('Destination city is required');
    }
    
    if (!data.tripType) {
        errors.push('Trip type is required');
    }
    
    if (!data.taxiType) {
        errors.push('Taxi type is required');
    }
    
    if (!data.date) {
        errors.push('Pickup date is required');
    }
    
    if (!data.name || data.name.trim() === '') {
        errors.push('Name is required');
    }
    
    if (!data.mobile || data.mobile.trim() === '') {
        errors.push('Mobile number is required');
    }
    
    // Mobile number validation - more flexible
    if (data.mobile) {
        const mobileClean = data.mobile.replace(/\D/g, '');
        if (mobileClean.length !== 10) {
            errors.push('Please enter a valid 10-digit mobile number');
        }
    }
    
    // Date validation
    if (data.date) {
        const selectedDate = new Date(data.date);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        if (selectedDate < today) {
            errors.push('Pickup date cannot be in the past');
        }
    }
    
    // Show validation errors
    if (errors.length > 0) {
        showValidationErrors(errors);
        return false;
    }
    
    return true;
}

// Show Validation Errors
function showValidationErrors(errors) {
    let errorMessage = 'Please correct the following errors:\n\n';
    errors.forEach((error, index) => {
        errorMessage += `${index + 1}. ${error}\n`;
    });
    
    alert(errorMessage);
}

// Loading State Functions
function showLoadingState(button) {
    if (button) {
        button.classList.add('loading');
        button.disabled = true;
        const originalText = button.innerHTML;
        button.setAttribute('data-original-text', originalText);
        button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Booking...';
    }
}

function hideLoadingState(button) {
    if (button) {
        button.classList.remove('loading');
        button.disabled = false;
        const originalText = button.getAttribute('data-original-text') || '<i class="fas fa-car"></i> Book Now';
        button.innerHTML = originalText;
    }
}

// Success Modal Functions - Fixed
function showSuccessModal() {
    const modal = document.getElementById('success-modal');
    if (modal) {
        modal.style.display = 'block';
        
        console.log('Success modal displayed');
        
        // Close modal when clicking outside
        const modalClickHandler = function(e) {
            if (e.target === modal) {
                closeModal();
                modal.removeEventListener('click', modalClickHandler);
            }
        };
        modal.addEventListener('click', modalClickHandler);
        
        // Close modal with close button
        const closeBtn = modal.querySelector('.close-modal');
        if (closeBtn) {
            const closeClickHandler = function(e) {
                e.preventDefault();
                closeModal();
                closeBtn.removeEventListener('click', closeClickHandler);
            };
            closeBtn.addEventListener('click', closeClickHandler);
        }
        
        // Auto close after 10 seconds
        setTimeout(() => {
            if (modal && modal.style.display === 'block') {
                closeModal();
            }
        }, 10000);
    } else {
        console.error('Success modal element not found');
    }
}

function closeModal() {
    const modal = document.getElementById('success-modal');
    if (modal) {
        modal.style.display = 'none';
        console.log('Success modal closed');
    }
}

// Scroll to Booking Section - Fixed
function scrollToBooking() {
    const bookingSection = document.getElementById('home');
    if (bookingSection) {
        const header = document.querySelector('.header');
        const headerHeight = header ? header.offsetHeight : 80;
        const targetPosition = bookingSection.offsetTop - headerHeight;
        
        window.scrollTo({
            top: Math.max(0, targetPosition),
            behavior: 'smooth'
        });
        
        // Focus on the first form field after scrolling
        setTimeout(() => {
            const firstInput = document.querySelector('#booking-form input:not([readonly]):not([type="date"])');
            if (firstInput) {
                firstInput.focus();
            }
        }, 800);
        
        console.log('Scrolled to booking section');
    }
}

// Utility Functions
function formatPhoneNumber(phone) {
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.length === 10) {
        return cleaned.replace(/(\d{5})(\d{5})/, '$1 $2');
    }
    return phone;
}

function calculateEstimatedPrice(distance, vehicleType) {
    const rates = {
        'hatchback': 11,
        'sedan': 13,
        'suv': 15
    };
    
    const distanceNum = parseInt(distance.replace(/\D/g, ''));
    const rate = rates[vehicleType] || rates.sedan;
    
    return `₹${(distanceNum * rate).toLocaleString()}`;
}

// Contact Functions
function callTaxi() {
    window.location.href = 'tel:08302393939';
    console.log('Initiating phone call');
}

function sendWhatsApp() {
    const message = encodeURIComponent('Hello, I would like to book a taxi with Gulati Cab.');
    window.open(`https://wa.me/918302393939?text=${message}`, '_blank');
    console.log('Opening WhatsApp');
}

// Analytics and Tracking Functions
function trackBookingStart(formType) {
    console.log(`Booking started: ${formType}`);
}

function trackBookingComplete(bookingData) {
    console.log('Booking completed:', bookingData);
}

function trackRouteView(route) {
    console.log(`Route viewed: ${route}`);
}

// Error Handling
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
});

// Performance Monitoring
window.addEventListener('load', function() {
    const loadTime = performance.now();
    console.log(`Page loaded in ${loadTime.toFixed(2)}ms`);
});

// Keyboard Navigation - Enhanced
document.addEventListener('keydown', function(e) {
    // Close modal with Escape key
    if (e.key === 'Escape') {
        const modal = document.getElementById('success-modal');
        if (modal && modal.style.display === 'block') {
            closeModal();
        }
        
        // Close mobile menu with Escape key
        const nav = document.getElementById('nav');
        if (nav && nav.classList.contains('mobile-open')) {
            nav.classList.remove('mobile-open');
            const menuBtn = document.getElementById('mobile-menu-btn');
            if (menuBtn) {
                const icon = menuBtn.querySelector('i');
                if (icon) {
                    icon.className = 'fas fa-bars';
                }
            }
        }
        
        // Close route page with Escape key
        const routePage = document.getElementById('route-page');
        if (routePage && routePage.style.display === 'block') {
            goBack();
        }
    }
});

// Intersection Observer for animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        observer.observe(section);
    });
}

// Initialize scroll animations if supported
if ('IntersectionObserver' in window) {
    initScrollAnimations();
}

// Global function exports
window.scrollToBooking = scrollToBooking;
window.closeModal = closeModal;
window.goBack = goBack;
window.callTaxi = callTaxi;
window.sendWhatsApp = sendWhatsApp;

// Browser Compatibility Check
function checkBrowserSupport() {
    const features = {
        flexbox: CSS.supports('display', 'flex'),
        grid: CSS.supports('display', 'grid'),
        customProperties: CSS.supports('--test', 'test'),
        fetch: 'fetch' in window,
        es6: 'Promise' in window
    };
    
    console.log('Browser feature support:', features);
    
    const unsupported = Object.values(features).some(supported => !supported);
    if (unsupported) {
        console.warn('Some features may not work in this browser');
    }
}

// Initialize browser check
checkBrowserSupport();

// Additional form field debugging
document.addEventListener('DOMContentLoaded', function() {
    // Ensure all form inputs are properly initialized
    const allInputs = document.querySelectorAll('input, select, textarea');
    allInputs.forEach((input, index) => {
        console.log(`Input ${index}:`, input.type, input.name, input.id);
        
        // Add event listeners for debugging
        input.addEventListener('input', function() {
            console.log(`Input changed: ${this.name} = ${this.value}`);
        });
        
        input.addEventListener('change', function() {
            console.log(`Input value: ${this.name} = ${this.value}`);
        });
    });
});

console.log('Gulati Cab JavaScript fully initialized!');
