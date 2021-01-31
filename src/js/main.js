import '../pages/index.css';
import {
  storage,
  // authButton,
  popupSelectors,
  headerElements,
  searchButton,
  preloader,
  notFound,
  articlesContainer,
  searchResultsTitle,
  showMoreButton,
  cardsInRow,
  errorMessages,
} from './constants/constants';
import MAIN_API_CONFIG from './constants/mainApiConfig';
import NEWS_API_CONFIG from './constants/newsApiConfig';

import MainApi from './api/MainApi';
import NewsApi from './api/NewsApi';
import Page from './components/Page';
import AuthPopup from './components/AuthPopup';
import RegPopup from './components/RegPopup';
import SuccessPopup from './components/SuccessPopup';
import FormValidator from './components/FormValidator';
import Header from './components/Header';
import Search from './components/Search';
import NewsCard from './components/NewsCard';
import NewsCardList from './components/NewsCardsList';

// СОЗДАЕМ ИНСТАНСЫ
const createFormValidator = (...arg) => new FormValidator(...arg);
const createArticle = (...arg) => new NewsCard(...arg);
const mainApi = new MainApi(MAIN_API_CONFIG);
const newsApi = new NewsApi(NEWS_API_CONFIG);
const page = new Page({ mainApi, headerElements });
const header = new Header(headerElements);
const regPopup = new RegPopup(popupSelectors, mainApi);
const authPopup = new AuthPopup(popupSelectors, mainApi);
const successPopup = new SuccessPopup(popupSelectors, mainApi);
const searchNews = new Search({
  searchButton,
  preloader,
  notFound,
  articlesContainer,
  searchResultsTitle,
  errorMessages,

});
const articleList = new NewsCardList({
  articlesContainer,
  searchResultsTitle,
  showMoreButton,
  cardsInRow,
});

// Dependency Injections
authPopup.saveDependencies({
  regPopup,
  createFormValidator,
  header,
  page,
});
regPopup.saveDependencies({ authPopup, createFormValidator, successPopup });
successPopup.saveDependencies({ authPopup });
page.saveDependencies({ header, authPopup, searchNews });
header.saveDependencies({ authPopup, mainApi, page });
searchNews.saveDependencies({ createFormValidator, createArticle, articleList, newsApi });
articleList.saveDependencies({ createArticle, searchNews });

// ОТРИСОВАТЬ ГЛАВНУЮ СТРАНИЦУ
page.renderMain();
