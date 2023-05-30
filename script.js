// open and close mobile-menu
const btnOpenMobileMenu = document.querySelector('.header__burger-btn');
const btnCloseMobileMenu = document.querySelector('.mobile-menu__btn-close');
const backgroundMenu = document.querySelector('.background-menu');
btnOpenMobileMenu.addEventListener('click', openMenu);
btnCloseMobileMenu.addEventListener('click', closeMenu);
backgroundMenu.addEventListener('click', closeMenu);
function openMenu() {
  const wrapperMenu = document.querySelector('.wrapper-menu');
  wrapperMenu.classList.add('wrapper-menu--open');
}

function closeMenu() {
  const wrapperMenu = document.querySelector('.wrapper-menu');
  wrapperMenu.classList.remove('wrapper-menu--open');
}

// load testimonial

let dataTestimonials = [];

async function getTestimonials() {
  const url = `../../testimonials.json`;

  try {
    const res = await fetch(url);
    const resPars = await res.json();
    dataTestimonials = resPars.testimonials;
    createTestimonials(dataTestimonials);
  } catch (e) {
    console.log(e);
  }
}

// create list testimonials
const testimonialsWrap = document.getElementById('testimonials');
function createTestimonials(testimonials) {
  testimonials.forEach((element) => {
    const testimonial = createTestimonial(element);
    testimonialsWrap.append(testimonial);
  });
}

//create testimonial for list

function createTestimonial(testimonial) {
  const testimonialsContainer = document.createElement('div');
  testimonialsContainer.classList.add('testimonials__container');
  testimonialsContainer.addEventListener('click', function () {
    openTestimonialModal(testimonial.id);
  });
  const content = `<div class="testimonials__item">
    <img class="testimonials__icon" src="${testimonial.image}">
    <div class="testimonials__user-info">
      <div class="testimonials__name">${testimonial.name}</div>
      <div class="testimonials__block">
        <div class="testimonials__element">${testimonial.location}</div>
        <div class="testimonials__element">&nbsp;<strong>·</strong>&nbsp;</div>
        <div class="testimonials__element">${testimonial.date}</div>
      </div>
    </div>
  </div>
  <div class="testimonials__content">${testimonial.text}</div>`;
  testimonialsContainer.innerHTML = content;
  return testimonialsContainer;
}
if (testimonialsWrap) {
  getTestimonials();
}

//modal testimonial

const modalTestimonial = document.getElementById('testimonial-modal');
const modalTestimonialClose = document.getElementById('testimonial-modal-close');
const modalTestimonialBackdrop = document.getElementById('testimonial-modal-backdrop');
if (modalTestimonialClose) {
  modalTestimonialClose.addEventListener('click', closeTestimonialModal);
}
if (modalTestimonialBackdrop) {
  modalTestimonialBackdrop.addEventListener('click', closeTestimonialModal);
}

const testimonialModalCard = document.getElementById('testimonial-modal-card');

function openTestimonialModal(id) {
  createTestimonialModal(id);
  modalTestimonial.classList.add('active');
}

function closeTestimonialModal() {
  modalTestimonial.classList.remove('active');
}

// create testimonial for modal

function createTestimonialModal(id) {
  const testimonial = dataTestimonials.find((element) => element.id == id);

  const content = `<div class="testimonial-modal__header">
  <img class="testimonial-modal__img" src="${testimonial.image}">
  <div class="testimonial-modal__user">
    <div class="testimonial-modal__name">${testimonial.name}</div>
    <div class="testimonial-modal__location">
      <div class="testimonial-modal__item">${testimonial.location}</div>
      <div class="testimonial-modal__item">&nbsp;<strong>·</strong>&nbsp;</div>
      <div class="testimonial-modal__item">${testimonial.date}</div>
    </div>
  </div>
</div>
<div class="testimonial-modal__content">${testimonial.text}</div>
</div>`;
  testimonialModalCard.innerHTML = content;
}

// panel Amount for block Pick and feed a friend

// инициализация
const donateAmountBtn = document.querySelectorAll('.feed-friend-donate__btn');
const donateAmountTitle = document.querySelectorAll('.feed-friend-donate__title-item');

