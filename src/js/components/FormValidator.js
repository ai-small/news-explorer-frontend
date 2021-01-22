import { errorMessages } from '../constants/constants';

export default class FormValidator {
  constructor (form, errorSpans, button) {
    this.form = form;
    this.button = button;
    this.errorSpans = errorSpans;
    this.errorMessages = errorMessages;
  }

  _getErrorSpan = (input) => {
    return this.errorSpans[`${input.type}Error`]
  }

  _showErrorMessage = (input) => {
    this._getErrorSpan(input).textContent = input.validationMessage;
  }

  _resetError = (input) => {
    this._getErrorSpan(input).textContent = '';
  }

  _resetServerError = () => {
    this.errorSpans.serverError.textContent = '';
  }

  _setInputsEnabledState = (inputs) => {
    inputs.forEach((input) => input.removeAttribute('disabled'));
  }

  _setInputsDisabledState = (inputs) => {
    inputs.forEach((input) => input.setAttribute('disabled', 'disabled'));
  }

  _setButtonEnabledState = (button) => {
    button.removeAttribute('disabled');
    button.classList.remove('button_disabled')
  }

  _setButtonDisabledState = (button) => {
    button.setAttribute('disabled', 'disabled');
    button.classList.add('button_disabled');
  }

  _checkInputValidity = (input) => {
    this._resetError(input);
    this._resetServerError();
    input.setCustomValidity("");

    if (input.validity.valueMissing) {
      input.setCustomValidity(this.errorMessages.valueMissing);
      this._showErrorMessage(input);
      return false
    }

    if (input.validity.tooShort || input.validity.tooLong) {
      input.setCustomValidity(this.errorMessages[`${input.type}ValueLength`]);
      this._showErrorMessage(input);
      return false
    }

    if (input.validity.patternMismatch && input.type === 'email') {
      input.setCustomValidity(this.errorMessages.patternMismatch);
      this._showErrorMessage(input);
      return false
    }

    if (input.validity.patternMismatch && input.type === 'text') {
      input.setCustomValidity(this.errorMessages.namePatternMismatch);
      this._showErrorMessage(input);
      return false
    }

    return true
  }

  inputHandler = (event) => {
    const input = event.target;
    this._checkInputValidity(input);
    if (this.form.checkValidity()) {
      this._setButtonEnabledState(this.button)
    } else {
        this._setButtonDisabledState(this.button)
    }
  }

  // setEventListeners = () => {
  //   this.form.addEventListener('input', this.inputHandler);
  // }

}