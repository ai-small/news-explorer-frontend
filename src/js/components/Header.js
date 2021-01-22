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
  }

  _setLogoutButton = (name) => {
    this.logoutButton = document.querySelector('#logout');
    this.logoutButton.textContent = name;
  }

  openMobileMenu = () => {
    console.log('open mobile menu');
  }

  logout = () => {
    console.log('logout');
    // запрос за cookie clear (на бэке доп роут), если ок -
    // снять листнер с кнопки
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

    this.setHandlers([{ element: this.logoutButton, event: 'click', handler: this.logout }])
  }
}