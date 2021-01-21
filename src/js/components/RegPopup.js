import Popup from './Popup';

export default class RegPopup extends Popup {

  static _markupRegPopup = `
  <h3 class="popup__title">Регистрация</h3>
    <form class="form" name="signup">
      <div class="form__field">
        <label for="signup-email" class="form__label">Email</label>
        <input class="form__input" id="signup-email" type="email" name="email-signup" pattern="^[A-Za-z](?:[A-Za-z0-9_]+)?(?:(?:(?:-|\.)[A-Za-z0-9_]+)+)?@[a-z0-9]+(?:-[a-z0-9]+)?\.[a-z]+(?:\.[a-z]+)?$" minlength="5" placeholder="Введите почту" required="">
        <span class="form__error" id="email-error"></span>
      </div>
      <div class="form__field">
        <label for="signup-password" class="form__label">Пароль</label>
        <input class="form__input" id="signup-password" type="password" name="password-signup" minlength="8" placeholder="Введите пароль" required="">
        <span class="form__error" id="password-error"></span>
      </div>
      <div class="form__field">
        <label for="signup-name" class="form__label">Имя</label>
        <input class="form__input" id="signup-name" type="text" name="name-signup" pattern="^[A-Z,a-z,А-ЯЁа-яё]+(?:(?:-|\s)[A-Z,А-ЯЁ][а-яё]+)?$" minlength="2" maxlength="30" placeholder="Введите своё имя" required="">
        <span class="form__error" id="name-error"></span>
      </div>
      <div class="form__submit-area">
        <span class="form__error form__server-error"></span>
      <button type="submit" class="button button_type_button button_color_blue button_disabled form__button" id="submit-button" disabled>Зарегистрироваться</button>
      <p class="form__text-container">или <button type="button" class="button button_type_text link" id="open-signin">Войти</button></p>
      </div>
  </form>
`;

  constructor(params, mainApi) {
    super(params);
    this.popupContainer = params.popupContainer;
    this.createFormValidator = params.createFormValidator;
    this.mainApi = mainApi;
    this.submitHandler = this.submitHandler.bind(this);
  }

  _renderContent = () => {
    this.pasteIntoDOM(RegPopup._markupRegPopup, this.popupContainer);
    this.form = document.forms.signup;
    this.submitButton = this.form.querySelector('#submit-button');
    this.authButton = this.form.querySelector('.button_type_text');
    this.errorSpans = {
      emailError: this.form.querySelector('#email-error'),
      passwordError: this.form.querySelector('#password-error'),
      textError: this.form.querySelector('#name-error'),
      serverError: this.form.querySelector('.form__server-error'),
    };
    this.formValidator = this.dependencies.createFormValidator(this.form, this.errorSpans, this.submitButton);
    this.formValidator.setEventListeners();
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

  async submitHandler(event) {
    event.preventDefault();
    const inputs = Array.from(this.form.elements).filter(element => element.tagName === 'INPUT');
    const inputValues = inputs.map(input => input.value);
    this.formValidator._setButtonDisabledState(this.submitButton);
    this.formValidator._setInputsDisabledState(inputs);
    try {
      const newUserData = await this.mainApi.signup(inputValues);
      if (newUserData) {
        this.dependencies.successPopup.open();
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
    this.authButton.addEventListener('click', this.dependencies.authPopup.open);
  }

  // снятие слушателей!
}