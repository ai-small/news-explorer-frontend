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
    this.pasteIntoDOM(SuccessPopup._markupSuccessPopup, this.popupContainer);
    this.authButton = document.querySelector('#open-signin');
    this.setHandlers([
      { element: this.authButton, event: 'click', handler: this.openAuthPopup },
    ]);
  }

  openAuthPopup = () => {
    this.removeHandlers([
      { element: this.authButton, event: 'click', handler: this.openAuthPopup },
    ]);
    this.dependencies.authPopup.open();
  }

  open = () => {
    super.open();
    super.clearContent();
    this._renderContent();
  }
}