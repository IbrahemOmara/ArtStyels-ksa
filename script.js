
// ======================
// السلايدر الرئيسي
// ======================
document.addEventListener("DOMContentLoaded", function () {
  const slides = document.querySelectorAll(".slide");
  const dotsContainer = document.querySelector(".dots");
  let currentSlide = 0;
  const totalSlides = slides.length;

  // إنشاء النقاط
  for (let i = 0; i < totalSlides; i++) {
    const dot = document.createElement("span");
    dot.classList.add("dot");
    if (i === 0) dot.classList.add("active");
    dot.dataset.index = i;
    dotsContainer.appendChild(dot);
  }
  const dots = document.querySelectorAll(".dot");

  function showSlide(index, direction = "right") {
    slides.forEach((slide, i) => {
      slide.classList.remove("active", "slide-in-left", "slide-in-right");
      if (i === index) {
        slide.classList.add("active");
        slide.classList.add(
          direction === "right" ? "slide-in-right" : "slide-in-left"
        );
        setTimeout(() => {
          slide.classList.remove("slide-in-left", "slide-in-right");
        }, 800);
      }
    });
    dots.forEach((dot) => dot.classList.remove("active"));
    dots[index].classList.add("active");
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    showSlide(currentSlide, "right");
  }

  function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    showSlide(currentSlide, "left");
  }

  // نقاط التحكم
  dots.forEach((dot) => {
    dot.addEventListener("click", (e) => {
      const newIdx = Number(e.target.dataset.index);
      const dir = newIdx > currentSlide ? "right" : "left";
      currentSlide = newIdx;
      showSlide(currentSlide, dir);
      stopAutoSlide();
    });
  });

  // تشغيل تلقائي
  let autoSlide = setInterval(nextSlide, 3000);
  function stopAutoSlide() {
    clearInterval(autoSlide);
  }
});

// ======================
// overlay للكروت (الخدمات)
// ======================
document.addEventListener("DOMContentLoaded", function () {
  const cards = document.querySelectorAll(".card");
  const overlay = document.getElementById("overlay");
  const overlayImage = document.getElementById("overlayImage");
  const overlayTitle = document.getElementById("overlayTitle");
  const overlayDescription = document.getElementById("overlayDescription");
  const closeOverlay = document.getElementById("closeOverlay");
  const overlayPrev = document.getElementById("overlayPrev");
  const overlayNext = document.getElementById("overlayNext");

  if (!overlay) return; // لو مفيش overlay في الصفحة متعملش حاجة

  const projectData = Array.from(cards).map((card) => ({
    img: card.querySelector("img").src,
    title: card.querySelector("h5")?.textContent || "",
    desc: card.querySelector("p")?.textContent || "",
  }));

  let currentOverlayIndex = 0;

  function openOverlay(index) {
    const project = projectData[index];
    overlayImage.src = project.img;
    overlayTitle.textContent = project.title;
    overlayDescription.textContent = project.desc;
    overlay.style.display = "flex";
    currentOverlayIndex = index;
  }

  function closeOverlayFunc() {
    overlay.style.display = "none";
  }

  cards.forEach((card, index) => {
    card.addEventListener("click", () => openOverlay(index));
  });

  closeOverlay?.addEventListener("click", closeOverlayFunc);

  overlayPrev?.addEventListener("click", () => {
    currentOverlayIndex =
      (currentOverlayIndex - 1 + projectData.length) % projectData.length;
    openOverlay(currentOverlayIndex);
  });

  overlayNext?.addEventListener("click", () => {
    currentOverlayIndex = (currentOverlayIndex + 1) % projectData.length;
    openOverlay(currentOverlayIndex);
  });
});

// ======================
// جاليري الصور (قسم الإنجازات)
// ======================
document.addEventListener("DOMContentLoaded", function () {
  const galleryImages = document.querySelectorAll(".features-section .column img");
  const galleryModal = document.getElementById("galleryModal");
  const galleryImg = document.getElementById("galleryImg");
  const galleryClose = document.getElementById("galleryClose");
  const galleryPrev = document.getElementById("galleryPrev");
  const galleryNext = document.getElementById("galleryNext");

  let currentGalleryIndex = 0;

  if (!galleryModal) return;

  function openGallery(index) {
    galleryModal.style.display = "flex";
    galleryImg.src = galleryImages[index].src;
    currentGalleryIndex = index;
  }

  galleryImages.forEach((img, index) => {
    img.addEventListener("click", () => openGallery(index));
  });

  galleryClose.onclick = () => (galleryModal.style.display = "none");

  galleryPrev.onclick = () => {
    currentGalleryIndex =
      (currentGalleryIndex - 1 + galleryImages.length) % galleryImages.length;
    galleryImg.src = galleryImages[currentGalleryIndex].src;
  };

  galleryNext.onclick = () => {
    currentGalleryIndex = (currentGalleryIndex + 1) % galleryImages.length;
    galleryImg.src = galleryImages[currentGalleryIndex].src;
  };

  galleryModal.addEventListener("click", (e) => {
    if (e.target === galleryModal) galleryModal.style.display = "none";
  });
});

// ======================
// فورم التواصل
// ======================
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contactForm");
  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    fetch(form.action, {
      method: "POST",
      body: new FormData(form),
      headers: { Accept: "application/json" },
    })
      .then((response) => {
        if (response.ok) {
          form.style.display = "none";
          const msg = document.createElement("div");
          msg.innerHTML =
            "<h3 style='color: #4CAF50;'>تم إرسال رسالتك بنجاح! سنرد عليك قريبًا.</h3>";
          form.parentNode.appendChild(msg);
        } else {
          alert("حدث خطأ أثناء الإرسال. حاول مرة أخرى.");
        }
      })
      .catch(() => {
        alert("حدث خطأ أثناء الإرسال. حاول مرة أخرى.");
      });
  });
});

