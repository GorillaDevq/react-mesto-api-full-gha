import { options } from "./constans"
export default class Auth {
  constructor(options) {
    this._baseUrl = options.baseUrl
    this._headers = options.headers;
  }

  singUp({email, password}) {
    return fetch(this._baseUrl + '/signup', {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        email: email,
        password: password,
      })
    })
    .then(res => this._checkResponse(res))
  }

  singIn({email, password}) {
    return fetch(this._baseUrl + '/signin', {
      method: 'POST',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        email: email,
        password: password,
      })
    })
    .then(res => this._checkResponse(res))
  }

  checkToken() {
    return fetch(this._baseUrl + '/users/me', {
      credentials: 'include',
      headers: this._headers,
    })
    .then(res => this._checkResponse(res))
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(res.status);
  }
}

const auth = new Auth(options)

export { auth }