// ============================================
// GAMEVAULT - INTERACTIVE FEATURES
// ============================================

// Pop-up Ad Configuration
const POPUP_DELAY = 15000; // Show pop-up after 15 seconds
const POPUP_TRIGGER_SCROLL = 50; // Show pop-up after scrolling 50% of page

let popupShown = false;
let stickyAdClosed = false;

// ============================================
// POP-UP AD FUNCTIONS
// ============================================

/**
 * Show the pop-up ad overlay
 */
function showPopup() {
    if (!popupShown) {
        const popup = document.getElementById('popup-ad-overlay');
        if (popup) {
            popup.classList.add('active');
            popupShown = true;
            console.log('Pop-up ad displayed');
        }
    }
}

/**
 * Close the pop-up ad
 */
function closePopup() {
    const popup = document.getElementById('popup-ad-overlay');
    if (popup) {
        popup.classList.remove('active');
    }
}

/**
 * Trigger pop-up based on time delay
 */
function setupPopupTimer() {
    setTimeout(() => {
        showPopup();
    }, POPUP_DELAY);
}

/**
 * Trigger pop-up based on scroll percentage
 */
function setupPopupScroll() {
    window.addEventListener('scroll', () => {
        if (popupShown) return;
        
        const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        
        if (scrollPercent >= POPUP_TRIGGER_SCROLL) {
            showPopup();
        }
    });
}

// ============================================
// STICKY AD FUNCTIONS
// ============================================

/**
 * Close sticky bottom ad
 */
function closeStickyAd() {
    const stickyAd = document.querySelector('.sticky-bottom-ad');
    if (stickyAd) {
        stickyAd.style.display = 'none';
        stickyAdClosed = true;
    }
}

/**
 * Show sticky ad on mobile after delay
 */
function setupStickyAd() {
    // Only show on mobile devices
    if (window.innerWidth <= 768 && !stickyAdClosed) {
        setTimeout(() => {
            const stickyAd = document.querySelector('.sticky-bottom-ad');
            if (stickyAd) {
                stickyAd.classList.add('active');
            }
        }, 5000); // Show after 5 seconds
    }
}

// ============================================
// NAVIGATION & SCROLL
// ============================================

/**
 * Smooth scroll to section
 */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        // Don't prevent default if it's just "#" or external link
        if (href === '#' || href.startsWith('http')) {
            return;
        }
        
        e.preventDefault();
        const target = document.querySelector(href);
        
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

/**
 * Update active nav link on scroll
 */
function updateActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// ============================================
// SEARCH FUNCTIONALITY
// ============================================

/**
 * Simple search filter (can be enhanced with actual search API)
 */
function setupSearch() {
    const searchInput = document.querySelector('.search-input');
    const searchBtn = document.querySelector('.search-btn');
    
    if (searchInput && searchBtn) {
        searchBtn.addEventListener('click', () => {
            const query = searchInput.value.trim();
            if (query) {
                console.log(`Searching for: ${query}`);
                // Here you can implement actual search functionality
                // For now, just log and could filter game cards
                filterGames(query);
            }
        });
        
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const query = searchInput.value.trim();
                if (query) {
                    console.log(`Searching for: ${query}`);
                    filterGames(query);
                }
            }
        });
    }
}

/**
 * Filter game cards based on search query
 */
function filterGames(query) {
    const gameCards = document.querySelectorAll('.game-card');
    const lowerQuery = query.toLowerCase();
    
    gameCards.forEach(card => {
        const title = card.querySelector('.game-title').textContent.toLowerCase();
        const category = card.querySelector('.game-category').textContent.toLowerCase();
        const description = card.querySelector('.game-description').textContent.toLowerCase();
        
        if (title.includes(lowerQuery) || category.includes(lowerQuery) || description.includes(lowerQuery)) {
            card.style.display = 'block';
            card.style.animation = 'fadeIn 0.5s ease';
        } else {
            card.style.display = 'none';
        }
    });
}

// ============================================
// CATEGORY FILTERS
// ============================================

/**
 * Filter games by category when category card is clicked
 */
function setupCategoryFilters() {
    const categoryCards = document.querySelectorAll('.category-card');
    
    categoryCards.forEach(card => {
        card.addEventListener('click', () => {
            const category = card.getAttribute('data-category');
            console.log(`Filtering by category: ${category}`);
            
            // Scroll to trending section
            const trendingSection = document.getElementById('trending');
            if (trendingSection) {
                trendingSection.scrollIntoView({ behavior: 'smooth' });
            }
            
            // Filter games (in a real app, this would load different games)
            // For demo, just highlight the category
            categoryCards.forEach(c => c.style.opacity = '0.5');
            card.style.opacity = '1';
            
            setTimeout(() => {
                categoryCards.forEach(c => c.style.opacity = '1');
            }, 2000);
        });
    });
}

