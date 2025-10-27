/**
 * MODERN CARD PORTFOLIO - ADVANCED INTERACTIONS
 * Ready-to-use JavaScript patterns for 2024-2025
 *
 * Features:
 * - 3D Magnetic Card Tilt
 * - Scroll Animations (Intersection Observer)
 * - Parallax Effects
 * - Card Filtering & Sorting
 * - Smooth Scrolling
 * - Image Lazy Loading with Blur-Up
 * - Glassmorphism Cursor Effects
 * - Progressive Number Counters
 */

// ============================================
// 1. MAGNETIC 3D CARD TILT EFFECT
// ============================================

class MagneticCard {
    constructor(card) {
        this.card = card;
        this.bounds = null;
        this.isHovering = false;

        this.card.addEventListener('mouseenter', () => this.handleMouseEnter());
        this.card.addEventListener('mousemove', (e) => this.handleMouseMove(e));
        this.card.addEventListener('mouseleave', () => this.handleMouseLeave());
    }

    handleMouseEnter() {
        this.bounds = this.card.getBoundingClientRect();
        this.isHovering = true;
    }

    handleMouseMove(e) {
        if (!this.isHovering || !this.bounds) return;

        const mouseX = e.clientX - this.bounds.left;
        const mouseY = e.clientY - this.bounds.top;

        const centerX = this.bounds.width / 2;
        const centerY = this.bounds.height / 2;

        const rotateX = ((mouseY - centerY) / centerY) * -10; // Max 10deg
        const rotateY = ((mouseX - centerX) / centerX) * 10;

        this.card.style.transform = `
            perspective(1000px)
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
            translateZ(20px)
            scale3d(1.02, 1.02, 1.02)
        `;
    }

    handleMouseLeave() {
        this.isHovering = false;
        this.card.style.transform = `
            perspective(1000px)
            rotateX(0deg)
            rotateY(0deg)
            translateZ(0px)
            scale3d(1, 1, 1)
        `;
    }
}

// Initialize magnetic cards
function initMagneticCards() {
    const cards = document.querySelectorAll('.card-3d');
    cards.forEach(card => {
        card.style.transition = 'transform 0.3s cubic-bezier(0.23, 1, 0.32, 1)';
        new MagneticCard(card);
    });
}

// ============================================
// 2. SCROLL ANIMATIONS WITH INTERSECTION OBSERVER
// ============================================

class ScrollAnimator {
    constructor(options = {}) {
        this.options = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px',
            animateOnce: true,
            ...options
        };

        this.observer = new IntersectionObserver(
            (entries) => this.handleIntersection(entries),
            {
                threshold: this.options.threshold,
                rootMargin: this.options.rootMargin
            }
        );
    }

    handleIntersection(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');

                if (this.options.animateOnce) {
                    this.observer.unobserve(entry.target);
                }
            } else if (!this.options.animateOnce) {
                entry.target.classList.remove('is-visible');
            }
        });
    }

    observe(elements) {
        elements.forEach(el => this.observer.observe(el));
    }
}

// Initialize scroll animations
function initScrollAnimations() {
    const animator = new ScrollAnimator({ animateOnce: true });

    const animatedElements = document.querySelectorAll(
        '.fade-in, .slide-in-left, .slide-in-right, .scale-in, .card'
    );

    animator.observe(animatedElements);
}

// ============================================
// 3. STAGGERED CARD ANIMATIONS
// ============================================

function staggerCardAnimations() {
    const cardGrids = document.querySelectorAll('.card-grid');

    cardGrids.forEach(grid => {
        const cards = grid.querySelectorAll('.card');

        cards.forEach((card, index) => {
            card.style.animationDelay = `${index * 0.1}s`;
            card.classList.add('fade-in-up');
        });
    });
}

// ============================================
// 4. PROGRESSIVE NUMBER COUNTER
// ============================================

class CounterAnimation {
    constructor(element, options = {}) {
        this.element = element;
        this.target = parseInt(element.getAttribute('data-target')) || 0;
        this.duration = options.duration || 2000;
        this.suffix = element.getAttribute('data-suffix') || '';
        this.prefix = element.getAttribute('data-prefix') || '';
        this.hasAnimated = false;
    }

    animate() {
        if (this.hasAnimated) return;
        this.hasAnimated = true;

        const startTime = Date.now();
        const startValue = 0;

        const updateCounter = () => {
            const currentTime = Date.now();
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / this.duration, 1);

            // Easing function (ease-out cubic)
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const currentValue = Math.floor(easeOut * this.target);

            this.element.textContent = this.prefix + currentValue + this.suffix;

            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                this.element.textContent = this.prefix + this.target + this.suffix;
            }
        };

        requestAnimationFrame(updateCounter);
    }
}

// Initialize counters on scroll
function initCounters() {
    const counters = document.querySelectorAll('[data-target]');
    const counterInstances = Array.from(counters).map(el => new CounterAnimation(el));

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const index = Array.from(counters).indexOf(entry.target);
                counterInstances[index].animate();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
}

// ============================================
// 5. PARALLAX SCROLL EFFECTS
// ============================================

