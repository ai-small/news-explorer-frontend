const firstArrayValue = 0;
const cardsInRow = 3;

const storage = localStorage;
const body = document.body;
const authButton = document.querySelector('#openAuthPopup');
const logo = document.querySelector('.logo');
const navigation = document.querySelector('#navigation');
const navigationList = document.querySelector('.navigation__list');
const navigationItems = document.querySelectorAll('.navigation__item');
const burgerButton = document.querySelector('.button__icon_burger');
const header = document.querySelector('.header ');
const headerPanel = document.querySelector('.header__panel');
const closeMobileMenuButton = document.querySelector('.button__icon_close');
const searchResults = document.querySelector('.search-results');
const searchButton = document.querySelector('.search-container__button');
const preloader = document.querySelector('.search-results__preloader');
const notFound = document.querySelector('.search-results__not-found');
const articlesContainer = document.querySelector('.articles');
const searchResultsTitle = document.querySelector('#search-res-title');
const showMoreButton = document.querySelector('.search-results__button');

const logoutWhite = document.querySelector('.navigation__button_logout-white');
const savedArticlesTitle = document.querySelector('.saved-articles__title');
const keywordsCount = document.querySelector('.saved-articles__keywords-count');
const keyword = document.querySelector('.saved-articles__keyword');
const keywords = document.querySelector('.saved-articles__keywords');

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
  namePatternMismatch: 'Некорректное имя',
  userExist: 'Такой пользователь уже есть',
  emptyKeyword: 'Нужно ввести ключевое слово',
  notYetRealisedSearchFunction: 'Поиск по нескольким параметрам пока не реализован',
  serverErrorNewsApi: 'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз',
};

const headerElements = {
  header,
  logo,
  navigation,
  navigationList,
  navigationItems,
  authButton,
  burgerButton,
  headerPanel,
  closeMobileMenuButton,
  logoutWhite,
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
const DAYS_AGO_TIMESTAMP = 7 * 86400000; // 24 * 3600 * 1000
const DEFAULT_URL_IMAGE = 'https://st2.depositphotos.com/1014721/5786/v/600/depositphotos_57862499-stock-video-blue-earth-technology-business-and.jpg';
const LOCATION_URL = 'http://localhost:8080';
const NOUN_ENDINGS_ARRAY = ['тья', 'тей', 'тьи'];
const NUMBERS_ENDINGS_ARRAY = ['-й', '-ти', '-м'];
const ADJECTIVE_ENDINGS_ARRAY = ['ная', 'ных'];

export {
  firstArrayValue,
  storage,
  errorMessages,
  popupSelectors,
  headerElements,
  searchButton,
  searchResults,
  preloader,
  notFound,
  DEFAULT_URL_IMAGE,
  MONTH,
  MONTH_NUMBERS,
  DAYS_AGO_TIMESTAMP,
  LOCATION_URL,
  NOUN_ENDINGS_ARRAY,
  ADJECTIVE_ENDINGS_ARRAY,
  NUMBERS_ENDINGS_ARRAY,
  articlesContainer,
  searchResultsTitle,
  showMoreButton,
  cardsInRow,
  savedArticlesTitle,
  keywordsCount,
  keywords,
  keyword,
};
