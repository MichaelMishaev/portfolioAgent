import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const initAnimations = () => {
  // Character Animation for Title
  const initCharAnimation = () => {
    const charElements = document.querySelectorAll('.tp-char-animation');

    charElements.forEach((element) => {
      const text = new SplitType(element as HTMLElement, {
        types: 'chars',
        tagName: 'span'
      });

      if (text.chars) {
        gsap.from(text.chars, {
          opacity: 0,
          y: 50,
          rotateX: -90,
          stagger: 0.05,
          duration: 1,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: element,
            start: 'top 80%',
            once: true
          }
        });
      }
    });
  };

  // Split Text Animation
  const initSplitTextAnimation = () => {
    const splitElements = document.querySelectorAll('.tp-split-text');

    splitElements.forEach((element) => {
      const hasRightClass = element.classList.contains('tp-split-right');

      const text = new SplitType(element as HTMLElement, {
        types: 'lines,words',
        tagName: 'span'
      });

      if (text.words) {
        gsap.from(text.words, {
          opacity: 0,
          x: hasRightClass ? 50 : -50,
          stagger: 0.08,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: element,
            start: 'top 85%',
            once: true
          }
        });
      }
    });
  };

  // Fade Animation
  const initFadeAnimation = () => {
    const fadeElements = document.querySelectorAll('.tp_fade_anim');

    fadeElements.forEach((element: Element) => {
      const htmlElement = element as HTMLElement;
      const delay = parseFloat(htmlElement.dataset.delay || '0');
      const ease = htmlElement.dataset.ease || 'power2.out';

      gsap.from(element, {
        opacity: 0,
        y: 60,
        duration: 1,
        delay: delay,
        ease: ease,
        scrollTrigger: {
          trigger: element,
          start: 'top 80%',
          once: true
        }
      });
    });
  };

  // Parallax Effect
  const initParallax = () => {
    const parallaxElements = document.querySelectorAll('[data-speed]');

    parallaxElements.forEach((element: Element) => {
      const htmlElement = element as HTMLElement;
      const speed = parseFloat(htmlElement.dataset.speed || '1');

      gsap.to(element, {
        y: () => (1 - speed) * ScrollTrigger.maxScroll(window),
        ease: 'none',
        scrollTrigger: {
          trigger: element,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
          invalidateOnRefresh: true
        }
      });
    });
  };

  // Image Scale Animation
  const initImageScale = () => {
    const images = document.querySelectorAll('.pp-about-me-thumb img');

    images.forEach((img) => {
      gsap.from(img, {
        scale: 0.8,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: img,
          start: 'top 80%',
          once: true
        }
      });
    });
  };

  // Arrow Button Rotation
  const initArrowRotation = () => {
    const buttons = document.querySelectorAll('.pp-about-me-btn a');

    buttons.forEach((button) => {
      button.addEventListener('mouseenter', () => {
        gsap.to(button.querySelector('svg'), {
          rotation: 45,
          duration: 0.3,
          ease: 'power2.out'
        });
      });

      button.addEventListener('mouseleave', () => {
        gsap.to(button.querySelector('svg'), {
          rotation: 0,
          duration: 0.3,
          ease: 'power2.out'
        });
      });
    });
  };

  // Decorative Shapes - Parallax Animation (matching original site)
  // The hands use parallax scrolling with data-speed="1.1"
  const initShapesFloat = () => {
    const leftHand = document.querySelector('.shape-left img');
    const rightHand = document.querySelector('.shape-right img');

    if (leftHand) {
      gsap.to(leftHand, {
        yPercent: -30,
        ease: 'none',
        scrollTrigger: {
          trigger: '.pp-brand-area',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
          invalidateOnRefresh: true
        }
      });
    }

    if (rightHand) {
      gsap.to(rightHand, {
        yPercent: -30,
        ease: 'none',
        scrollTrigger: {
          trigger: '.pp-brand-area',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
          invalidateOnRefresh: true
        }
      });
    }
  };

  // Stagger Animation for Cards
  const initStaggerCards = () => {
    const cards = document.querySelectorAll('.skill-category, .tool-item, .experience-item, .recognition-item');

    cards.forEach((card) => {
      gsap.from(card, {
        opacity: 0,
        y: 50,
        scale: 0.9,
        duration: 0.8,
        ease: 'back.out(1.2)',
        scrollTrigger: {
          trigger: card,
          start: 'top 85%',
          once: true
        }
      });
    });
  };

  // Progress Bar Animation
  const initProgressBars = () => {
    const bars = document.querySelectorAll('.tool-bar-fill');

    bars.forEach((bar: Element) => {
      const htmlBar = bar as HTMLElement;
      const width = htmlBar.style.width || '0%';

      htmlBar.style.width = '0%';

      ScrollTrigger.create({
        trigger: bar,
        start: 'top 80%',
        once: true,
        onEnter: () => {
          gsap.to(bar, {
            width: width,
            duration: 1.5,
            ease: 'power3.out'
          });
        }
      });
    });
  };

  // Social Links Hover
  const initSocialLinksHover = () => {
    const socialLinks = document.querySelectorAll('.social-link, .tp-footer-widget-social a');

    socialLinks.forEach((link) => {
      link.addEventListener('mouseenter', () => {
        gsap.to(link, {
          x: 5,
          duration: 0.3,
          ease: 'power2.out'
        });
      });

      link.addEventListener('mouseleave', () => {
        gsap.to(link, {
          x: 0,
          duration: 0.3,
          ease: 'power2.out'
        });
      });
    });
  };

  // Smooth Scroll to Top
  const initScrollToTop = () => {
    const button = document.querySelector('.back-to-top');

    if (button) {
      ScrollTrigger.create({
        start: 'top -100',
        end: 99999,
        toggleClass: { className: 'is-active', targets: button }
      });

      gsap.set(button, { opacity: 0, scale: 0 });

      ScrollTrigger.create({
        start: 'top -100',
        onEnter: () => {
          gsap.to(button, {
            opacity: 1,
            scale: 1,
            duration: 0.3,
            ease: 'back.out(1.7)'
          });
        },
        onLeaveBack: () => {
          gsap.to(button, {
            opacity: 0,
            scale: 0,
            duration: 0.3,
            ease: 'power2.in'
          });
        }
      });
    }
  };

  // Section Reveal Animation
  const initSectionReveal = () => {
    const sections = document.querySelectorAll('.about-section, .skills-section, .toolbox-section, .experience-section, .recognitions-section, .footer-cta');

    sections.forEach((section) => {
      gsap.from(section, {
        opacity: 0,
        y: 100,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 75%',
          once: true
        }
      });
    });
  };

  // Initialize all animations
  setTimeout(() => {
    initCharAnimation();
    initSplitTextAnimation();
    initFadeAnimation();
    initParallax();
    initImageScale();
    initArrowRotation();
    initShapesFloat();
    initStaggerCards();
    initProgressBars();
    initSocialLinksHover();
    initScrollToTop();
    initSectionReveal();

    // Refresh ScrollTrigger after all animations are set
    ScrollTrigger.refresh();
  }, 100);
};

// Cleanup function
export const cleanupAnimations = () => {
  ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  gsap.killTweensOf('*');
};
