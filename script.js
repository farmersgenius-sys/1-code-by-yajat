// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', function() {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }));

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Navbar background change on scroll
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(45, 143, 71, 0.98)';
        } else {
            navbar.style.background = 'rgba(45, 143, 71, 0.95)';
        }
    });

    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
                entry.target.classList.add('loading');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.tool-card, .scheme-card, .timeline-item').forEach(el => {
        observer.observe(el);
    });
});

// Fertilizer Calculator Function
function calculateFertilizer() {
    const crop = document.getElementById('crop-select').value;
    const area = parseFloat(document.getElementById('area-input').value);
    const resultDiv = document.getElementById('fertilizer-result');

    if (!crop || !area || area <= 0) {
        showResult(resultDiv, 'Please select a crop and enter a valid area.', 'error');
        return;
    }

    // Fertilizer requirements per acre (in kg)
    const fertilizerData = {
        rice: { nitrogen: 120, phosphorus: 60, potassium: 40 },
        wheat: { nitrogen: 150, phosphorus: 60, potassium: 40 },
        corn: { nitrogen: 200, phosphorus: 60, potassium: 40 },
        tomato: { nitrogen: 180, phosphorus: 120, potassium: 150 },
        potato: { nitrogen: 150, phosphorus: 120, potassium: 180 }
    };

    const requirements = fertilizerData[crop];
    const nitrogen = (requirements.nitrogen * area).toFixed(1);
    const phosphorus = (requirements.phosphorus * area).toFixed(1);
    const potassium = (requirements.potassium * area).toFixed(1);

    const resultHTML = `
        <div style="text-align: left;">
            <h4 style="color: var(--primary-green); margin-bottom: 10px;">Fertilizer Requirements for ${area} acre(s) of ${crop.charAt(0).toUpperCase() + crop.slice(1)}:</h4>
            <p><i class="fas fa-leaf"></i> <strong>Nitrogen (N):</strong> ${nitrogen} kg</p>
            <p><i class="fas fa-seedling"></i> <strong>Phosphorus (P):</strong> ${phosphorus} kg</p>
            <p><i class="fas fa-spa"></i> <strong>Potassium (K):</strong> ${potassium} kg</p>
            <div style="margin-top: 10px; padding: 10px; background: #e8f5e8; border-radius: 5px; font-size: 0.9rem;">
                <strong>💡 Tip:</strong> Apply fertilizers in splits for better absorption and crop growth.
            </div>
        </div>
    `;

    showResult(resultDiv, resultHTML, 'success');
}

// Irrigation Calculator Function
function calculateIrrigation() {
    const landSize = parseFloat(document.getElementById('land-size').value);
    const crop = document.getElementById('irrigation-crop').value;
    const resultDiv = document.getElementById('irrigation-result');

    if (!crop || !landSize || landSize <= 0) {
        showResult(resultDiv, 'Please select a crop and enter a valid land size.', 'error');
        return;
    }

    // Water requirements per acre per day (in liters)
    const waterData = {
        rice: { daily: 15000, season: 120 },
        wheat: { daily: 8000, season: 100 },
        corn: { daily: 10000, season: 90 },
        vegetables: { daily: 12000, season: 80 },
        fruits: { daily: 14000, season: 200 }
    };

    const requirements = waterData[crop];
    const dailyWater = (requirements.daily * landSize).toFixed(0);
    const seasonalWater = (requirements.daily * requirements.season * landSize / 1000).toFixed(1);
    const weeklyWater = (dailyWater * 7 / 1000).toFixed(1);

    const resultHTML = `
        <div style="text-align: left;">
            <h4 style="color: var(--primary-green); margin-bottom: 10px;">Water Requirements for ${landSize} acre(s) of ${crop.charAt(0).toUpperCase() + crop.slice(1)}:</h4>
            <p><i class="fas fa-tint"></i> <strong>Daily:</strong> ${new Intl.NumberFormat().format(dailyWater)} liters</p>
            <p><i class="fas fa-calendar-week"></i> <strong>Weekly:</strong> ${weeklyWater} thousand liters</p>
            <p><i class="fas fa-calendar"></i> <strong>Seasonal:</strong> ${seasonalWater} thousand liters</p>
            <div style="margin-top: 10px; padding: 10px; background: #e3f2fd; border-radius: 5px; font-size: 0.9rem;">
                <strong>💧 Tip:</strong> Use drip irrigation to save 30-50% water compared to flood irrigation.
            </div>
        </div>
    `;

    showResult(resultDiv, resultHTML, 'success');
}

