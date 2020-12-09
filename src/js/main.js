import '../pages/index.css';
import {
  authButton,
  popupSelectors,
} from './constants/constants';

import AuthPopup from './components/AuthPopup';
import RegPopup from './components/RegPopup';
import FormValidator from './components/FormValidator';

// СОЗДАЕМ ИНСТАНСЫ
const createFormValidator = (...arg) => new FormValidator(...arg);
const regPopup = new RegPopup(popupSelectors);
const authPopup = new AuthPopup(popupSelectors);

authPopup.saveDependencies({ regPopup, createFormValidator });
regPopup.saveDependencies({ authPopup, createFormValidator });
// СЛУШАТЕЛИ НА ГЛАВНОЙ
authButton.addEventListener('click', authPopup.open);
