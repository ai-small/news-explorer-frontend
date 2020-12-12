// Отвечает за взаимодействие с написанным вами Node.js API.
// Конструктор этого класса принимает опции, необходимые для инициализации работы с API.
// Вот список обязательных методов:
// signup регистрирует нового пользователя;
// signin аутентифицирует пользователя на основе почты и пароля;
// getUserData возвращает информацию о пользователе;
// getArticles забирает все статьи;
// createArticle создаёт статью;
// removeArticle удаляет статью.
require('babel-polyfill');

export default class MainApi {
  constructor(config) {
    this.url = config.url;
    this.headers = config.headers;
    this.routes = config.routes;
  }

  _checkServerResponse = (res, result) => {
    if (!res.ok) {
      throw new Error(result.message);
    }
    return result
  }

  async signup([email, password, name]) {
    try {
      console.log(this.url, this.routes.signup)
      const res = await fetch(`${this.url}${this.routes.signup}`, {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify({
          email,
          password,
          name,
        }),
      });

      const result = await res.json(); // читаем ответ сервера в json-формате
      return this._checkServerResponse(res, result)

    } catch (error) {
      console.log(error);
      throw error // обязательно прокинуть ошибку дальше
    }

  }

  // async signin () {

  // }
}