// Show Result Helper Function
function showResult(resultDiv, content, type) {
    resultDiv.innerHTML = content;
    resultDiv.className = `result show ${type}`;
    
    // Add different styling based on type
    if (type === 'error') {
        resultDiv.style.background = '#ffebee';
        resultDiv.style.borderColor = '#f44336';
        resultDiv.style.color = '#d32f2f';
    } else {
        resultDiv.style.background = '#fff9c4';
        resultDiv.style.borderColor = '#ffc107';
        resultDiv.style.color = '#1b5e20';
    }

    // Scroll to result
    setTimeout(() => {
        resultDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 100);
}

// Enhanced Table Row Hover Effect
document.addEventListener('DOMContentLoaded', function() {
    const tableRows = document.querySelectorAll('.crop-table tbody tr');
    
    tableRows.forEach(row => {
        row.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.02)';
            this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
            this.style.zIndex = '1';
            this.style.position = 'relative';
        });

        row.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.boxShadow = 'none';
            this.style.zIndex = 'auto';
            this.style.position = 'static';
        });
    });
});

// Parallax Effect for Hero Section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        const rate = scrolled * -0.5;
        hero.style.backgroundPosition = `center ${rate}px`;
    }
});

// Form Validation and Enhancement
document.addEventListener('DOMContentLoaded', function() {
    // Add focus effects to input fields
    const inputFields = document.querySelectorAll('.input-field');
    
    inputFields.forEach(field => {
        field.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });

        field.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
        });

        // Add real-time validation feedback
        field.addEventListener('input', function() {
            if (this.type === 'number' && this.value < 0) {
                this.style.borderColor = '#f44336';
                this.style.boxShadow = '0 0 5px rgba(244, 67, 54, 0.3)';
            } else {
                this.style.borderColor = '#4caf50';
                this.style.boxShadow = '0 0 5px rgba(76, 175, 80, 0.3)';
            }
        });
    });
});

// Add loading animation to buttons
document.querySelectorAll('.calc-btn').forEach(button => {
    button.addEventListener('click', function() {
        const originalText = this.innerHTML;
        this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Calculating...';
        this.disabled = true;
        
        setTimeout(() => {
            this.innerHTML = originalText;
            this.disabled = false;
        }, 1500);
    });
});

// Add typing effect to hero title (optional enhancement)
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect on load (optional)
window.addEventListener('load', function() {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        // Uncomment the next line if you want typing effect
        // typeWriter(heroTitle, originalText, 80);
    }
});

// Add smooth reveal animation to sections
const revealSections = document.querySelectorAll('section');
const revealObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
        }
    });
}, {
    threshold: 0.15
});

revealSections.forEach(section => {
    revealObserver.observe(section);
});

// Enhanced mobile menu animation
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach((link, index) => {
        link.style.transitionDelay = `${index * 0.1}s`;
    });
});

// Add scroll progress indicator
window.addEventListener('scroll', function() {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    
    // Create progress bar if it doesn't exist
    let progressBar = document.querySelector('.scroll-progress');
    if (!progressBar) {
        progressBar = document.createElement('div');
        progressBar.className = 'scroll-progress';
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: ${scrolled}%;
            height: 3px;
            background: #ffc107;
            z-index: 9999;
            transition: width 0.3s ease;
        `;
        document.body.appendChild(progressBar);
    } else {
        progressBar.style.width = scrolled + '%';
    }
});

// Console log for debugging
console.log('Farmer Genius website loaded successfully! 🌱');
console.log('All interactive features are ready to use.');

// Error handling for calculations
window.addEventListener('error', function(e) {
    console.error('An error occurred:', e.error);
    // You can add user-friendly error messages here
});

// Performance monitoring (optional)
window.addEventListener('load', function() {
    const loadTime = performance.now();
    console.log(`Website loaded in ${loadTime.toFixed(2)}ms`);
});