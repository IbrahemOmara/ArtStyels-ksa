const galleryImages = document.querySelectorAll('.row img');
const galleryModal = document.getElementById('galleryModal');
const galleryImg = document.getElementById('galleryImg');
const galleryClose = document.getElementById('galleryClose');
const galleryPrev = document.getElementById('galleryPrev');
const galleryNext = document.getElementById('galleryNext');

let currentIndex = 0;

galleryImages.forEach((img, index) => {
    img.addEventListener('click', () => {
    galleryModal.style.display = 'flex';
    galleryImg.src = img.src;
    currentIndex = index;
    });
});

galleryClose.onclick = () => galleryModal.style.display = 'none';

galleryPrev.onclick = () => {
    currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
    galleryImg.src = galleryImages[currentIndex].src;
};

galleryNext.onclick = () => {
    currentIndex = (currentIndex + 1) % galleryImages.length;
    galleryImg.src = galleryImages[currentIndex].src;
};

// close modal on click outside img
galleryModal.addEventListener('click', (e) => {
    if (e.target === galleryModal) galleryModal.style.display = 'none';
});