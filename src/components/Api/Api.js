import { handleResponse } from "../../utils/utils";

export class Api {
  constructor({ baseUrl, token }) {
    this._url = baseUrl;
    this._token = token;
  }

  _checkEndpoint(endpoint) {
    if (!/^\//.test(endpoint)) {
      throw new Error('Endpoint must start with "/"');
    }
  }

  get(endpoint) {
    this._checkEndpoint(endpoint);

    return fetch(`${this._url}${endpoint}`, {
      method: "GET",
      headers: {
        authorization: this._token,
      },
    })
      .then(handleResponse)
      .catch((e) => console.error(e));
  }

  post(endpoint, body) {
    this._checkEndpoint(endpoint);

    return fetch(`${this._url}${endpoint}`, {
      method: "POST",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
      body: body && JSON.stringify(body),
    })
      .then(handleResponse)
      .catch((e) => console.error(e));
  }

  patch(endpoint, body) {
    this._checkEndpoint(endpoint);

    return fetch(`${this._url}${endpoint}`, {
      method: "PATCH",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
      body: body && JSON.stringify(body),
    })
      .then(handleResponse)
      .catch((e) => console.error(e));
  }

  put(endpoint) {
    this._checkEndpoint(endpoint);

    return fetch(`${this._url}${endpoint}`, {
      method: "PUT",
      headers: {
        authorization: this._token,
      },
    })
      .then(handleResponse)
      .catch((e) => console.error(e));
  }
  delete(endpoint) {
    this._checkEndpoint(endpoint);

    return fetch(`${this._url}${endpoint}`, {
      method: "DELETE",
      headers: {
        authorization: this._token,
      },
    })
      .then(handleResponse)
      .catch((e) => console.error(e));
  }

  // getCards(endpoint) {
  //   return fetch(`${this._url}${endpoint}`, {
  //     headers: {
  //       authorization: this._token,
  //     },
  //   })
  //     .then(handleResponse)
  //     .catch((e) => console.error(e));
  // }
  //
  // getUserInfo(url) {
  //   return fetch(this._url + url, {
  //     headers: {
  //       authorization: this._token,
  //     },
  //   })
  //     .then(handleResponse)
  //     .catch((e) => console.error(e));
  // }
  //
  // saveUserInfo(url, data) {
  //   return fetch(this._url + url, {
  //     method: "PATCH",
  //     headers: {
  //       authorization: this._token,
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(data),
  //   })
  //     .then(handleResponse)
  //     .catch((e) => console.error(e));
  // }
}
