import '../pages/saved.css';
import {
  headerElements,
  searchResults,
  savedArticlesTitle,
  keywordsCount,
  articlesContainer,
  showMoreButton,
  cardsInRow,
  keywords,
  keyword,
  preloader,
} from './constants/constants';
import MAIN_API_CONFIG from './constants/mainApiConfig';

import MainApi from './api/MainApi';
import Page from './components/Page';
import SavedArticlesBlock from './components/SavedArticlesBlock';
import Header from './components/Header';
import NewsCard from './components/NewsCard';
import NewsCardList from './components/NewsCardsList';

// Инстансы
const mainApi = new MainApi(MAIN_API_CONFIG);
const pageSavedArt = new Page({ mainApi, headerElements, preloader });
const headerWhite = new Header(headerElements);
const savedArticlesBlock = new SavedArticlesBlock({
  savedArticlesTitle,
  searchResults,
  keywordsCount,
  keywords,
  keyword,
});
const createArticle = (...arg) => new NewsCard(...arg);
const articleList = new NewsCardList({
  articlesContainer,
  showMoreButton,
  cardsInRow,
});

// dependencies
pageSavedArt.saveDependencies({ headerWhite, savedArticlesBlock });
headerWhite.saveDependencies({ mainApi });
savedArticlesBlock.saveDependencies({ mainApi, articleList, createArticle });
articleList.saveDependencies({ createArticle, mainApi });

// ОТРИСОВАТЬ СТРАНИЦУ
pageSavedArt.renderSavedArticles();
