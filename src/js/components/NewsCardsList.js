import BaseComponent from "./BaseComponent";

// NewsCardList. Класс списка карточек новостей.
// Конструктор принимает массив карточек, которые должны быть в списке при первой отрисовке.
// Методы:
// renderResults принимает массив экземпляров карточек и отрисовывает их;
// renderLoader отвечает за отрисовку лоудера;
// renderError принимает объект ошибки и показывает ошибку в интерфейсе;
// showMore отвечает за функциональность кнопки «Показать ещё»;
// addCard принимает экземпляр карточки и добавляет её в список.

export default class NewsCardList extends BaseComponent {
  constructor(params) {
    super();
    this.articlesContainer = params.articlesContainer;
    this.searchResultsTitle = params.searchResultsTitle;
    this.showMoreButton = params.showMoreButton;
    this.showMoreClickCount = 0;
    this.cardsInRow = params.cardsInRow;
    // this.defaultArticles = defaultArticles;
  }

  _addCard = (article, isLoggedIn) => {
    this.articlesContainer.append(this.dependencies.createArticle(this.articlesContainer).createCard(article, isLoggedIn));
  }

  renderResults = (articlesData, isLoggedIn) => {
    this.articlesData = articlesData;
    this.isLoggedIn = isLoggedIn;
    console.log('render results isLoggedIn = ', this.isLoggedIn);
    this.maxCardCount = this.articlesData.length;
    this.searchResultsTitle.classList.remove('hidden');
    this.articlesContainer.classList.remove('hidden');
    this.showMoreButton.classList.remove('hidden');
    this.setHandlers([
      { element: this.showMoreButton, event: 'click', handler: this.showMore },
    ]);

    let indexMin = this.showMoreClickCount * this.cardsInRow;
    let indexMax = indexMin + this.cardsInRow;

    if (indexMax > this.maxCardCount) {
      this._hideShowMoreButton();
    }

    for (let i = indexMin; i < indexMax && i < this.maxCardCount; i++) {
      this._addCard(this.articlesData[i], isLoggedIn);
    }
  }

  renderLoader = () => {

  }

  renderError = (error) => {

  }

  showMore = () => {
    this.showMoreClickCount += 1;
    console.log('show more click!', this.showMoreClickCount);
    this.renderResults(this.articlesData, this.isLoggedIn);
  }

  _hideShowMoreButton = () => {
    this.showMoreButton.classList.add('hidden');
    this.removeHandlers([
      { element: this.showMoreButton, event: 'click', handler: this.showMore },
    ]);
  }

  clearContent = () => {
      const nodes = this.articlesContainer.querySelectorAll('.article');
      if (nodes.length) {
        this.articlesContainer.innerHTML = '';
        this.showMoreClickCount = 0;
        this.searchResultsTitle.classList.add('hidden');
      }
  }

}