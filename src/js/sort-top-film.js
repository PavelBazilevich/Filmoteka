import markupFilms from './markupFilms';
import Api from './api';
import { renderUi } from './renderUi';
import { renderPagination } from './pagination';
import { loader, stopLoader } from './loader';

const refs = {
  filmLsit: document.querySelector('.films'),
};

const api = new Api();

async function sortTopFilmh() {
  try {
    loader();
    refs.filmLsit.innerHTML = '';
    const response = await api.searchPopular();
    const sortArrFilm = response.sort(
      (firstReting, secondRating) =>
        secondRating.vote_average - firstReting.vote_average
    );
    renderUi(sortArrFilm);
    renderPagination(api, renderUi, 'searchPopular');
    stopLoader();
  } catch (error) {
    console.log(error);
  }
}
sortTopFilmh();
