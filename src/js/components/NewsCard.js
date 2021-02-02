import BaseComponent from "./BaseComponent";

export default class NewsCard extends BaseComponent {

  static _markupNewsCard = `
          <button class="article__bookmark-icon article__bookmark-icon_default" disabled data-tooltip="Войдите, чтобы сохранять статьи"></button>
          <img src="" alt="image description" class="article__image">
          <a href="" class="article__url" target="_blank">
            <time datetime="" class="article__date"></time>
            <h3 class="title article__title"></h3>
            <p class="article__intro"></p>
          </a>
          <p class="article__source"></p>`;

  static _markupArticleCard = `
            <button class="article__delete-icon" data-tooltip="Убрать из сохранённых"></button>
            <span class="article__keyword"></span>
            <img src="" alt="image description" class="article__image">
            <a href="" class="article__url" target="_blank">
              <time datetime="" class="article__date"></time>
              <h3 class="title article__title"></h3>
              <p class="article__intro"></p>
            </a>
            <p class="article__source"></p>`;

  constructor() {
    super();
    this.articleContainer = document.createElement('div');
    this.isSaved = false;
    this.saveArticle = this.saveArticle.bind(this);
    this.deleteArticle = this.deleteArticle.bind(this);
  }

  _createCardBody = (markup, cardContainer) => {
    const template = this.getTemplate(markup);
    Array.from(template).forEach((node) => cardContainer.appendChild(node));
  }
  _fillSameCardNodes = (cardData) => {
    this.cardImage.setAttribute('src', cardData.image);
    this.articleUrl.setAttribute('href', cardData.link);
    this.date.textContent = cardData.date;
    this.date.setAttribute('datetime', cardData.datetime);
    this.title.textContent = cardData.title;
    this.description.textContent = cardData.text;
    this.source.textContent = cardData.source;
  }

  createCard = (cardData, isLoggedIn, pageName, mainApi) => {
    this.mainApi = mainApi;
    this.articleContainer.classList.add('article');
    this.articleContainer.setAttribute('data-keyword', cardData.keyword);

    if (cardData && pageName === 'main') {
      this.isLoggedIn = isLoggedIn;
      this.cardData = cardData;

      this._createCardBody(NewsCard._markupNewsCard, this.articleContainer);

      this.bookmarkIcon = this.articleContainer.querySelector('.article__bookmark-icon');
      this.cardImage = this.articleContainer.querySelector('.article__image');
      this.date = this.articleContainer.querySelector('.article__date');
      this.articleUrl = this.articleContainer.querySelector('.article__url');
      this.title = this.articleContainer.querySelector('.article__title');
      this.description = this.articleContainer.querySelector('.article__intro');
      this.source = this.articleContainer.querySelector('.article__source');

      this.renderIcon();

      this._fillSameCardNodes(cardData);
    }

    if (cardData && pageName === 'saved') {
      this.isLoggedIn = isLoggedIn;
      this.cardData = cardData;

      this._createCardBody(NewsCard._markupArticleCard, this.articleContainer);

      this.deleteIcon = this.articleContainer.querySelector('.article__delete-icon');
      this.keywordBadge = this.articleContainer.querySelector('.article__keyword');
      this.cardImage = this.articleContainer.querySelector('.article__image');
      this.date = this.articleContainer.querySelector('.article__date');
      this.articleUrl = this.articleContainer.querySelector('.article__url');
      this.title = this.articleContainer.querySelector('.article__title');
      this.description = this.articleContainer.querySelector('.article__intro');
      this.source = this.articleContainer.querySelector('.article__source');
      this.articleContainer.setAttribute('data-id', cardData._id);
      this.keywordBadge.textContent = cardData.keyword;
      this._fillSameCardNodes(cardData);
      this.setHandlers([
        { element: this.deleteIcon, event: 'click', handler: this.deleteArticle },
      ]);
    }

    return this.articleContainer
  }
  _disableButton = (button) => {
    button.setAttribute('disabled', 'disabled');
  }

  _enableButton = (button) => {
    button.removeAttribute('disabled');
  }

  _hideTooltip = () => {
    this._enableButton(this.bookmarkIcon);
    this.bookmarkIcon.removeAttribute('data-tooltip');
    this.bookmarkIcon.classList.add('article__bookmark-icon_hide-tooltip');
  }

  _showTooltip = () => {
    this._disableButton(this.bookmarkIcon);
    this.bookmarkIcon.setAttribute('data-tooltip', 'Войдите, чтобы сохранять статьи');
    this.bookmarkIcon.classList.remove('article__bookmark-icon_hide-tooltip');
  }

  bookmarkButtonHandler = (event) => {
    if (this.isSaved) {
      this.deleteArticle(event);
    } else this.saveArticle();
  }

  _toggleBookmarkIconState = () => {
    this.bookmarkIcon.classList.toggle('article__bookmark-icon_default');
    this.bookmarkIcon.classList.toggle('article__bookmark-icon_saved');
  }

  renderIcon = () => {
    if (this.isLoggedIn) {
      this._hideTooltip();
      this.setHandlers([
        { element: this.bookmarkIcon, event: 'click', handler: this.bookmarkButtonHandler },
      ]);
    }
  }

  async saveArticle() {
    try {
      this._disableButton(this.bookmarkIcon);
      const res = await this.mainApi.saveArticle(this.cardData);
      this.articleContainer.setAttribute('data-id', res.id);
      this.isSaved = true;
      this._toggleBookmarkIconState();
      this._enableButton(this.bookmarkIcon);
    } catch (error) {
      console.log(error)
    }
  }

  async deleteArticle(event) {
    try {
      this._disableButton(event.target);
      const id = this.articleContainer.dataset.id;
      const res = await this.mainApi.deleteArticle(id);
      if (event.target.classList.contains('article__bookmark-icon')) {
        this.isSaved = false;
        this._toggleBookmarkIconState();
      }

      if (event.target.classList.contains('article__delete-icon')) {
        this.articleContainer.remove();
        this.removeHandlers([{ element: this.deleteIcon, event: 'click', handler: this.deleteArticle }]);
        // window.location.reload();
        // как-то пересчитать цифры сохраненных статей, при перезагрузке 2 лишних запроса
      }
      this._enableButton(event.target);
    } catch (error) {
      console.log(error);
    }
  }
}