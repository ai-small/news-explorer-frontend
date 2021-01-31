import BaseComponent from './BaseComponent';
import { storage } from '../constants/constants';

export default class Page extends BaseComponent {
  constructor(params) {
    super();
    this.mainApi = params.mainApi;
    this.burgerButton = params.headerElements.burgerButton;
    this.headerPanel = params.headerElements.headerPanel;
    // this.searchButton = params.searchButton;
  }

  async renderMain(authUserData) {
    try {
      // если в локал сторадж есть данные о пользователе
      const username = storage.getItem('username');
      console.log(username, 'username');
      if (username) {
        // сделать запрос на сервер за данными пользователя, отрисовать залогиненную страницу
        // если кука просрочена, запрос упадет в ошибку -  вывести попап авторизации
        try {
          const userData = await this.mainApi.getUser();
          userData.isLoggedIn = true;
          this.dependencies.header.render(userData);
          this.dependencies.searchNews.setSearch(userData.isLoggedIn);
        } catch (error) {
          this.dependencies.authPopup.open();
        }
      }
      // если параметр передан, значит отрисовку запрашивает попап авторизации
      if (authUserData) {
        localStorage.setItem('username', authUserData.name);
        this.dependencies.header.render(authUserData);
        this.dependencies.searchNews.setSearch(authUserData.isLoggedIn);
        const headerPanelClassnames = Array.from(this.headerPanel.classList);
        const isMobileMenuOpen = headerPanelClassnames.find((classname) => classname === 'header__panel_theme_dark');
        if (isMobileMenuOpen) {
          this.dependencies.header.closeMobileMenu();
        }
      }

      if (!username && !authUserData) {
        this.dependencies.searchNews.setSearch(false);
      }
      this.setHandlers([
        { element: this.dependencies.header.authButton, event: 'click', handler: this.dependencies.authPopup.open },
        { element: this.burgerButton, event: 'click', handler: this.dependencies.header.openMobileMenu },
      ]);
    } catch (error) {
      console.log(error);
    }
  }
}