// ============================================
// ANIMATIONS ON SCROLL
// ============================================

/**
 * Add fade-in animation to elements when they enter viewport
 */
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe game cards and category cards
    document.querySelectorAll('.game-card, .category-card, .release-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// ============================================
// DOWNLOAD TRACKING
// ============================================

/**
 * Track download button clicks (for analytics)
 */
function setupDownloadTracking() {
    const downloadButtons = document.querySelectorAll('.game-btn, .release-download, .btn-primary');
    
    downloadButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            // Get game title if available
            const gameCard = button.closest('.game-card, .release-item');
            let gameName = 'Unknown';
            
            if (gameCard) {
                const titleElement = gameCard.querySelector('.game-title, .release-title');
                if (titleElement) {
                    gameName = titleElement.textContent;
                }
            }
            
            console.log(`Download clicked: ${gameName}`);
            
            // Here you can send analytics to your tracking service
            // Example: gtag('event', 'download_click', { game_name: gameName });
        });
    });
}

// ============================================
// RESPONSIVE MENU (MOBILE)
// ============================================

/**
 * Create and handle mobile hamburger menu
 */
function setupMobileMenu() {
    // This would add a hamburger menu for mobile
    // For now, the nav menu is hidden on mobile in CSS
    // You can enhance this by adding a proper mobile menu
    
    if (window.innerWidth <= 1024) {
        console.log('Mobile view detected');
        // Add mobile menu functionality here if needed
    }
}

// ============================================
// EXTERNAL LINKS (OPEN IN NEW TAB)
// ============================================

/**
 * Make external links open in new tab
 */
function setupExternalLinks() {
    document.querySelectorAll('a[href^="http"]').forEach(link => {
        // Exclude links to your own domain
        if (!link.href.includes(window.location.hostname)) {
            link.setAttribute('target', '_blank');
            link.setAttribute('rel', 'noopener noreferrer');
        }
    });
}

// ============================================
// PERFORMANCE: LAZY LOAD IMAGES
// ============================================

/**
 * Lazy load images when they enter viewport
 */
function setupLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        imageObserver.unobserve(img);
                    }
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
}

// ============================================
// GLITCH EFFECT ON HOVER
// ============================================

/**
 * Add glitch effect to hero title on hover
 */
function setupGlitchEffect() {
    const glitchElement = document.querySelector('.glitch');
    
    if (glitchElement) {
        glitchElement.addEventListener('mouseenter', () => {
            glitchElement.style.animation = 'glitchText 0.3s ease-in-out';
        });
        
        glitchElement.addEventListener('animationend', () => {
            glitchElement.style.animation = 'glitchText 3s ease-in-out infinite';
        });
    }
}

// ============================================
// INITIALIZE ALL FEATURES
// ============================================

/**
 * Initialize all interactive features when DOM is ready
 */
document.addEventListener('DOMContentLoaded', () => {
    console.log('GameVault initialized');
    
    // Setup ads
    setupPopupTimer();
    setupPopupScroll();
    setupStickyAd();
    
    // Setup navigation
    updateActiveNav();
    
    // Setup search
    setupSearch();
    
    // Setup category filters
    setupCategoryFilters();
    
    // Setup animations
    setupScrollAnimations();
    
    // Setup download tracking
    setupDownloadTracking();
    
    // Setup mobile menu
    setupMobileMenu();
    
    // Setup external links
    setupExternalLinks();
    
    // Setup lazy loading
    setupLazyLoading();
    
    // Setup glitch effect
    setupGlitchEffect();
    
    console.log('All features loaded successfully');
});

// ============================================
// HANDLE WINDOW RESIZE
// ============================================

let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        setupMobileMenu();
        
        // Re-setup sticky ad if screen size changed
        if (window.innerWidth > 768) {
            const stickyAd = document.querySelector('.sticky-bottom-ad');
            if (stickyAd) {
                stickyAd.style.display = 'none';
            }
        }
    }, 250);
});

// ============================================
// PREVENT POPUP WHEN CLICKING OUTSIDE
// ============================================

document.addEventListener('click', (e) => {
    const popup = document.getElementById('popup-ad-overlay');
    if (popup && e.target === popup) {
        closePopup();
    }
});

// ============================================
// CONSOLE WELCOME MESSAGE
// ============================================

console.log(`
╔═══════════════════════════════════════╗
║                                       ║
║      🎮 GAMEVAULT 🎮                 ║
║      Gaming Portal Loaded             ║
║      Version 1.0                      ║
║                                       ║
╚═══════════════════════════════════════╝
`);

// ============================================
// EXPORT FUNCTIONS (for use in HTML if needed)
// ============================================

window.closePopup = closePopup;
window.closeStickyAd = closeStickyAd;
