import { groupSeven } from '../js/students-base.js';
import Swiper from 'swiper/swiper-bundle.min.js';
// import Swiper styles
import 'swiper/swiper-bundle.min.css';
import '../sass/components/_modal_students.scss';

const openModalBtn = document.querySelector('[data-students-modal-open]');
const backdropFooter = document.querySelector('[data-backdrop]');
const modalStudents = document.querySelector('.modal-students');
const closeModalBtn = document.querySelector('[data-students-modal-close]');
const backdrop = document.querySelector('.backdrop');

openModalBtn.addEventListener('click', onOpenModal);
closeModalBtn.addEventListener('click', OnCloseModal);

function onOpenModal() {
  window.addEventListener('keydown', onCloseModalFromKey);
  backdrop.addEventListener('click', onCloseModalFromClick);
  removeClassAndStyleFooterModal();
}

function OnCloseModal() {
  window.removeEventListener('keydown', onCloseModalFromKey);
  backdrop.removeEventListener('click', onCloseModalFromClick);
  addClassAndStyle();
}

function onCloseModalFromKey(event) {
  if (event.code === 'Escape') {
    addClassAndStyle();
  }
}

function onCloseModalFromClick(event) {
  if (event.target === event.currentTarget) {
    addClassAndStyle();
  }
}

function addClassAndStyle() {
  document.body.style.overflow = '';
  backdropFooter.classList.add('is-hidden');
  modalStudents.classList.add('is-hidden');
}

function removeClassAndStyleFooterModal() {
  document.body.style.overflow = 'hidden';
  backdropFooter.classList.remove('is-hidden');
  modalStudents.classList.remove('is-hidden');
}

const cards = document.querySelector('.card-wrapper');

const makeCard = ({ photo, name, description }) => {
  return `
  <div class="swiper-slide card">
      <div class="image-content">
        <div class="card-image">
          <img src="${photo}" alt="" class="card-img" />
        </div>
      </div>
      <div class="card-content">
        <h2 class="name">${name}</h2>
        <p class="description">
          ${description}
        </p>
         <ul class="social-links list">
                <li class="social-links__item">
                  <a class="social-links__link instagram-icon" href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer nofollow">
                  </a>
                </li>
                <li class="social-links__item">
                  <a class="social-links__link twitter-icon" href="https://twitter.com/" target="_blank" rel="noopener noreferrer nofollow">
                  </a>
                </li>
                <li class="social-links__item">
                  <a class="social-links__link facebook-icon" href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer nofollow">
                  </a>
                </li>
                <li class="social-links__item">
                  <a class="social-links__link linkedin-icon" href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer nofollow">
                  </a>
                </li>
          </ul>
      </div>
    </div>
  `;
};

const makeCardsList = groupSeven.map(makeCard).join('');
cards.insertAdjacentHTML('beforeend', makeCardsList);

const swiper = new Swiper('.slide-container', {
  slidesPerView: 3,
  spaceBetween: 30,

  loop: true,
  loopFillGroupWithBlank: true,
  centerSlide: 'true',
  fade: 'true',
  grabCursor: 'true',
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
    dynamicBullets: true,
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
      slidesPerGroup: 1,
    },
    768: {
      slidesPerView: 2,
      slidesPerGroup: 2,
    },
    1280: {
      slidesPerView: 3,
      slidesPerGroup: 3,
    },
  },
});
