import getDatesForNewsApi from '../utils/getDatesForNewsApi';

export default class NewsApi {
  constructor(options) {
    this.url = options.url;
    this.endpoint = options.endpoint;
    this.apiKey = options.apiKey;
    this.pageSize = options.pageSize;
    this.sortBy = options.sortBy;
    this.language = options.language;
  }

  _checkServerResponse = (res, result) => {
    if (!res.ok) {
      throw new Error(result.message);
    }
    return result
  }

  async getNews(keyword) {
    try {
      const { from, to } = getDatesForNewsApi();
      const res = await fetch(`${this.url}${this.endpoint}?` +
        `q=${keyword}&` +
        `from=${from}&` +
        `to=${to}&` +
        `sortBy=${this.sortBy}&` +
        `language=${this.language}&` +
        `pageSize=${this.pageSize}&` +
        `apiKey=${this.apiKey}`
      );

      const result = await res.json();
      return this._checkServerResponse(res, result)

    } catch (error) {
      console.log(error);
      throw error // обязательно прокинуть ошибку дальше
    }
  }
}