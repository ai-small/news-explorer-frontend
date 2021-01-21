import Popup from './Popup';

export default class AuthPopup extends Popup {

  // разметка всплывающего окна
  static _markupAuthPopup = `
  <h3 class="popup__title">Вход</h3>
  <form class="form" name="signin">
    <div class="form__field">
      <label for="signin-email" class="form__label">Email</label>
      <input class="form__input" id="signin-email" type="email" name="email-login" pattern="^[A-Za-z](?:[A-Za-z0-9_]+)?(?:(?:(?:-|\.)[A-Za-z0-9_]+)+)?@[a-z0-9]+(?:-[a-z0-9]+)?\.[a-z]+(?:\.[a-z]+)?$" minlength="5" maxlength="30" placeholder="Введите почту" required="">
      <span class="form__error" id="email-error"></span>
    </div>
    <div class="form__field">
      <label for="signin-password" class="form__label">Пароль</label>
      <input class="form__input" id="signin-password" type="password" name="password-login" minlength="8" placeholder="Введите пароль" required="">
      <span class="form__error" id="password-error"></span>
    </div>
    <div class="form__submit-area">
      <span class="form__error form__server-error" id="server-error"></span>
      <button type="submit" class="button button_type_button button_color_blue button_disabled form__button" id="submit-button" disabled>Войти</button>
      <p class="form__text-container">или <button type="button" class="button button_type_text link" id="open-signup">Зарегистрироваться</button></p>
    </div>
</form>
  `;

  constructor(params, mainApi) {
    super(params); // зовем родительский класс
    this.popupContainer = params.popupContainer;
    this.createFormValidator = params.createFormValidator;
    this.mainApi = mainApi;
    this.submitHandler = this.submitHandler.bind(this);
  }

  _renderContent = () => {
    this.pasteIntoDOM(AuthPopup._markupAuthPopup, this.popupContainer);
    this.form = document.forms.signin;
    this.submitButton = this.form.querySelector('#submit-button');
    this.regButton = this.form.querySelector('.button_type_text');
    this.errorSpans = {
      emailError: this.form.querySelector('#email-error'),
      passwordError: this.form.querySelector('#password-error'),
      serverError: this.form.querySelector('.form__server-error'),
    };
    this.formValidator = this.dependencies.createFormValidator(this.form, this.errorSpans, this.submitButton);
    this.formValidator.setEventListeners();
    this.setEventListeners();
  }

  open = () => {
    super.open();
    super.clearContent();
    this._renderContent();
  }

  close = (event) => {
    super.close(event);
    super.removeListeners();
    this.removeListeners();
  }

  async submitHandler(event) {
    event.preventDefault();
    const inputs = Array.from(this.form.elements).filter(element => element.tagName === 'INPUT');
    const inputValues = inputs.map(input => input.value);
    this.formValidator._setButtonDisabledState(this.submitButton);
    this.formValidator._setInputsDisabledState(inputs);
    try {
      const authData = await this.mainApi.signin(inputValues);
      if (authData) {
        this.close(event);
        // отрисовка страницы для залогиненного пользователя
        const userData = {
          name: authData.name,
          email: authData.email,
          isLoggedIn: true,
        };
        this.dependencies.page.renderMain(userData);
      }
    } catch (error) {
      this.errorSpans.serverError.textContent = error.message;
      this.formValidator._setButtonEnabledState(this.submitButton);
      this.formValidator._setInputsEnabledState(inputs);
    }
  }

  setEventListeners = () => {
    super.setEventListeners();
    this.form.addEventListener('submit', this.submitHandler);
    this.regButton.addEventListener('click', this.dependencies.regPopup.open);
  }

  removeListeners = () => {
    this.form.removeEventListener('submit', this.submitHandler);
    this.regButton.removeEventListener('click', this.dependencies.regPopup.open);
  }
}