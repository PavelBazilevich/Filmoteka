import { renderLibraryPagination } from './pagination';
import markupFilmsLib from './markupFilmsLib';
const refs = {
  btnWatched: document.querySelector('.watched'),
  btnQueue: document.querySelector('.queue'),
  films: document.querySelector('.films'),
  plug: document.querySelector('.plug'),
  pagination: document.querySelector('.tui-pagination'),
};

refs.btnWatched.addEventListener('click', getWatched);
refs.btnQueue.addEventListener('click', getQueue);

getWatched();
function getWatched() {
  refs.films.innerHTML = '';
  const parsItem = JSON.parse(localStorage.getItem('watched'));
  refs.films.classList.remove('queue');
  refs.films.classList.add('watched');

  if (parsItem !== null && parsItem.length !== 0) {
    refs.plug.style.display = 'none';
    refs.films.innerHTML = markupFilmsLib(parsItem.slice(0, 20));
    renderLibraryPagination('watched', films => {
      refs.films.innerHTML = markupFilmsLib(films);
    });
  } else {
    refs.plug.style.display = 'flex';
    refs.films.innerHTML = '';
    refs.pagination.style.display = 'none';
  }
  refs.btnQueue.classList.remove('is-active');
  refs.btnWatched.classList.add('is-active');
}

function getQueue() {
  refs.films.innerHTML = '';
  const parsItem = JSON.parse(localStorage.getItem('queue'));
  refs.films.classList.remove('watched');
  refs.films.classList.add('queue');
  
  if (parsItem !== null && parsItem.length !== 0) {
    refs.plug.style.display = 'none';
    refs.films.innerHTML = markupFilmsLib(parsItem.slice(0, 20));
    renderLibraryPagination('queue', films => {
      refs.films.innerHTML = markupFilmsLib(films);
    });
  } else {
    refs.plug.style.display = 'flex';
    refs.films.innerHTML = '';
    refs.pagination.style.display = 'none';
  }
  refs.btnQueue.classList.add('is-active');
  refs.btnWatched.classList.remove('is-active');
}

export { getWatched, getQueue };
