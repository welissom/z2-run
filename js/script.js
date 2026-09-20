const slides = [...document.querySelectorAll('.hero-slide')];
const pagination = document.querySelector('.hero-pagination');
const prevButton = document.querySelector('.previous');
const nextButton = document.querySelector('.next');
const header = document.querySelector('.header');
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
let currentSlide = 0;
let autoPlay;

slides.forEach((_, index) => {
  const bullet = document.createElement('button');
  bullet.setAttribute('aria-label', `Ir para foto ${index + 1}`);
  bullet.addEventListener('click', () => showSlide(index));
  pagination.appendChild(bullet);
});

const bullets = [...pagination.querySelectorAll('button')];

function showSlide(index) {
  currentSlide = (index + slides.length) % slides.length;
  slides.forEach((slide, i) => slide.classList.toggle('active', i === currentSlide));
  bullets.forEach((bullet, i) => bullet.classList.toggle('active', i === currentSlide));
  restartAutoPlay();
}

function restartAutoPlay() {
  clearInterval(autoPlay);
  autoPlay = setInterval(() => showSlide(currentSlide + 1), 5500);
}

prevButton.addEventListener('click', () => showSlide(currentSlide - 1));
nextButton.addEventListener('click', () => showSlide(currentSlide + 1));
showSlide(0);

window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 45);
});

menuToggle.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuToggle.classList.toggle('active', open);
  menuToggle.setAttribute('aria-expanded', open);
  document.body.classList.toggle('menu-open', open);
});

document.querySelectorAll('.nav a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuToggle.classList.remove('active');
    menuToggle.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('menu-open');
  });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.13 });

document.querySelectorAll('.reveal').forEach(element => observer.observe(element));
document.getElementById('year').textContent = new Date().getFullYear();
