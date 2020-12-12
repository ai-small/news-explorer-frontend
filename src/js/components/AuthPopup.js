import Popup from './Popup';

// + При нажатии на «Вход» в шапке сайта, должен появляться попап с формой входа в систему.
// + При клике на крестик в правом верхнему углу попап с формой должен закрываться.
// + Форма входа тоже должна валидироваться на фронтенде:
    // оба поля обязательны,
    // поле email должно соответствовать шаблону почты.
// + Всё остальное как с формой регистрации: механика валидации «на лету» и показ ошибок в интерфейсе.
// + Если форма заполнена корректно, кнопка «Войти» становится активной.
// Клик по ней отправляет запрос на роут /signin.
// Если логин и пароль правильные, сервер возвращает клиенту JWT.
// При этом токен должен сохраняться в localStorage, а попап входа в систему закрываться.

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

  constructor(params) {
    super(params); // зовем родительский класс
    this.popupContainer = params.popupContainer;
    this.createFormValidator = params.createFormValidator;
  }

  _renderContent = () => {
    super.setContent(AuthPopup._markupAuthPopup);
    this.form = document.forms.signin;
    this.submitButton = this.form.querySelector('#submit-button');
    this.regButton = this.form.querySelector('.button_type_text');
    const errorSpans = {
      emailError: this.form.querySelector('#email-error'),
      passwordError: this.form.querySelector('#password-error'),
      serverError: this.form.querySelector('.form__server-error'),
    };
    this.dependencies.createFormValidator(this.form, errorSpans, this.submitButton).setEventListeners();
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

  submitHandler = (event) => {
    event.preventDefault();
    // на время выполнения запроса - заблокировать кнопку и инпуты
    console.log('submit!')
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