class ParallaxEffect {
    constructor() {
        this.elements = document.querySelectorAll('[data-parallax]');
        this.init();
    }

    init() {
        if (this.elements.length === 0) return;

        window.addEventListener('scroll', () => this.handleScroll(), { passive: true });
        this.handleScroll(); // Initial call
    }

    handleScroll() {
        const scrollY = window.pageYOffset;

        this.elements.forEach(element => {
            const speed = parseFloat(element.getAttribute('data-parallax')) || 0.5;
            const offset = element.offsetTop;
            const distance = scrollY - offset;
            const translate = distance * speed;

            element.style.transform = `translateY(${translate}px)`;
        });
    }
}

// ============================================
// 6. CARD FILTERING & SORTING
// ============================================

class CardFilter {
    constructor(container, filterButtons) {
        this.container = container;
        this.cards = Array.from(container.querySelectorAll('.card'));
        this.filterButtons = filterButtons;
        this.activeFilter = 'all';

        this.init();
    }

    init() {
        this.filterButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const filter = e.target.getAttribute('data-filter');
                this.filter(filter);
                this.updateActiveButton(e.target);
            });
        });
    }

    filter(category) {
        this.activeFilter = category;

        this.cards.forEach(card => {
            const cardCategory = card.getAttribute('data-category');
            const shouldShow = category === 'all' || cardCategory === category;

            if (shouldShow) {
                card.style.display = '';
                setTimeout(() => {
                    card.classList.add('is-visible');
                }, 10);
            } else {
                card.classList.remove('is-visible');
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });

        // Trigger layout recalculation
        this.container.style.display = 'none';
        this.container.offsetHeight; // Force reflow
        this.container.style.display = '';
    }

    updateActiveButton(activeButton) {
        this.filterButtons.forEach(btn => btn.classList.remove('active'));
        activeButton.classList.add('active');
    }

    sort(sortBy) {
        const sortedCards = [...this.cards].sort((a, b) => {
            const aValue = a.getAttribute(`data-${sortBy}`);
            const bValue = b.getAttribute(`data-${sortBy}`);

            if (sortBy === 'date') {
                return new Date(bValue) - new Date(aValue);
            }

            return parseInt(bValue) - parseInt(aValue);
        });

        sortedCards.forEach(card => this.container.appendChild(card));
    }
}

// ============================================
// 7. LAZY LOADING WITH BLUR-UP TECHNIQUE
// ============================================

class LazyImageLoader {
    constructor(options = {}) {
        this.options = {
            rootMargin: '50px',
            threshold: 0.01,
            ...options
        };

        this.observer = new IntersectionObserver(
            (entries) => this.handleIntersection(entries),
            this.options
        );
    }

    handleIntersection(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                this.loadImage(entry.target);
                this.observer.unobserve(entry.target);
            }
        });
    }

    loadImage(img) {
        const src = img.getAttribute('data-src');
        if (!src) return;

        // Create temporary image to load
        const tempImg = new Image();
        tempImg.onload = () => {
            img.src = src;
            img.classList.add('loaded');
            img.removeAttribute('data-src');
        };
        tempImg.src = src;
    }

    observe(images) {
        images.forEach(img => this.observer.observe(img));
    }
}

// Initialize lazy loading
function initLazyLoading() {
    const lazyImages = document.querySelectorAll('img[data-src]');
    const loader = new LazyImageLoader();
    loader.observe(lazyImages);
}

// ============================================
// 8. SMOOTH SCROLL TO SECTION
// ============================================

function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href === '#') return;

            e.preventDefault();
            const target = document.querySelector(href);

            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for fixed header

                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });

                // Update URL without jumping
                history.pushState(null, null, href);
            }
        });
    });
}

// ============================================
// 9. GLASSMORPHISM CURSOR EFFECT
// ============================================

class GlassCursor {
    constructor() {
        this.cursor = this.createCursor();
        this.cursorX = 0;
        this.cursorY = 0;
        this.targetX = 0;
        this.targetY = 0;

        this.init();
    }

    createCursor() {
        const cursor = document.createElement('div');
        cursor.className = 'glass-cursor';
        cursor.style.cssText = `
            position: fixed;
            width: 200px;
            height: 200px;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, transparent 70%);
            pointer-events: none;
            z-index: 9999;
            transform: translate(-50%, -50%);
            transition: opacity 0.3s ease;
            opacity: 0;
        `;
        document.body.appendChild(cursor);
        return cursor;
    }

    init() {
        document.addEventListener('mousemove', (e) => {
            this.targetX = e.clientX;
            this.targetY = e.clientY;
            this.cursor.style.opacity = '1';
        });

        document.addEventListener('mouseleave', () => {
            this.cursor.style.opacity = '0';
        });

        this.animate();
    }

    animate() {
        // Smooth following with easing
        this.cursorX += (this.targetX - this.cursorX) * 0.1;
        this.cursorY += (this.targetY - this.cursorY) * 0.1;

        this.cursor.style.left = `${this.cursorX}px`;
        this.cursor.style.top = `${this.cursorY}px`;

        requestAnimationFrame(() => this.animate());
    }
}

