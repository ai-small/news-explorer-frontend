export default class BaseComponent {
  constructor() {
    this.template = document.createElement('div');
  }

  setHandlers(options) {
    options.forEach(option => {
      option.element.addEventListener(option.event, option.handler);
    })
  }

  removeHandlers(options) {
    options.forEach(option => {
      option.element.removeEventListener(option.event, option.handler);
    })
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
