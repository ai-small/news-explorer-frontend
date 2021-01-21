// У класса BaseComponent должен быть метод constructor.
// Он принимает на вход массив обработчиков событий и вызывает приватный метод _setHandlers.
// Этот метод добавляет обработчики конкретным элементам.

export default class BaseComponent {
  constructor(handlers) {
    this.handlers = handlers;
  }

  _setHandlers() {
  }

  saveDependencies(dependencies) {
    this.dependencies = dependencies;
  }
}
