import Popup from './Popup';

export default class SuccessPopup extends Popup {
  static _markupSuccessPopup = `
  <h3 class="popup__title popup__title_success-popup">Пользователь успешно зарегистрирован!</h3>
  <form class="form" name="signup">
    <button type="button" class="button button_type_text button_left-align link" id="open-signin">Войти</button>
  </form>
  `;

  constructor(params, mainApi) {
    super(params);
    this.popupContainer = params.popupContainer;
    this.mainApi = mainApi;
  }

  _renderContent = () => {
    super.setContent(SuccessPopup._markupSuccessPopup);
    this.authButton = document.querySelector('#open-signin');
    this.setEventListeners();
  }

  open = () => {
    super.open();
    super.clearContent();
    super.removeListeners();
    this._renderContent();
  }

  close = (event) => {
    super.close(event);
    super.removeListeners();
    this.removeListeners();
  }

  setEventListeners = () => {
    super.setEventListeners();
    this.authButton.addEventListener('click', this.dependencies.authPopup.open);
  }

  removeListeners = () => {
    this.authButton.removeEventListener('click', this.dependencies.authPopup.open);
  }
}