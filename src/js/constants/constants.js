const body = document.body;
const authButton = document.querySelector('#openAuthPopup');
const closePopupButton = document.querySelector('#close-popup');
const overlay = body.querySelector('.overlay');
const popup = document.querySelector('.popup');
const popupContainer = document.querySelector('.popup__content');

const popupSelectors = {
  popup,
  popupContainer,
  body,
  overlay,
  closePopupButton,
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

export {
  authButton,
  errorMessages,
  popupSelectors,
};