// если donateAmountBtn true,вешает событи click на кнопки, и при клике запускает функции
if (donateAmountBtn.length) {
  for (let i = 0; i < donateAmountBtn.length; i++) {
    donateAmountBtn[i].addEventListener('click', () => {
      activateAmountBtn(i); //передаётся индекс нажатой кнопки
    });
  }
}
// активирует выбранную кнопку по клику
function activateAmountBtn(index) {
  for (let i = 0; i < donateAmountBtn.length; i++) {
    if (donateAmountBtn[i].classList.contains('active')) {
      donateAmountBtn[i].classList.remove('active');
    }
  }
  donateAmountBtn[index].classList.add('active');
  activateAmountTitle(index); //передаётся индекс нажатой кнопки
  setAmountForInput(index); //передаётся индекс нажатой кнопки
}
// активирует выбранную сумму в зависимости от выбранной кнопки по index (add class active)
function activateAmountTitle(index) {
  for (let i = 0; i < donateAmountTitle.length; i++) {
    if (donateAmountTitle[i].classList.contains('active')) {
      donateAmountTitle[i].classList.remove('active');
    }
    donateAmountTitle[index].classList.add('active');
  }
}
// записывает в inputAnotherAmount выбранную сумму (by index button)

const inputAnotherAmount = document.getElementById('another-amount');
let amountInputValue = 100;
if (inputAnotherAmount) {
  inputAnotherAmount.addEventListener('input', changeInputAnotherAmount);
}

// записывает inputAnotherAmount.value значение из attribute 'data-sum' donateAmountBtn
function setAmountForInput(index) {
  inputAnotherAmount.value = donateAmountBtn[index].getAttribute('data-sum');
  inputAnotherAmount.classList.remove('error');
}

// при изменении суммы в поле input подсвечивает кнопку, которая соотвутсвует новой введенной сумме
function changeInputAnotherAmount() {
  validationInputAnotherAmount();
  removeClassAmountActive();
  for (let i = 0; i < donateAmountBtn.length; i++) {
    if (donateAmountBtn[i].getAttribute('data-sum') == inputAnotherAmount.value) {
      activateAmountBtn(i);
    }
  }
}

function validationInputAnotherAmount() {
  if (/(^([1-9][0-9]{0,3})?$)/.test(inputAnotherAmount.value)) {
    amountInputValue = inputAnotherAmount.value;
  } else {
    inputAnotherAmount.value = amountInputValue;
  }

  if (!inputAnotherAmount.value || inputAnotherAmount.value > 9999) {
    inputAnotherAmount.classList.add('error');
  } else {
    inputAnotherAmount.classList.remove('error');
  }
}

function removeClassAmountActive() {
  const activeAmountBtn = document.querySelector('.feed-friend-donate__btn.active');
  const activeAmountTitle = document.querySelector('.feed-friend-donate__title-item.active');
  if (activeAmountBtn) {
    activeAmountBtn.classList.remove('active');
  }
  if (activeAmountTitle) {
    activeAmountTitle.classList.remove('active');
  }
}

// slider testimonials

// полоса прогресса слайдера
const testimonialRange = document.getElementById('myRange');
// начальное состояние ширина слайда и количество шагов слайдера
let slideWidth = document.documentElement.clientWidth >= 1600 ? 267 : 293;
let steps = document.documentElement.clientWidth >= 1600 ? 7 : 8;

// если есть полоса прогресса слайдера
if (testimonialRange) {
  //вешаем событием изменение ширины экрана
  window.addEventListener('resize', resizeWindow);
  // устанавливаем количество шагов
  testimonialRange.setAttribute('max', steps);
  // вешаем событие на изменение инпута testimonialRange
  testimonialRange.addEventListener('input', testimonialSliderChange);
}
// измение позиции слайдера
function testimonialSliderChange() {
  const value = testimonialRange.value;
  testimonialsWrap.style.left = (slideWidth + 30) * value * -1 + 'px';
}
// изменение ширины экрана
function resizeWindow() {
  //ширина слайда обновляется
  slideWidth = document.documentElement.clientWidth >= 1600 ? 267 : 293;
  //количество шагов обновляется
  steps = document.documentElement.clientWidth >= 1600 ? 7 : 8;
  testimonialRange.setAttribute('max', steps);
  // при ширине экрана 999px и меньше testimonialRange.value = 0 (чтобы left задать 0)
  if (document.documentElement.clientWidth <= 999) {
    testimonialRange.value = 0;
  }
  //обновляем состояние слайдера
  testimonialSliderChange();
}

