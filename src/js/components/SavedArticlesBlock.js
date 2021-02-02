import BaseComponent from './BaseComponent';
import getNounEnding from '../utils/getNounEnding';
import getAdjectiveEnding from '../utils/getAdjectiveEnding';
import countKeywords from '../utils/countKeywords';
import { NOUN_ENDINGS_ARRAY, ADJECTIVE_ENDINGS_ARRAY, NUMBERS_ENDINGS_ARRAY } from '../constants/constants';

export default class SavedArticlesBlock extends BaseComponent {
  constructor(params) {
    super();
    this.savedArticlesTitle = params.savedArticlesTitle;
    this.keywordsCount = params.keywordsCount;
    this.keywords = params.keywords;
    this.keyword = params.keyword;
    this.searchResults = params.searchResults;
  }

  async render(username, pageName) {
    try {
      const articles = await this.dependencies.mainApi.getArticles();
      if (articles.articles.length) {
        this.savedArticlesTitle.textContent = `${username}, у вас ${articles.articles.length} сохранённ${getAdjectiveEnding(articles.articles.length, ADJECTIVE_ENDINGS_ARRAY)} ста${getNounEnding(articles.articles.length, NOUN_ENDINGS_ARRAY)}`;
        const keywordsArr = articles.articles.map((article) => article.keyword).sort();
        const keywordRepeats = countKeywords(keywordsArr);
        this.sortedKeywords = Object.keys(keywordRepeats).sort(function (a, b) { return keywordRepeats[b] - keywordRepeats[a] });
        if (this.sortedKeywords.length === 1) {
          this.keyword.textContent = `${this.sortedKeywords[0]}`;
        }
        if (this.sortedKeywords.length === 3) {
          this.keyword.textContent = `${this.sortedKeywords[0]}, ${this.sortedKeywords[1]} и ${this.sortedKeywords[2]}`;
        }

        if (this.sortedKeywords.length === 2) {
          this.keyword.textContent = `${this.sortedKeywords[0]} и ${this.sortedKeywords[1]}`;
        }

        if (this.sortedKeywords.length > 3) {
          this.keyword.textContent = `${this.sortedKeywords[0]}, ${this.sortedKeywords[1]}`;
          this.keywordsCount.textContent = ` и ${this.sortedKeywords.length - 2}${getNounEnding(this.sortedKeywords.length - 2, NUMBERS_ENDINGS_ARRAY)} другим`;
        }
      }

      this.sortedKeywords.forEach(keyword => {
        const filtered = articles.articles.filter(article => article.keyword === keyword);
        this.dependencies.articleList.renderResults(filtered, true, pageName);
      });
    } catch (error) {
      console.log(error);
      this.savedArticlesTitle.textContent = `${username}, ${error.message.toLowerCase()}`;
      this.keywords.classList.add('hidden');
      this.searchResults.classList.add('hidden');
    }
  }
}
