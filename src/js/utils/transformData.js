import { DEFAULT_URL_IMAGE, MONTH, MONTH_NUMBERS } from '../constants/constants';

function transformDate(value) {
  const date = new Date(value);
  const dateForCard = `${date.getDate()} ${MONTH[date.getMonth()]}, ${date.getFullYear()}`;
  const dateForDatetime = `${date.getFullYear()}-${MONTH_NUMBERS[date.getMonth()]}-${date.getDate()}`;
  return { dateForCard, dateForDatetime };
}

export default function transformData(articles, keyword) {
  const transformedKeyword = keyword.toLowerCase().replace(/^[a-zа-яё]/, (firstSymbol) => firstSymbol.toUpperCase());

  const transformedArticles = articles.map((article) => {
    if (!article.urlToImage) {
      article.urlToImage = DEFAULT_URL_IMAGE;
    }

    const articleDates = transformDate(article.publishedAt);

    return {
      keyword: transformedKeyword,
      title: article.title,
      text: article.description,
      date: articleDates.dateForCard,
      datetime: articleDates.dateForCard,
      source: article.source.name,
      link: article.url,
      image: article.urlToImage,
    };
  });

  return transformedArticles;
}
