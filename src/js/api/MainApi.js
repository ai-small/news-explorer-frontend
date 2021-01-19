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

  async signin ([email, password]) {
    try {
      const res = await fetch(`${this.url}${this.routes.signin}`, {
        method: 'POST',
        headers: this.headers,
        credentials: 'include',
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const result = await res.json();
      return this._checkServerResponse(res, result)

    } catch (error) {
      console.log(error);
      throw error
    }

  }

  async getUser() {
    try {
      const res = await fetch(`${this.url}${this.routes.getUser}`, {
        method: 'GET',
        credentials: 'include',
        headers: this.headers,
      });

      const result = await res.json();
      return this._checkServerResponse(res, result)

    } catch (error) {
      console.log(error);
      throw error
    }
  }
}