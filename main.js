// main.js — contact form + robust testimonial slider (debugged)

// Wait for DOM ready
document.addEventListener('DOMContentLoaded', () => {

  // ================== Contact Form ==================
  const contactForm = document.getElementById('contactForm');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const email = contactForm.email.value;
      const message = contactForm.message.value;

      const mailtoLink =
        `mailto:victorjiggy12@gmail.com` +
        `?subject=New Message from Portfolio` +
        `&body=From: ${email}%0D%0A%0D%0A${message}`;

      window.location.href = mailtoLink;
      contactForm.reset();
    });
  }


   const menuBtn = document.getElementById("menuBtn");
  const mobileMenu = document.getElementById("mobileMenu");

  menuBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
  });

  // ================== Testimonials Slider ==================
  const testimonials = [
    {
      rating: "⭐⭐⭐⭐⭐",
      text: "Victor was a real pleasure to work with and we look forward to working with him again. He's definitely the kind of designer you can trust with a project from start to finish.",
      name: "Mr jude ",
      role: "owner of JAMVACCELECTRONICS",
      avatar: "none",
    },
    {
      rating: "⭐⭐⭐⭐⭐",
      text: "Working with Victor was seamless. He has a sharp eye for design and made our product shine beyond expectations.",
      name: "Rasid Hossain",
      role: "Project Manager, FocusLab",
      avatar: "assets/headshot-with-client-testimonial.jpg",
    },
    {
      rating: "⭐⭐⭐⭐⭐",
      text: "Victor truly understands UI/UX. His designs are elegant and functional, making every project enjoyable to work on.",
      name: "Tech Bro",
      role: "Web developer",
      avatar: "assets/html5-logo-html-logo-0.png",
    },
    {
      rating: "⭐⭐⭐⭐⭐ ",
      text: "I couldn’t be happier with the results. Victor exceeded expectations in every way.",
      name: "James Carter",
      role: "Entrepreneur",
      avatar: "none",
    }
  ];

  let currentIndex = 0;
  let autoRotate = null;
  const rotateIntervalMs = 6000;

  // DOM elements (may or may not exist depending on your HTML)
  const ratingEl = document.getElementById("testimonial-rating");
  const textEl = document.getElementById("testimonial-text");

  // There are two possible HTML setups:
  // 1) component mode: #testimonial-avatar, #testimonial-author, #testimonial-role
  // 2) fallback mode: #testimonial-author (container where we inject the whole block)
  const avatarEl = document.getElementById("testimonial-avatar");
  const authorNameEl = document.getElementById("testimonial-author"); // could be <h4> or a container (fallback handled)
  const roleEl = document.getElementById("testimonial-role");
  const authorContainerFallback = document.getElementById("testimonial-author"); // same id — we'll detect usage
  const prevBtn = document.getElementById("prev-testimonial");
  const nextBtn = document.getElementById("next-testimonial");

  function renderAuthorBlock(t) {
    // If separate elements exist use them
    const hasSeparate = !!avatarEl || !!roleEl;
    if (hasSeparate) {
      if (avatarEl) avatarEl.src = t.avatar;
      if (authorNameEl && authorNameEl.tagName !== 'DIV') {
        // If #testimonial-author is the name element:
        authorNameEl.textContent = t.name;
      } else if (authorNameEl && authorNameEl.tagName === 'DIV') {
        // if it is a div (unlikely), inject name into it
        authorNameEl.textContent = t.name;
      }
      if (roleEl) roleEl.textContent = t.role;
      return;
    }

    // Fallback: inject a small author HTML into the #testimonial-author container
    if (authorContainerFallback) {
      authorContainerFallback.innerHTML = `
        <div class="text-center">
          <img src="${t.avatar}" class="w-16 h-16 rounded-full mx-auto mb-2 border border-gray-600" alt="${t.name}">
          <p class="text-sm font-semibold">${t.name}</p>
          <p class="text-gray-400 text-xs">${t.role}</p>
        </div>
      `;
    }
  }

  function loadTestimonial(index) {
    if (!testimonials || testimonials.length === 0) return;
    const t = testimonials[(index + testimonials.length) % testimonials.length];
    if (!t) return;
    if (ratingEl) ratingEl.textContent = t.rating;
    if (textEl) textEl.textContent = `"${t.text}"`;

    renderAuthorBlock(t);
  }

  function startAutoRotate() {
    stopAutoRotate();
    autoRotate = setInterval(() => {
      currentIndex = (currentIndex + 1) % testimonials.length;
      loadTestimonial(currentIndex);
    }, rotateIntervalMs);
  }

  function stopAutoRotate() {
    if (autoRotate) {
      clearInterval(autoRotate);
      autoRotate = null;
    }
  }

  function resetAutoRotate() {
    stopAutoRotate();
    startAutoRotate();
  }

  // Attach listeners (only if buttons exist)
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
      loadTestimonial(currentIndex);
      resetAutoRotate();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % testimonials.length;
      loadTestimonial(currentIndex);
      resetAutoRotate();
    });
  }

  // initial render + start auto-rotate
  loadTestimonial(currentIndex);
  startAutoRotate();

  // Debug helper: log if required DOM elements are missing (non-fatal)
  if (!ratingEl) console.info('testimonial: #testimonial-rating not found (ok if not needed)');
  if (!textEl) console.info('testimonial: #testimonial-text not found (ok if not needed)');
  if (!prevBtn || !nextBtn) console.info('testimonial: prev/next buttons missing (manual controls will be disabled)');

});


document.addEventListener("DOMContentLoaded", () => {
  const skills = document.querySelectorAll(".skill");

  skills.forEach((skill, i) => {
    const level = parseInt(skill.dataset.level, 10) || 0;
    const color = skill.dataset.color || "#7c5cff";
    const circle = skill.querySelector(".circle");

    let current = 0;
    const step = () => {
      current++;
      if (current > level) return;

      circle.style.background = `conic-gradient(${color} ${current}%, #1e293b ${current}%)`;
      circle.textContent = current + "%";

      requestAnimationFrame(step);
    };

    setTimeout(step, i * 200); // staggered animation
  });
});


document.addEventListener("DOMContentLoaded", () => {
  const bars = document.querySelectorAll(".skill-bar");

  bars.forEach((bar, i) => {
    const level = parseInt(bar.dataset.level, 10) || 0;
    const color = bar.dataset.color || "#22c55e";
    const progress = bar.querySelector(".progress");
    const percentEl = bar.querySelector(".percent");

    progress.style.backgroundColor = color;

    let current = 0;
    function animate() {
      current++;
      if (current > level) return;

      progress.style.width = current + "%";
      percentEl.textContent = current + "%";

      requestAnimationFrame(animate);
    }

    setTimeout(animate, i * 300); // stagger effect
  });
});
