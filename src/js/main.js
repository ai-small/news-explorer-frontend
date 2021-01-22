import '../pages/index.css';
import {
  storage,
  authButton,
  popupSelectors,
  headerElements,
  // mainPageOptions,
} from './constants/constants';
import MAIN_API_CONFIG from './constants/mainApiConfig';

import MainApi from './api/MainApi';
import Page from './components/Page';
import AuthPopup from './components/AuthPopup';
import RegPopup from './components/RegPopup';
import SuccessPopup from './components/SuccessPopup';
import FormValidator from './components/FormValidator';
import Header from './components/Header';

// СОЗДАЕМ ИНСТАНСЫ
const createFormValidator = (...arg) => new FormValidator(...arg);
const mainApi = new MainApi(MAIN_API_CONFIG);
const page = new Page({ mainApi, headerElements });
const header = new Header(headerElements);
const regPopup = new RegPopup(popupSelectors, mainApi);
const authPopup = new AuthPopup(popupSelectors, mainApi);
const successPopup = new SuccessPopup(popupSelectors, mainApi);

// Dependency Injections
authPopup.saveDependencies({
  regPopup,
  createFormValidator,
  header,
  page,
});
regPopup.saveDependencies({ authPopup, createFormValidator, successPopup });
successPopup.saveDependencies({ authPopup });
page.saveDependencies({ header, authPopup });
header.saveDependencies({ authPopup });

// ОТРИСОВАТЬ ГЛАВНУЮ СТРАНИЦУ
page.renderMain();
