/* =========================
   CINEMATIC HERO & BAND TRANSFORMATION ANIMATIONS
   IELTS MASTER
========================= */

// ============================================
// 1. CINEMATIC HERO ENTRANCE (Camera Zoom)
// ============================================

document.addEventListener('DOMContentLoaded', function() {
  const heroElement = document.querySelector('.hero-entrance');
  const loaderScreen = document.querySelector('.loader-screen');

  if (heroElement) {
    // Add animation class
    heroElement.classList.add('cinematic-in');

    // Hide loader after animation
    if (loaderScreen) {
      setTimeout(() => {
        loaderScreen.classList.add('hidden');
      }, 2000);
    }
  }
});

// ============================================
// 2. BAND TRANSFORMATION ON SCROLL
// ============================================

const bandTransformConfig = {
  startScore: 5.0,
  endScore: 8.0,
  steps: [
    { value: 5.0, label: 'Band 5.0' },
    { value: 5.5, label: 'Band 5.5' },
    { value: 6.0, label: 'Band 6.0' },
    { value: 6.5, label: 'Band 6.5' },
    { value: 7.0, label: 'Band 7.0' },
    { value: 7.5, label: 'Band 7.5' },
    { value: 8.0, label: 'Band 8.0' }
  }
};

function initBandTransformation() {
  const bandSection = document.querySelector('.band-transformation-section');
  const bandScore = document.querySelector('.band-transform-score');
  const progressLine = document.querySelector('.band-progress-line');
  const bandLabel = document.querySelector('.band-transform-label');

  if (!bandSection || !bandScore) return;

  window.addEventListener('scroll', function() {
    const sectionRect = bandSection.getBoundingClientRect();
    const sectionHeight = bandSection.offsetHeight;
    const windowHeight = window.innerHeight;

    // Calculate scroll progress (0 to 1)
    const scrollStart = windowHeight;
    const scrollEnd = -sectionHeight;
    const scrollProgress = Math.max(0, Math.min(1, 
      (scrollStart - sectionRect.top) / (scrollStart - scrollEnd)
    ));

    if (scrollProgress >= 0 && scrollProgress <= 1) {
      // Calculate current band score
      const startScore = bandTransformConfig.startScore;
      const endScore = bandTransformConfig.endScore;
      const currentScore = startScore + (endScore - startScore) * scrollProgress;
      const displayScore = currentScore.toFixed(1);

      // Update score display with animation
      if (bandScore) {
        bandScore.textContent = displayScore;
        bandScore.style.transform = `scale(${0.9 + scrollProgress * 0.1})`;
      }

      // Update label
      if (bandLabel) {
        const stepIndex = Math.floor(scrollProgress * (bandTransformConfig.steps.length - 1));
        bandLabel.textContent = bandTransformConfig.steps[stepIndex].label;
      }

      // Animate progress line
      if (progressLine) {
        progressLine.style.width = (scrollProgress * 100) + '%';
      }

      // Add glow effect at higher scores
      if (scrollProgress > 0.7) {
        bandScore.style.textShadow = `0 0 ${30 * (scrollProgress - 0.7) * 3.33}px rgba(201, 31, 54, ${(scrollProgress - 0.7) * 3.33 * 0.3})`;
      } else {
        bandScore.style.textShadow = 'none';
      }
    }
  });
}

// Initialize on page load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initBandTransformation);
} else {
  initBandTransformation();
}

// ============================================
// 3. PARALLAX SCROLL EFFECT
// ============================================

function initParallax() {
  const parallaxElements = document.querySelectorAll('[data-parallax]');

  if (parallaxElements.length === 0) return;

  window.addEventListener('scroll', function() {
    parallaxElements.forEach(element => {
      const speed = element.getAttribute('data-parallax') || 0.5;
      const scrolled = window.pageYOffset;
      const yPos = scrolled * speed;
      element.style.transform = `translateY(${yPos}px)`;
    });
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initParallax);
} else {
  initParallax();
}

// ============================================
// 4. SCROLL-TRIGGERED FADE IN ANIMATIONS
// ============================================

function initScrollTriggerAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all elements with scroll animation classes
  document.querySelectorAll('.fade-in-up, .stagger-children').forEach(el => {
    observer.observe(el);
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initScrollTriggerAnimations);
} else {
  initScrollTriggerAnimations();
}

// ============================================
// 5. NAVBAR SCROLL DETECTION
// ============================================

function initNavbarScroll() {
  const navbar = document.querySelector('nav');
  if (!navbar) return;

  let lastScrollTop = 0;

  window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    lastScrollTop = scrollTop;
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initNavbarScroll);
} else {
  initNavbarScroll();
}

// ============================================
// 6. SMOOTH NUMBER ANIMATION
// ============================================

function animateValue(element, start, end, duration) {
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    const value = Math.floor(progress * (end - start) + start);
    element.textContent = value;
    if (progress < 1) {
      requestAnimationFrame(step);
    }
  };
  requestAnimationFrame(step);
}

// Export for use in HTML
window.animateValue = animateValue;
