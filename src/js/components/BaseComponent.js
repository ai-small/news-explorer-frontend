// У класса BaseComponent должен быть метод constructor.
// Он принимает на вход массив обработчиков событий и вызывает приватный метод _setHandlers.
// Этот метод добавляет обработчики конкретным элементам.

export default class BaseComponent {
  constructor(handlers) {
    this.handlers = handlers;
    this.template = document.createElement('div');
  }

  _setHandlers() {
  }

  getTemplate = (markup) => {
    this.template.insertAdjacentHTML('afterbegin', markup);
    return this.template.children;
  }

  pasteIntoDOM = (markup, parentNode) => {
    Array.from(this.getTemplate(markup)).forEach(node => parentNode.appendChild(node));
  }

  saveDependencies(dependencies) {
    this.dependencies = dependencies;
  }
}
