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
        <input class="form__input" id="signup-name" type="text" name="name-signup" pattern="^[а-яё]+(?:(?:-|\s)[А-ЯЁ][а-яё]+)?$" minlength="2" maxlength="30" placeholder="Введите своё имя" required="">
        <span class="form__error" id="name-error"></span>
      </div>
      <div class="form__submit-area">
        <span class="form__error form__server-error"></span>
      <button type="submit" class="button button_type_button button_color_blue button_disabled form__button" id="submit-button" disabled>Зарегистрироваться</button>
      <p class="form__text-container">или <button type="button" class="button button_type_text link" id="open-signin">Войти</button></p>
      </div>
  </form>
`;

  constructor (params) {
    super(params);
    this.popupContainer = params.popupContainer;
    this.createFormValidator = params.createFormValidator;
  }

  _renderContent = () => {
    super.setContent(RegPopup._markupRegPopup);
    this.form = document.forms.signup;
    this.submitButton = this.form.querySelector('#submit-button');
    this.authButton = this.form.querySelector('.button_type_text');
    const errorSpans = {
      emailError: this.form.querySelector('#email-error'),
      passwordError: this.form.querySelector('#password-error'),
      textError: this.form.querySelector('#name-error'),
      serverError: this.form.querySelector('.form__server-error'),
    };
    this.dependencies.createFormValidator(this.form, errorSpans, this.submitButton).setEventListeners();
    this.setEventListeners();
  }

  open = () => {
    super.open();
    super.clearContent();
    super.removeListeners()
    this._renderContent();
  }

  close = (event) => {
    super.close(event);
    super.removeListeners();
    // this.removeListeners();
  }

  submitHandler = (event) => {
    event.preventDefault();
    // на время выполнения запроса - заблокировать кнопку и инпуты
    console.log('submit!')
    console.log(event)
  }

  setEventListeners = () => {
    super.setEventListeners();
    this.form.addEventListener('submit', this.submitHandler);
    this.authButton.addEventListener('click', this.dependencies.authPopup.open);
  }

  saveDependencies = (dependencies) => {
    super.saveDependencies(dependencies);
  }
}