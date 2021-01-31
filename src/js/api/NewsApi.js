// NewsApi. Отвечает за взаимодействие с NewsAPI.
// У класса есть конструктор, принимающий опции, и единственный обязательный метод getNews.
// getNews возвращает список новостей на основе запроса.

export default class NewsApi {
  constructor(options) {
    this.url = options.url;
    this.endpoint = options.endpoint;
    this.apiKey = options.apiKey;
    this.pageSize = options.pageSize;
  }

  _checkServerResponse = (res, result) => {
    if (!res.ok) {
      throw new Error(result.message);
    }
    return result
  }

  async getNews(keyword) {
    try {
      const res = await fetch(`${this.url}${this.endpoint}?` +
        `q=${keyword}&` +
        `from=2021-01-23&` + //getDate
        `to=2021-01-29&` + //getDate
        `pageSize=${this.pageSize}&` +
        `apiKey=${this.apiKey}`
      );

      const result = await res.json(); // читаем ответ сервера в json-формате
      return this._checkServerResponse(res, result)

    } catch (error) {
      console.log(error);
      throw error // обязательно прокинуть ошибку дальше
    }
  }
}