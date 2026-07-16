const toggleButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.site-nav');

if (toggleButton && navigation) {
  toggleButton.addEventListener('click', () => {
    const isOpen = navigation.classList.toggle('is-open');
    toggleButton.setAttribute('aria-expanded', String(isOpen));
  });

  navigation.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navigation.classList.remove('is-open');
      toggleButton.setAttribute('aria-expanded', 'false');
    });
  });
}

const currentPage = window.location.pathname.split('/').pop() || 'index.html';
navigation?.querySelectorAll('a').forEach((link) => {
  const href = link.getAttribute('href');
  if (href === currentPage || (currentPage === '' && href === 'index.html')) {
    link.classList.add('is-active');
    link.setAttribute('aria-current', 'page');
  }
});

const lightbox = document.createElement('div');
lightbox.className = 'lightbox';
lightbox.setAttribute('aria-hidden', 'true');
lightbox.innerHTML = `
  <button class="lightbox-close" type="button" aria-label="Zavřít zvětšený obrázek">&times;</button>
  <img class="lightbox-image" alt="" />
`;
document.body.appendChild(lightbox);

const lightboxImage = lightbox.querySelector('.lightbox-image');
const lightboxClose = lightbox.querySelector('.lightbox-close');

const openLightbox = (sourceImage) => {
  if (!sourceImage?.src) {
    return;
  }

  lightboxImage.src = sourceImage.src;
  lightboxImage.alt = sourceImage.alt || '';
  lightbox.classList.add('is-open');
  lightbox.setAttribute('aria-hidden', 'false');
  document.body.classList.add('lightbox-open');
};

const closeLightbox = () => {
  lightbox.classList.remove('is-open');
  lightbox.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('lightbox-open');
  lightboxImage.src = '';
  lightboxImage.alt = '';
};

document.querySelectorAll('.gallery-grid img, .mini-gallery img, .hero-mosaic img, .feature-card-main img').forEach((image) => {
  image.classList.add('zoomable-image');
});

document.addEventListener('click', (event) => {
  const image = event.target.closest('.gallery-grid img, .mini-gallery img, .hero-mosaic img, .feature-card-main img');
  if (image) {
    openLightbox(image);
  }
});

lightbox.addEventListener('click', (event) => {
  if (event.target === lightbox || event.target === lightboxClose) {
    closeLightbox();
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && lightbox.classList.contains('is-open')) {
    closeLightbox();
  }
});
