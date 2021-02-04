import BaseComponent from "./BaseComponent";

export default class NewsCardList extends BaseComponent {
  constructor(params) {
    super();
    this.articlesContainer = params.articlesContainer;
    this.searchResultsTitle = params.searchResultsTitle;
    this.showMoreButton = params.showMoreButton;
    this.showMoreClickCount = 0;
    this.cardsInRow = params.cardsInRow;
  }

  _addCard = (article, isLoggedIn, pageName) => {
    this.articlesContainer.append(this.dependencies.createArticle(this.articlesContainer).createCard(article, isLoggedIn, pageName, this.dependencies.mainApi));
  }

  renderResults = (articlesData, isLoggedIn, pageName) => {
    this.articlesData = articlesData;
    this.isLoggedIn = isLoggedIn;
    this.pageName = pageName;

    if (this.pageName == 'main') {
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
        this._addCard(this.articlesData[i], this.isLoggedIn, pageName);
      }
    }

    if (this.pageName == 'saved') {
      this.articlesData.forEach(article => {
        this._addCard(article, this.isLoggedIn, pageName)
      });
    }
  }

  showMore = () => {
    this.showMoreClickCount += 1;
    this.renderResults(this.articlesData, this.isLoggedIn, this.pageName);
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
      this._hideShowMoreButton();
    }
  }
}