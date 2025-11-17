/* script.js
   Vanilla JS for portfolio interactivity:
   - typing animation
   - navbar scroll behavior
   - contact form validation
   - intersection observer for scroll-triggered animations
   - small UX helpers
*/

/* --------------------------
   Config / typed strings
   -------------------------- */
const typedPhrases = [
  "Building responsive UI with React.js",
  "Designing pixel-perfect user experiences",
  "Optimizing performance & accessibility",
  "Mentoring & shipping high-quality code"
];

/* --------------------------
   Typing animation (simple)
   -------------------------- */
(function typedText(){
  const el = document.getElementById('typedText');
  let phraseIndex = 0;
  let charIndex = 0;
  let deleting = false;
  const typingSpeed = 45;
  const pauseBetween = 1500;

  function tick() {
    const current = typedPhrases[phraseIndex];
    if (!deleting) {
      el.textContent = current.slice(0, ++charIndex) + '|';
      if (charIndex === current.length) {
        deleting = true;
        setTimeout(tick, pauseBetween);
        return;
      }
    } else {
      el.textContent = current.slice(0, --charIndex) + '|';
      if (charIndex === 0) {
        deleting = false;
        phraseIndex = (phraseIndex + 1) % typedPhrases.length;
      }
    }
    setTimeout(tick, deleting ? typingSpeed / 2 : typingSpeed);
  }
  // init
  if (el) tick();
})();

/* --------------------------
   Navbar scroll animation
   -------------------------- */
(function navbarScroll(){
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
})();

/* --------------------------
   Intersection Observer for fade-in effects
   -------------------------- */
(function scrollReveal(){
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        // optional: unobserve to avoid retrigger
        observer.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    rootMargin: '0px 0px -80px 0px',
    threshold: 0.15
  });

  document.querySelectorAll('.fade-in, .fade-in-up').forEach(el => observer.observe(el));
})();

/* --------------------------
   Smooth click for navbar links (for small offset)
   -------------------------- */
(function navLinkAdjust(){
  // adjust scroll to account for fixed navbar height
  document.querySelectorAll('a.nav-link[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const yOffset = -64; // navbar offset
      const y = target.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
      // collapse navbar on mobile
      const navCollapse = document.querySelector('.navbar-collapse');
      if (navCollapse && navCollapse.classList.contains('show')) {
        new bootstrap.Collapse(navCollapse).toggle();
      }
    });
  });
})();

/* --------------------------
   Contact form validation (custom)
   -------------------------- */
(function contactValidation(){
  const form = document.getElementById('contactForm');
  if (!form) return;

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function isValidPhone(phone) {
    // simple international-ish phone check (allow digits, spaces, +, -)
    return phone.trim() === '' || /^[+\d]?(?:[\d -]{7,})$/.test(phone);
  }

  form.addEventListener('submit', function(e){
    e.preventDefault();
    let valid = true;

    const name = form.querySelector('#name');
    const email = form.querySelector('#email');
    const phone = form.querySelector('#phone');
    const message = form.querySelector('#message');

    // Name
    if (!name.value.trim()) {
      name.classList.add('is-invalid');
      valid = false;
    } else {
      name.classList.remove('is-invalid');
      name.classList.add('is-valid');
    }

    // Email
    if (!isValidEmail(email.value)) {
      email.classList.add('is-invalid');
      valid = false;
    } else {
      email.classList.remove('is-invalid');
      email.classList.add('is-valid');
    }

    // Phone (optional)
    if (!isValidPhone(phone.value)) {
      phone.classList.add('is-invalid');
      valid = false;
    } else {
      phone.classList.remove('is-invalid');
      if (phone.value.trim()) phone.classList.add('is-valid');
      else phone.classList.remove('is-valid');
    }

    // Message
    if (!message.value.trim()) {
      message.classList.add('is-invalid');
      valid = false;
    } else {
      message.classList.remove('is-invalid');
      message.classList.add('is-valid');
    }

    if (!valid) {
      // small visual cue
      form.classList.remove('was-validated');
      form.classList.add('was-validated');
      return;
    }

    // Simulate send (replace with real API call if needed)
    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.innerHTML = 'Sending...';

    // pretend to send
    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = 'Send Message';
      form.reset();
      form.querySelectorAll('.is-valid').forEach(i => i.classList.remove('is-valid'));
      // show success alert
      const alert = document.createElement('div');
      alert.className = 'alert alert-success mt-3';
      alert.textContent = 'Message sent! I will get back to you soon.';
      form.appendChild(alert);
      setTimeout(() => alert.remove(), 5000);
    }, 900);
  });
})();

/* --------------------------
   Small helpers
   -------------------------- */
// current year in footer
document.getElementById('year').textContent = new Date().getFullYear();

/* End of script.js */
/* Smooth fade animation for Testimonials Carousel */
const testimonialCarousel = document.getElementById("testimonialsCarousel");

testimonialCarousel.addEventListener("slide.bs.carousel", function (e) {
  const activeItem = e.relatedTarget;
  activeItem.classList.add("fade-in");

  setTimeout(() => {
    activeItem.classList.remove("fade-in");
  }, 700);
});