// pets slider

let cardsCount = document.documentElement.clientWidth <= 999 ? 4 : 6;
//вешаем событие изменение ширины экрана
window.addEventListener('resize', resizeWindowPetsCard);

// изменение количества карточек в зависимости от ширины экрана
function resizeWindowPetsCard() {
  //количество карточек меняется
  const count = document.documentElement.clientWidth <= 999 ? 4 : 6;
  if (count != cardsCount) {
    cardsCount = count;
    const petsGridContainer = createPetsGridContainer();
    petsSlider.innerHTML = '';
    petsSlider.append(petsGridContainer);
  }
}

// функция, которая возвращает рандомное число в указанном диапазоне, min и max включаются

function getRandomNum(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const petsSlider = document.getElementById('pets-slider');
let dataPets = [];
const petsSliderArrowRight = document.getElementById('pets-slider-arrow-right');
const petsSliderArrowLeft = document.getElementById('pets-slider-arrow-left');

async function getPets() {
  const url = `../../pets.json`;

  try {
    const res = await fetch(url);
    const resPars = await res.json();
    dataPets = resPars.pets;
    const petsGridContainer = createPetsGridContainer();
    petsSlider.append(petsGridContainer);
  } catch (e) {
    console.log(e);
  }
}

if (petsSlider) {
  getPets();
  petsSliderArrowRight.addEventListener('click', nextSlide);
  petsSliderArrowLeft.addEventListener('click', prevSlide);
}

function createPetsCard(id) {
  const petsCard = document.createElement('div');
  petsCard.classList.add('pets__card');
  const pet = dataPets.find((element) => element.id == id);
  const content = `<img class="pets__img" src="${pet.image}" alt="card-1-png" />
    <div class="pets__wrapper">
      <div class="pets__content">
        <div class="pets__title">${pet.name}</div>
        <div class="pets__description">${pet.location}
      </div>
    </div>
      <img class="pets__icon${pet.food == 'meet-fish' ? ' pets__icon--fish' : ''}" src="${pet.icon}" alt="${pet.food}" />`;
  petsCard.innerHTML = content;
  return petsCard;
}

function createPetsGridContainer() {
  const petsGridContainer = document.createElement('div');
  petsGridContainer.classList.add('pets__grid-container');
  let numbersCardsRandom = [];

  while (numbersCardsRandom.length < cardsCount) {
    const randomNumSlide = getRandomNum(1, 14);
    if (!numbersCardsRandom.includes(randomNumSlide)) {
      numbersCardsRandom.push(randomNumSlide);
      const petsCard = createPetsCard(randomNumSlide);
      petsGridContainer.append(petsCard);
    }
  }
  return petsGridContainer;
}
let slideActive = false;

function nextSlide() {
  if (slideActive) {
    return false;
  }
  slideActive = true;
  const petsGridContainer = createPetsGridContainer();
  const prevSlide = petsSlider.lastChild;
  petsSlider.append(petsGridContainer);
  petsSlider.style.transition = 'left 0.3s';
  petsSlider.style.left = petsGridContainer.clientWidth * -1 + 'px';

  setTimeout(() => {
    prevSlide.remove();
    petsSlider.style.left = 0;
    petsSlider.style.transition = 'none';
    slideActive = false;
  }, 300);
}

function prevSlide() {
  if (slideActive) {
    return false;
  }
  slideActive = true;
  const petsGridContainer = createPetsGridContainer();
  const prevSlide = petsSlider.lastChild;
  petsSlider.prepend(petsGridContainer);
  petsSlider.style.transform = `translateX(-${petsGridContainer.clientWidth}px)`;
  petsSlider.style.left = petsGridContainer.clientWidth + 'px';
  petsSlider.style.transition = 'left 0.3s';

  setTimeout(() => {
    prevSlide.remove();
    petsSlider.style.left = 0;
    petsSlider.style.transform = 'none';
    petsSlider.style.transition = 'none';
    slideActive = false;
  }, 300);
}
