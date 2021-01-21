import BaseComponent from './BaseComponent';

// Класс, отвечающий за логику работы шапки сайта.
// конструктор принимает объект опций.
// В опциях передайте цвет шапки, так как на разных страницах он может быть разный.
// Методы у класса Header такие:
// render при вызове перерисовывает шапку в зависимости от переданного аргумента —
// объекта props. У этого объекта есть два обязательных свойства:
// isLoggedIn — залогинен ли пользователь;
// userName — имя, которое отображается в шапке залогиненного пользователя.

export default class Header {
  static _markupLogoutButton = `
    <button class="button button_type_button navigation__button navigation__button_logout-white link" id="logout"></button>
  `;

  static _markupSavedArticlesLink = `
    <li><a href="./saved.html" class="link navigation__item">Сохранённые статьи</a></li>
  `;

  constructor(params) {
    this.template = document.createElement('div');
    this.navigation = params.navigation;
    this.navigationList = params.navigationList;
    this.authButton = params.authButton;
  }

  getTemplate = (markup) => {
      this.template.insertAdjacentHTML('afterbegin', markup);
      return this.template.children;
  }

  // вынести метод в BaseComp
  pasteIntoDOM = (markup, parentNode) => {
    Array.from(this.getTemplate(markup)).forEach(node => parentNode.appendChild(node));
  }

  setLogoutButton = (name) => {
    this.logoutButton = document.querySelector('#logout');
    this.logoutButton.textContent = name;

  }

  render(userData) {
    if (userData.isLoggedIn) {
      this.authButton.remove();
      this.pasteIntoDOM(Header._markupLogoutButton, this.navigation);
      this.setLogoutButton(userData.name);
      this.pasteIntoDOM(Header._markupSavedArticlesLink, this.navigationList);
    }
  }

}