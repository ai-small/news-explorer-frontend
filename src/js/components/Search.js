import BaseComponent from './BaseComponent';
import { firstArrayValue, errorMessages } from '../constants/constants';
import transformData from '../utils/transformData';

// После сабмита формы поиска производится валидация.
// Если в поле не введён текст, выводится ошибка «Нужно ввести ключевое слово».
// Если слово введено, то осуществляется запрос к API.
// Поиск ведется по российским новостям с этим ключевым словом.

// Настройте запрос. Выберите конечную точку запроса everything. Затем настройте параметры:
// запрос: то, что ввёл пользователь в поиск;
// apiKey: ключ, который вы получите после регистрации;
// from: 7 дней назад от текущей даты;
// to: текущая дата;
// pageSize: максимально допустимый массив. Выберите 100 статей — это ограничение бесплатной версии.
// Полученные от сервера данные нужно отобразить в блоке результатов.

export default class Search extends BaseComponent {
  constructor(params) {
    super();
    this.searchButton = params.searchButton;
    this.preloader = params.preloader;
    this.notFound = params.notFound;
    this.search = this.search.bind(this);
    this.articlesContainer = params.articlesContainer;
    this.searchResultsTitle = params.searchResultsTitle;
    this.errors = params.errorMessages;
    // this.newsApi = params.newsApi;

  }

  setSearch = (isLoggedIn) => {
    this.isLoggedIn = isLoggedIn;
    console.log('set search parameters, isloggedin? ', this.isLoggedIn, isLoggedIn);

    this.form = document.forms.search;
    this.errorSpans = {
      textError: document.querySelector('#search-error'),
    };
    this.formValidator = this.dependencies.createFormValidator(this.form, this.errorSpans, this.searchButton);

    this.setHandlers([
      { element: this.form, event: 'input', handler: this.formValidator.inputHandler },
      { element: this.form, event: 'submit', handler: this.search },
    ]);
  }

  _togglePreloader = () => {
    this.preloader.classList.toggle('hidden');
  }

  showNotFoundBlock = () => {
    this.notFound.style.display = 'flex';
  }

  hideNotFoundBlock = () => {
    this.notFound.style.display = '';
  }

  async search(event) {
    event.preventDefault();
    if (this.form.checkValidity()) {
      this.hideNotFoundBlock();
      this.dependencies.articleList.clearContent();
      try {
        const input = Array.from(this.form.elements).filter(element => element.tagName === 'INPUT');
        if (input.length === 1) {
          const keyword = input[firstArrayValue].value.trim().replace(/\s+/g, ' ');
          this.formValidator._setButtonDisabledState(this.searchButton);
          this._togglePreloader();
          const searchResults = await this.dependencies.newsApi.getNews(keyword);
          this.formValidator._setButtonEnabledState(this.searchButton);
          this._togglePreloader();
          if (searchResults.totalResults === 0) {
            this.showNotFoundBlock();
            return;
          }
          const articlesData = transformData(searchResults.articles, keyword);

          this.dependencies.articleList.renderResults(articlesData, this.isLoggedIn);

        } else throw new Error(errorMessages.notYetRealisedSearchFunction);


      } catch (error) {
        console.log(error);
        this.errorSpans.textError.textContent = this.errors.serverErrorNewsApi;
        this.formValidator._setButtonEnabledState(this.searchButton);
      }
    } else this.errorSpans.textError.textContent = errorMessages.emptyKeyword;
  }
}