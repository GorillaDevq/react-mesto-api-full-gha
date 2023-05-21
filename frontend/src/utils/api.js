import { options } from "./constans.js"
class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _request(url, options) {
    return fetch(url, options).then(this._checkResponse)
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
  }

  getInitialCards() {
    return this._request(this._baseUrl + '/cards', {
      credentials: 'include',
      headers: this._headers
    })
  }

  getUserInfo() {
    return this._request(this._baseUrl + '/users/me', {
      credentials: 'include',
      headers: this._headers
    })
  }

  setUserInfo({name, about}) {
    return this._request(this._baseUrl + '/users/me', {
      method: 'PATCH',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
  }

  postNewCard({name, link}) {
    return this._request(this._baseUrl + '/cards', {
      method: 'POST',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
  }

  changeLikeCardStatus(idCard, checkLike) {
    if (!checkLike) {
      return this._request(this._baseUrl + '/cards/' + idCard + '/likes', {
        method: 'PUT',
        credentials: 'include',
        headers: this._headers
      })
    } else {
      return this._request(this._baseUrl + '/cards/' + idCard + '/likes',  {
        method: 'DELETE',
        credentials: 'include',
        headers: this._headers
      })
    }
  }
  deleteCard(idCard) {
    return this._request(this._baseUrl + '/cards/' + idCard, {
      method: 'DELETE',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        _id: idCard
      })
    })
  }

  setAvatar({avatar}) {
    return this._request(this._baseUrl + '/users/me/avatar',  {
      method: 'PATCH',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatar
      })
    })
  }
}

const api = new Api(options)

export { api }