// ============================================
// 10. CARD HOVER SHINE EFFECT
// ============================================

function initCardShine() {
    const cards = document.querySelectorAll('.card-shine');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });
}

// ============================================
// 11. PROGRESS BAR ANIMATION
// ============================================

function animateProgressBars() {
    const progressBars = document.querySelectorAll('.progress-bar');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const targetWidth = bar.getAttribute('data-width') || bar.style.width;

                bar.style.width = '0';
                setTimeout(() => {
                    bar.style.transition = 'width 1.5s cubic-bezier(0.65, 0, 0.35, 1)';
                    bar.style.width = targetWidth;
                }, 100);

                observer.unobserve(bar);
            }
        });
    }, { threshold: 0.5 });

    progressBars.forEach(bar => observer.observe(bar));
}

// ============================================
// 12. THEME SWITCHER (DARK/LIGHT MODE)
// ============================================

class ThemeSwitcher {
    constructor() {
        this.theme = localStorage.getItem('theme') || 'dark';
        this.init();
    }

    init() {
        this.setTheme(this.theme);

        const toggleBtn = document.querySelector('[data-theme-toggle]');
        if (toggleBtn) {
            toggleBtn.addEventListener('click', () => this.toggle());
        }
    }

    toggle() {
        this.theme = this.theme === 'dark' ? 'light' : 'dark';
        this.setTheme(this.theme);
    }

    setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        this.theme = theme;
    }
}

// ============================================
// 13. INFINITE SCROLL (LOAD MORE CARDS)
// ============================================

class InfiniteScroll {
    constructor(container, loadMoreCallback) {
        this.container = container;
        this.loadMoreCallback = loadMoreCallback;
        this.loading = false;
        this.hasMore = true;

        this.init();
    }

    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.loading && this.hasMore) {
                    this.loadMore();
                }
            });
        }, { threshold: 0.1 });

        // Observe a sentinel element at the bottom
        const sentinel = document.createElement('div');
        sentinel.className = 'infinite-scroll-sentinel';
        this.container.appendChild(sentinel);
        observer.observe(sentinel);
    }

    async loadMore() {
        this.loading = true;

        try {
            const newCards = await this.loadMoreCallback();

            if (newCards.length === 0) {
                this.hasMore = false;
            } else {
                newCards.forEach(card => this.container.appendChild(card));
            }
        } catch (error) {
            console.error('Error loading more cards:', error);
        } finally {
            this.loading = false;
        }
    }
}

// ============================================
// 14. CARD SEARCH/FILTER
// ============================================

class CardSearch {
    constructor(searchInput, cardsContainer) {
        this.searchInput = searchInput;
        this.cards = Array.from(cardsContainer.querySelectorAll('.card'));
        this.init();
    }

    init() {
        let debounceTimer;

        this.searchInput.addEventListener('input', (e) => {
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(() => {
                this.search(e.target.value);
            }, 300);
        });
    }

    search(query) {
        const lowerQuery = query.toLowerCase();

        this.cards.forEach(card => {
            const title = card.querySelector('.card-title')?.textContent.toLowerCase() || '';
            const description = card.querySelector('.card-description')?.textContent.toLowerCase() || '';
            const tags = card.getAttribute('data-tags')?.toLowerCase() || '';

            const matches = title.includes(lowerQuery) ||
                          description.includes(lowerQuery) ||
                          tags.includes(lowerQuery);

            if (matches || query === '') {
                card.style.display = '';
                setTimeout(() => card.classList.add('is-visible'), 10);
            } else {
                card.classList.remove('is-visible');
                setTimeout(() => card.style.display = 'none', 300);
            }
        });
    }
}

// ============================================
// INITIALIZATION - CALL ALL FUNCTIONS
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all features
    initMagneticCards();
    initScrollAnimations();
    staggerCardAnimations();
    initCounters();
    initLazyLoading();
    initSmoothScroll();
    initCardShine();
    animateProgressBars();

    // Optional features (uncomment to use)
    // new ParallaxEffect();
    // new GlassCursor();
    // new ThemeSwitcher();

    // Card filtering example
    const filterContainer = document.querySelector('.card-grid');
    const filterButtons = document.querySelectorAll('[data-filter]');
    if (filterContainer && filterButtons.length > 0) {
        new CardFilter(filterContainer, filterButtons);
    }

    // Search functionality example
    const searchInput = document.querySelector('[data-search]');
    const cardsContainer = document.querySelector('.card-grid');
    if (searchInput && cardsContainer) {
        new CardSearch(searchInput, cardsContainer);
    }

    console.log('✨ Modern Card Portfolio initialized successfully!');
});

// ============================================
// PERFORMANCE OPTIMIZATION
// ============================================

// Debounce helper
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle helper
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Reduce motion for accessibility
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (prefersReducedMotion.matches) {
    document.documentElement.classList.add('reduce-motion');
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        MagneticCard,
        ScrollAnimator,
        CounterAnimation,
        ParallaxEffect,
        CardFilter,
        LazyImageLoader,
        GlassCursor,
        ThemeSwitcher,
        InfiniteScroll,
        CardSearch
    };
}
