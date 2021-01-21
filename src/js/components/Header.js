import BaseComponent from './BaseComponent';

// Класс, отвечающий за логику работы шапки сайта.
// конструктор принимает объект опций.
// В опциях передайте цвет шапки, так как на разных страницах он может быть разный.
// Методы у класса Header такие:
// render при вызове перерисовывает шапку в зависимости от переданного аргумента —
// объекта props. У этого объекта есть два обязательных свойства:
// isLoggedIn — залогинен ли пользователь;
// userName — имя, которое отображается в шапке залогиненного пользователя.

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
  }

  _setLogoutButton = (name) => {
    this.logoutButton = document.querySelector('#logout');
    this.logoutButton.textContent = name;
  }

  render(userData) {
    if (userData.isLoggedIn) {
      this.authButton.remove();
      this.pasteIntoDOM(Header._markupLogoutButton, this.navigation);
      this._setLogoutButton(userData.name);
      this.pasteIntoDOM(Header._markupSavedArticlesLink, this.navigationList);
    }
  }
}