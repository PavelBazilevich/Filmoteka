import '../sass/components/_modal_movie.scss';
import Api from './api';

const filmsContainer = document.querySelector('.films');
const backdropEl = document.querySelector('.modal-movie');
const modalContainer = document.querySelector('.modal__container');
const backdropFooterEl = document.querySelector('[data-backdrop]');
const backdropMovie = document.querySelector('.backdrop');

const IMG_URL = "https://image.tmdb.org/t/p/w500";

const api = new Api();

filmsContainer.addEventListener('click', onFilmCardClick);

function onFilmCardClick(evt) {
  evt.preventDefault();
  if (evt.target.nodeName !== 'IMG') {
    return;
  }
  document.body.style.overflow = 'hidden';
  window.addEventListener('keydown', onCloseModalMovieFromKey);
  backdropMovie.addEventListener('click', onCloseModalMovieFromClick);
  backdropEl.classList.remove('is-hidden');
  backdropFooterEl.classList.remove('is-hidden');
  fetchMovieData(evt.target.closest('li').dataset.id)
    .then(data => {
      api.movieToSave = data
      renderMovieModal(data)})
    .catch(error => {
      console.log(error);
    });
  document.body.classList.add('no-scroll');
}

function fetchMovieData(movie_id) {
  return api.getSingleMovieByID(movie_id).then(response => {
    return response.data;
  });
}

export default function renderMovieModal(data) {
  const {
    poster_path,
    original_title,
    title,
    id,
    vote_average,
    vote_count,
    genres,
    overview,
    popularity,
  } = data
  const genresRender = genres
    .map(genre => {
      return genre.name;
    })
    .join(', ');
  const markUp = `
  <img
      class="modal__image"
      src="${poster_path ? IMG_URL + poster_path : 'https://i.postimg.cc/L8fCW6RZ/repetajpg.jpg'}"
      alt="${title ? title : 'Image'}"
      width="240"
      height="357"
    />
    <div class="modal__info-box">
      <p class="modal__title">${title ? title : 'No information'}</p>
      <div class="modal__features-box">
        <div class="modal__features-issues">
          <p class="modal__keys">Vote / Votes</p>
          <div class="modal__values-box">
            <p class="modal__value-numbers modal__value-numbers--accent">${vote_average ? vote_average.toFixed(
              1
            ) : '---'}</p>
            <span class="modal__slash">/</span>
            <p class="modal__value-numbers modal__value-numbers--simple">${vote_count ? vote_count : '---'}</p>
          </div>
        </div>
        <div class="modal__features-issues">
          <p class="modal__keys">Popularity</p>
          <p class="modal__value-numbers">${popularity ? popularity.toFixed(1) : '---'}</p>
        </div>
        <div class="modal__features-issues">
          <p class="modal__keys">Original Title</p>
          <p class="modal__value-text modal__value--main-text">${original_title ? original_title : 'No information'}</p>
        </div>
        <div class="modal__features-issues">
          <p class="modal__keys">Genre</p>
          <p class="modal__value-text">${genresRender ? genresRender : 'No information'}</p>
        </div>
      </div>
      <p class="modal__about-title">About</p>
      <p class="modal__about-text">${overview ? overview : 'No information'}</p>
      <div class="modal__bottom-thumb">
        <div class="modal__btn-box">
        <button class="modal__btn" type="button" data-type="watched" data-id=${id}>add to watched</button>
        <button class="modal__btn" type="button" data-type="queue" data-id=${id}>add to queue</button>
        </div>
      </div>
   
    </div>`;
  modalContainer.innerHTML = markUp;
  const hugeTitleLength = title.length > 54;
  const titleName = document.querySelector('.modal__title')
  if (hugeTitleLength) {
  titleName.style.fontSize='15px'
  }
  initBtns(id);
  modalBtnsToProcess();
}

function initBtns (movieId) {
  const watchedBtn = document.querySelector('button[data-type="watched"]');
  const queueBtn = document.querySelector('button[data-type="queue"]');
  let savedInLSMoviesWatched = localStorage.getItem('watched')
  if(savedInLSMoviesWatched) {
    savedInLSMoviesWatched = JSON.parse(savedInLSMoviesWatched)
    let map = savedInLSMoviesWatched.map(movie => {return movie.id})
    let index = map.indexOf(Number(movieId))
       if (index >= 0) {
          watchedBtn.classList.add('active')
          watchedBtn.style.backgroundColor = '#ff6b08'
          watchedBtn.textContent = 'remove from watched'
        }
      }
  
  let savedInLSMoviesQueue = localStorage.getItem('queue')
    if(savedInLSMoviesQueue) {
      savedInLSMoviesQueue = JSON.parse(savedInLSMoviesQueue)
      let map = savedInLSMoviesQueue.map(movie => {return movie.id})
      let index = map.indexOf(Number(movieId))
        if (index >= 0) {
          queueBtn.classList.add('active')
          queueBtn.style.backgroundColor = '#ff6b08'
          queueBtn.textContent = 'remove from queue'
      }
    }
}

