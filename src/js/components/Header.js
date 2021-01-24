import BaseComponent from './BaseComponent';

export default class Header extends BaseComponent {
  static _markupLogoutButton = `
    <button class="button button_type_button navigation__button navigation__button_logout-white link" id="logout"></button>
  `;

  static _markupSavedArticlesLink = `
    <li><a href="./saved.html" class="link navigation__item">Сохранённые статьи</a></li>
  `;

  constructor(params) {
    super();
    this.navigation = params.navigation;
    this.navigationList = params.navigationList;
    this.authButton = params.authButton;
    this.burgerButton = params.burgerButton;
    this.headerPanel = params.headerPanel;
    this.closeMobileMenuButton = params.closeMobileMenuButton;

  }

  _setLogoutButton = (name) => {
    this.logoutButton = document.querySelector('#logout');
    this.logoutButton.textContent = name;
  }

  toggleMobileMenu = () => {
    this.headerPanel.classList.toggle('header__panel_theme_dark');
    this.navigation.classList.toggle('hidden');
    this.navigation.classList.toggle('navigation_flex');
    this.burgerButton.classList.toggle('hidden');
    this.closeMobileMenuButton.classList.toggle('hidden');
  }

  openMobileMenu = () => {
    this.toggleMobileMenu();
    this.setHandlers([
      { element: this.closeMobileMenuButton, event: 'click', handler: this.closeMobileMenu },
    ]);
    // события для сенсора?
  }

  closeMobileMenu = () => {
    this.toggleMobileMenu();
    this.removeHandlers([
      { element: this.closeMobileMenuButton, event: 'click', handler: this.closeMobileMenu },
    ]);
  }

  logout = () => {
    console.log('logout');
    // запрос за cookie clear (на бэке доп роут), если ок -
    // снять листнер с кнопки
    // this.removeHandlers([{ element: this.logoutButton, event: 'click', handler: this.logout }]);
    // удалить данные из локал сторадж
    // заменить кнопку логаута на кнопку авторизации
  }

  render(userData) {
    if (userData.isLoggedIn) {
      this.authButton.remove();
      this.pasteIntoDOM(Header._markupLogoutButton, this.navigation);
      this._setLogoutButton(userData.name);
      this.pasteIntoDOM(Header._markupSavedArticlesLink, this.navigationList);
    }

    this.setHandlers([{ element: this.logoutButton, event: 'click', handler: this.logout }]);
  }
}