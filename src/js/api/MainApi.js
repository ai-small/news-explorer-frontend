require('babel-polyfill'); //из-за async

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

      const result = await res.json();
      return this._checkServerResponse(res, result)

    } catch (error) {
      console.log(error);
      throw error // обязательно прокинуть ошибку дальше
    }
  }

  async signin([email, password]) {
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

  async logout() {
    try {
      const res = await fetch(`${this.url}${this.routes.logout}`, {
        method: 'POST',
        headers: this.headers,
        credentials: 'include',
      });

      const result = await res.json();
      return this._checkServerResponse(res, result)

    } catch (error) {
      console.log(error);
      throw error
    }
  }

  async saveArticle({ keyword, title, text, date, datetime, source, link, image }) {
    try {
      const res = await fetch(`${this.url}${this.routes.articles}`, {
        method: 'POST',
        headers: this.headers,
        credentials: 'include',
        body: JSON.stringify({
          keyword,
          title,
          text,
          date,
          datetime,
          source,
          link,
          image,
        }),
      });

      const result = await res.json();
      return this._checkServerResponse(res, result)

    } catch (error) {
      console.log(error);
      throw error
    }
  }

  async deleteArticle(id) {
    try {
      const res = await fetch(`${this.url}${this.routes.articles}/${id}`, {
        method: 'DELETE',
        headers: this.headers,
        credentials: 'include',
      });

      const result = await res.json();
      return this._checkServerResponse(res, result)

    } catch (error) {
      console.log(error);
      throw error
    }
  }

  async getArticles() {
    try {
      const res = await fetch(`${this.url}${this.routes.articles}`, {
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