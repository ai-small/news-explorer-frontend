import BaseComponent from './BaseComponent';
import { storage } from '../constants/constants';

export default class Page extends BaseComponent {
  constructor(params) {
    super();
    this.mainApi = params.mainApi;
    this.burgerButton = params.headerElements.burgerButton;
  }

  async renderMain(authUserData) {
    try {
      // если в локал сторадж есть данные о пользователе
      const username = storage.getItem('username');
      if (username) {
        // сделать запрос на сервер за данными пользователя, отрисовать залогиненную страницу
        // если кука просрочена, запрос упадет в ошибку -  вывести попап авторизации
        try {
          const userData = await this.mainApi.getUser();
          userData.isLoggedIn = true;
          this.dependencies.header.render(userData);
        } catch (error) {
          console.log(error);
          console.log('нужна авторизация');
          // предложить пользователю авторизоваться
          // ошибку дальше передаем?
        }
      }

      // если параметр передан, значит отрисовку запрашивает попап авторизации
      if (authUserData) {
        localStorage.setItem('username', authUserData.name);
        this.dependencies.header.render(authUserData);
      }

      // вешаем слушателей на мобильное меню, кнопку авторизации
      this.setHandlers([
        { element: this.dependencies.header.authButton, event: 'click', handler: this.dependencies.authPopup.open },
        { element: this.burgerButton, event: 'click', handler: this.dependencies.header.openMobileMenu },
        // что-то с поиском делаем: слушатель на кнопку поиска
      ]);
    } catch (error) {
      console.log(error);
    }
  }
}
