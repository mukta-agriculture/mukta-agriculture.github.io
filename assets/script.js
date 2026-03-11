document.addEventListener("DOMContentLoaded", () => {
  /* ===============================
     MOBILE NAV
  ================================ */
  const menuBtn = document.querySelector(".menu-btn");
  const mobileNav = document.getElementById("mobileNav");
  const closeNav = document.getElementById("closeNav");
  const navLinks = document.querySelectorAll(".mobile-nav-links a");

  if (menuBtn && mobileNav && closeNav) {
    menuBtn.addEventListener("click", () => {
      mobileNav.classList.add("active");
    });

    closeNav.addEventListener("click", () => {
      mobileNav.classList.remove("active");
    });

    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        mobileNav.classList.remove("active");
      });
    });
  }

  /* ===============================
     PRODUCT MODAL
  ================================ */
  const productCards = document.querySelectorAll(".product-card");
  const productModal = document.getElementById("productModal");
  const closeProductModal = document.getElementById("closeProductModal");
  const modalBackdrop = document.querySelector(".product-modal-backdrop");

  let currentSlide = 0;

  productCards.forEach((card) => {
    card.addEventListener("click", () => {
      // Only first card opens modal
      if (!card.dataset.modal) return;

      productModal.classList.add("active");
      document.body.style.overflow = "hidden";

      currentSlide = 0;
      initModalSlider();
    });
  });

  function closeModal() {
    productModal.classList.remove("active");
    document.body.style.overflow = "";
  }

  closeProductModal.addEventListener("click", closeModal);
  modalBackdrop.addEventListener("click", closeModal);

  /* ===============================
     MODAL IMAGE SLIDER (WORKING)
  ================================ */
  function initModalSlider() {
    const sliderTrack = document.querySelector(".slider-track");
    const slides = document.querySelectorAll(".slider-track .slide");
    const prevBtn = document.querySelector(".slider-btn.prev");
    const nextBtn = document.querySelector(".slider-btn.next");

    if (!sliderTrack || slides.length === 0) return;

    // Reset position
    sliderTrack.style.transform = "translateX(0%)";

    function updateSlider() {
      sliderTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
    }

    // Remove old handlers (important)
    prevBtn.onclick = null;
    nextBtn.onclick = null;

    prevBtn.onclick = () => {
      if (currentSlide > 0) {
        currentSlide--;
        updateSlider();
      }
    };

    nextBtn.onclick = () => {
      if (currentSlide < slides.length - 1) {
        currentSlide++;
        updateSlider();
      }
    };

    /* TOUCH SWIPE */
    let startX = 0;

    sliderTrack.ontouchstart = (e) => {
      startX = e.touches[0].clientX;
    };

    sliderTrack.ontouchend = (e) => {
      const diff = startX - e.changedTouches[0].clientX;

      if (diff > 50 && currentSlide < slides.length - 1) {
        currentSlide++;
      } else if (diff < -50 && currentSlide > 0) {
        currentSlide--;
      }

      updateSlider();
    };

    updateSlider();
  }

  // Dynamic footer year
  document.getElementById("currentYear").textContent = new Date().getFullYear();
});
