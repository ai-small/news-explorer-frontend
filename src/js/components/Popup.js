import BaseComponent from './BaseComponent';

export default class Popup extends BaseComponent {
  constructor(params) {
    super();
    this.closePopupButton = params.closePopupButton;
    this.popup = params.popup;
    this.body = params.body;
    this.overlay = params.overlay;
    this.template = document.createElement('div');
    this.close = this.close.bind(this);
    this._escapeKeyPressed = this._escapeKeyPressed.bind(this);
    this._clickOutToClosePopup = this._clickOutToClosePopup.bind(this);
  }

  // очищает содержимое контейнера
  clearContent() {
    const title = this.popup.querySelector('.popup__title');
    const form = this.popup.querySelector('.form');
    if (this.popup.contains(title) && this.popup.contains(form)) {
      this.popup.querySelector('.popup__title').remove();
      this.popup.querySelector('.form').remove();
    }
  }

  open() {
    this.popup.classList.remove('hidden');
    this.body.classList.add('overflow-hidden'); // запрещаем скролл при открытом окне
    this.overlay.classList.remove('hidden'); // затемняем страницу при открытом попапе
  }

  close(event) {
    event.stopImmediatePropagation();
    this.clearContent();
    this.popup.classList.add('hidden');
    this.body.classList.remove('overflow-hidden');
    this.overlay.classList.add('hidden');
  }

  _escapeKeyPressed(event) {
    if (event.key === 'Escape') {
      this.close(event);
    }
  }

  _clickOutToClosePopup(event) {
    if (!this.popup.classList.contains('hidden')) {
      this.close(event);
    }
  }
}