function modalBtnsToProcess() {
  const watchedBtn = document.querySelector('button[data-type="watched"]');
  const queueBtn = document.querySelector('button[data-type="queue"]');
  watchedBtn.addEventListener('click', onWatchedFilmsToSaveClick);
  queueBtn.addEventListener('click', onQueueFilmsToSaveClick);

  function onWatchedFilmsToSaveClick(evt) {
    evt.preventDefault();
    watchedBtn.classList.toggle('active');
    btnWatchedTextContentToChange()
    initWatchedLS(watchedBtn.dataset.id);
  }

  function onQueueFilmsToSaveClick(evt) {
    evt.preventDefault();
    queueBtn.classList.toggle('active');
    initQueueLS(queueBtn.dataset.id);
    btnQueueTextContentToChange()
  }

  function btnWatchedTextContentToChange() {
    if(watchedBtn.classList.contains('active')) {
      watchedBtn.textContent = 'remove from watched'
      watchedBtn.style.backgroundColor = '#ff6b08'
      } else {
      watchedBtn.textContent = 'add to watched' 
      watchedBtn.style.backgroundColor = '#fff'
    }
  }

  function btnQueueTextContentToChange() {
    if(queueBtn.classList.contains('active')) {
      queueBtn.textContent = 'remove from queue'
      queueBtn.style.backgroundColor = '#ff6b08'
      } else {
      queueBtn.textContent = 'add to queue'
      queueBtn.style.backgroundColor = '#fff'
    }
  }
}

function initWatchedLS (currentMovieId) {
  const savedMovie = api.movieToSave; 
  let moviesArrayToSave = [];
  let savedInLSMovies = localStorage.getItem('watched')
  if(!savedInLSMovies) {
    moviesArrayToSave.push(savedMovie)
    localStorage.setItem("watched", JSON.stringify(moviesArrayToSave))
    return
  } else {
    savedInLSMovies = JSON.parse(savedInLSMovies)
    let map = savedInLSMovies.map(movie => {return movie.id})
    let index = map.indexOf(Number(currentMovieId))
       if (index < 0) {
          moviesArrayToSave.push(...savedInLSMovies, savedMovie)
          localStorage.setItem("watched", JSON.stringify(moviesArrayToSave))
           } else {
          let newArray = []
          savedInLSMovies.splice(index, 1)
          moviesArrayToSave = savedInLSMovies
          localStorage.setItem("watched", JSON.stringify(moviesArrayToSave))
        }

  if (savedInLSMovies.length < 1) {
    localStorage.removeItem('watched')
   } 
  }
 
}

function initQueueLS (currentMovieId) {
  const savedMovie = api.movieToSave; 
  let moviesArrayToSave = [];
  let savedInLSMovies = localStorage.getItem('queue')
  if(!savedInLSMovies) {
    moviesArrayToSave.push(savedMovie)
    localStorage.setItem("queue", JSON.stringify(moviesArrayToSave))
    return
  } else {
    savedInLSMovies = JSON.parse(savedInLSMovies)
    let map = savedInLSMovies.map(movie => {return movie.id})
    let index = map.indexOf(Number(currentMovieId))
       if (index < 0) {
          moviesArrayToSave.push(...savedInLSMovies, savedMovie)
          localStorage.setItem("queue", JSON.stringify(moviesArrayToSave))
           } else {
          let newArray = []
          savedInLSMovies.splice(index, 1)
          moviesArrayToSave = savedInLSMovies
          localStorage.setItem("queue", JSON.stringify(moviesArrayToSave))
        }

  if (savedInLSMovies.length < 1) {
    localStorage.removeItem('queue')
   } 
  }
 
}

const closeModalMovieBtn = document.querySelector('.modal-movie__close-button');
closeModalMovieBtn.addEventListener('click', modalMovieClose);

function modalMovieClose() {
  document.body.style.overflow = '';
  window.removeEventListener('keydown', onCloseModalMovieFromKey);
  backdropMovie.removeEventListener('click', onCloseModalMovieFromClick);
  backdropFooterEl.classList.add('is-hidden');
  backdropEl.classList.add('is-hidden');
  document.body.style.overflow = '';
  modalContainer.innerHTML = '';
  api.clearSavedMovie();
}

function onCloseModalMovieFromKey(event) {
  // localStorage.removeItem('watched')
  if (event.code === 'Escape') {
    backdropFooterEl.classList.add('is-hidden');
    backdropEl.classList.add('is-hidden');
    document.body.style.overflow = '';
    api.clearSavedMovie();
  }
}

function onCloseModalMovieFromClick(event) {
  if (event.target === event.currentTarget) {
    backdropFooterEl.classList.add('is-hidden');
    backdropEl.classList.add('is-hidden');
    document.body.style.overflow = '';
    api.clearSavedMovie();
  }
}

