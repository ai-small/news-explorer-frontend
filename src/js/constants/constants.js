const firstArrayValue = 0;
const cardsInRow = 3;

const storage = localStorage;
const body = document.body;
const authButton = document.querySelector('#openAuthPopup');
const navigation = document.querySelector('#navigation');
const navigationList = document.querySelector('.navigation__list');
const burgerButton = document.querySelector('.button__icon_burger');
const headerPanel = document.querySelector('.header__panel');
const closeMobileMenuButton = document.querySelector('.button__icon_close');
const searchButton = document.querySelector('.search-container__button');
const preloader = document.querySelector('.search-results__preloader');
const notFound = document.querySelector('.search-results__not-found');
const articlesContainer = document.querySelector('.articles');
const searchResultsTitle = document.querySelector('#search-res-title');
const showMoreButton = document.querySelector('.search-results__button');

const popupSelectors = {
  popup: document.querySelector('.popup'),
  popupContainer: document.querySelector('.popup__content'),
  body,
  overlay: body.querySelector('.overlay'),
  closePopupButton: document.querySelector('#close-popup'),
};

const errorMessages = {
  valueMissing: 'Это обязательное поле',
  emailValueLength: 'Должно быть от 5 до 30 символов',
  passwordValueLength: 'Длина пароля - не менее 8 символов',
  textValueLength: 'Должно быть от 2 до 30 символов',
  patternMismatch: 'Неправильный формат email',
  namePatternMismatch: 'Введите имя на русском языке',
  userExist: 'Такой пользователь уже есть',
  emptyKeyword: 'Нужно ввести ключевое слово',
  notYetRealisedSearchFunction: 'Поиск по нескольким параметрам пока не реализован',
  serverErrorNewsApi: 'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз',
};

const headerElements = {
  navigation,
  navigationList,
  authButton,
  burgerButton,
  headerPanel,
  closeMobileMenuButton,
};

const MONTH = [
  'января',
  'февраля',
  'марта',
  'апреля',
  'мая',
  'июня',
  'июля',
  'августа',
  'сентября',
  'октября',
  'ноября',
  'декабря',
];

const MONTH_NUMBERS = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];

const DEFAULT_URL_IMAGE = 'https://st2.depositphotos.com/1014721/5786/v/600/depositphotos_57862499-stock-video-blue-earth-technology-business-and.jpg';

export {
  firstArrayValue,
  storage,
  // authButton,
  errorMessages,
  popupSelectors,
  headerElements,
  searchButton,
  preloader,
  notFound,
  DEFAULT_URL_IMAGE,
  MONTH,
  MONTH_NUMBERS,
  articlesContainer,
  searchResultsTitle,
  showMoreButton,
  cardsInRow,
};
