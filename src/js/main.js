import '../pages/index.css';
import {
  storage,
  authButton,
  popupSelectors,
  navigation,
  navigationList,
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
const page = new Page({ mainApi });
const header = new Header({ navigation, navigationList, authButton });
const regPopup = new RegPopup(popupSelectors, mainApi);
const authPopup = new AuthPopup(popupSelectors, mainApi);
const successPopup = new SuccessPopup(popupSelectors, mainApi);

authPopup.saveDependencies({ regPopup, createFormValidator, header, page });
regPopup.saveDependencies({ authPopup, createFormValidator, successPopup });
successPopup.saveDependencies({ authPopup });
page.saveDependencies({ header });

// async userLoginStatus() {
//   try {
//     const userData = await mainApi.getUser();
//     console.log(userData);
//           if (userData) {
//             userData.isLoggedIn = true
//           }
//   } catch (error) {
//    console.log(error);
//    userData.isLoggedIn = false;
//   }
// }
// ОТРИСОВАТЬ ГЛАВНУЮ СТРАНИЦУ
page.renderMain();



// СЛУШАТЕЛИ НА ГЛАВНОЙ
authButton.addEventListener('click', authPopup.open);
