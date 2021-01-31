// NewsCard. Класс карточки новости. Методы:
// renderIcon — отвечает за отрисовку иконки карточки.
// У этой иконки три состояния: иконка незалогиненного пользователя,
// активная иконка залогиненного, неактивная иконка залогиненного.

import BaseComponent from "./BaseComponent";

export default class NewsCard extends BaseComponent {

  static _markupNewsCard = `
          <button class="article__bookmark-icon article__bookmark-icon_default" data-tooltip="Войдите, чтобы сохранять статьи"></button>
          <img src="" alt="image description" class="article__image">
          <a href="" class="article__url" target="_blank">
            <time datetime="" class="article__date"></time>
            <h3 class="title article__title"></h3>
            <p class="article__intro"></p>
          </a>
          <p class="article__source"></p>`;

  constructor(articlesContainer) {
    super();
    this.articlesContainer = articlesContainer;
    this.articleContainer = document.createElement('div');

  }

  createCard = (cardData, isLoggedIn) => {
    if (cardData) {
      const template = this.getTemplate(NewsCard._markupNewsCard);
      Array.from(template).forEach((node)=> this.articleContainer.appendChild(node));
      this.articleContainer.classList.add('article');
      // console.log(cardData);
      this.articleContainer.setAttribute('data-keyword', cardData.keyword);
      this.bookmarkIcon = this.articleContainer.querySelector('.article__bookmark-icon');
      this.cardImage = this.articleContainer.querySelector('.article__image');
      this.date = this.articleContainer.querySelector('.article__date');
      this.articleUrl = this.articleContainer.querySelector('.article__url');
      this.title = this.articleContainer.querySelector('.article__title');
      this.description = this.articleContainer.querySelector('.article__intro');
      this.source = this.articleContainer.querySelector('.article__source');

      this.renderIcon(isLoggedIn);

      this.cardImage.setAttribute('src', cardData.urlToImage);
      this.articleUrl.setAttribute('href', cardData.url);
      this.date.textContent = cardData.publishedAt.dateForCard;
      this.date.setAttribute('datetime', cardData.publishedAt.dateForDatetime);
      this.title .textContent = cardData.title;
      this.description.textContent = cardData.description;
      this.source.textContent = cardData.source;

      return this.articleContainer
    }

    return;

  }

  renderIcon = (isLoggedIn) => {
    if (isLoggedIn) {
      // слушатель на иконку, убрать тултип
      console.log('рисую иконку для ', isLoggedIn);
    }

  }

}