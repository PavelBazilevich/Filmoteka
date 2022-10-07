const bodyRef = document.querySelector('body');
const inputChange = document.querySelector('.theme-switch__toggle');
const modalDivContent = document.querySelector('.modal-movie');

const Theme = {
  LIGHT: 'light-theme',
  DARK: 'dark-theme',
};

const delClassElem = () => {
  bodyRef.classList.remove(Theme.LIGHT, Theme.DARK);
  modalDivContent.classList.remove(Theme.LIGHT, Theme.DARK);
};
inputChange.addEventListener('change', () => {
  delClassElem();
  if (inputChange.checked) {
    localStorage.setItem('Theme', 'darkTheme');
    bodyRef.classList.add(Theme.DARK);
    modalDivContent.classList.add(Theme.DARK);
  } else {
    localStorage.setItem('Theme', 'lightTheme');
    bodyRef.classList.add(Theme.LIGHT);
    modalDivContent.classList.add(Theme.LIGHT);
  }
});
if (localStorage.getItem('Theme') === 'darkTheme') {
  inputChange.setAttribute('checked', true);
  bodyRef.classList.add(Theme.DARK);
  modalDivContent.classList.add(Theme.DARK);
}
