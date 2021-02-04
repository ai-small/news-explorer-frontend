import BaseComponent from './BaseComponent';
import { storage, LOCATION_URL } from '../constants/constants';

export default class Page extends BaseComponent {
  constructor(params) {
    super();
    this.mainApi = params.mainApi;
    this.burgerButton = params.headerElements.burgerButton;
    this.headerPanel = params.headerElements.headerPanel;
    this.preloader = params.preloader;
  }

  async renderMain(authUserData) {
    const pageName = 'main';
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
          this.dependencies.searchNews.setSearch(userData.isLoggedIn, pageName);
        } catch (error) {
          this.dependencies.authPopup.open();
        }
      }
      // если параметр передан, значит отрисовку запрашивает попап авторизации
      if (authUserData) {
        storage.setItem('username', authUserData.name);
        this.dependencies.header.render(authUserData);
        this.dependencies.searchNews.setSearch(authUserData.isLoggedIn, pageName);
        const headerPanelClassnames = Array.from(this.headerPanel.classList);
        const isMobileMenuOpen = headerPanelClassnames.find((classname) => classname === 'header__panel_theme_dark');
        if (isMobileMenuOpen) {
          this.dependencies.header.closeMobileMenu();
        }
        this.dependencies.articleList.clearContent();
      }

      if (!username && !authUserData) {
        this.dependencies.searchNews.setSearch(false, pageName);
      }
      this.setHandlers([
        { element: this.dependencies.header.authButton, event: 'click', handler: this.dependencies.authPopup.open },
        { element: this.burgerButton, event: 'click', handler: this.dependencies.header.openMobileMenu },
      ]);
    } catch (error) {
      console.log(error);
    }
  }

  async renderSavedArticles() {
    const pageName = 'saved';
    try {
      this.preloader.classList.remove('hidden');
      const userData = await this.mainApi.getUser();
      this.preloader.classList.add('hidden');
      this.dependencies.headerWhite.renderWhiteThemeHeader(userData.name);
      this.dependencies.savedArticlesBlock.render(userData.name, pageName);
      this.setHandlers([
        { element: this.burgerButton, event: 'click', handler: this.dependencies.headerWhite.openMobileMenu },
      ]);
    } catch (error) {
      console.log(error);
      window.location.replace(LOCATION_URL);
    }
  }
}
