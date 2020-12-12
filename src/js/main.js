import '../pages/index.css';
import {
  authButton,
  popupSelectors,
} from './constants/constants';
import MAIN_API_CONFIG from './constants/mainApiConfig';

import MainApi from './api/MainApi';
import AuthPopup from './components/AuthPopup';
import RegPopup from './components/RegPopup';
import SuccessPopup from './components/SuccessPopup';
import FormValidator from './components/FormValidator';


// СОЗДАЕМ ИНСТАНСЫ
const createFormValidator = (...arg) => new FormValidator(...arg);
const mainApi = new MainApi(MAIN_API_CONFIG);
const regPopup = new RegPopup(popupSelectors, mainApi);
const authPopup = new AuthPopup(popupSelectors);
const successPopup = new SuccessPopup(popupSelectors, mainApi);

authPopup.saveDependencies({ regPopup, createFormValidator });
regPopup.saveDependencies({ authPopup, createFormValidator, successPopup });
successPopup.saveDependencies({ authPopup });
// СЛУШАТЕЛИ НА ГЛАВНОЙ
authButton.addEventListener('click', authPopup.open);
