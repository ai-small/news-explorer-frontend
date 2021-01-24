const storage = localStorage;
const body = document.body;
const authButton = document.querySelector('#openAuthPopup');
const navigation = document.querySelector('#navigation');
const navigationList = document.querySelector('.navigation__list');
const burgerButton = document.querySelector('.button__icon_burger');
const headerPanel = document.querySelector('.header__panel');
const closeMobileMenuButton = document.querySelector('.button__icon_close');

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
};

const headerElements = {
  navigation,
  navigationList,
  authButton,
  burgerButton,
  headerPanel,
  closeMobileMenuButton,
};

// const mainPageOptions = {
//   page: 'main',

// }

export {
  storage,
  authButton,
  errorMessages,
  popupSelectors,
  headerElements,
  // mainPageOptions,
};
