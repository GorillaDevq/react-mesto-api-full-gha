const baseUrl = 'https://auth.nomoreparties.co'
export default class Auth {
  constructor(baseUrl) {
    this._baseUrl = baseUrl
  }

  singUp({email, password}) {
    return fetch(this._baseUrl + '/signup', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json" 
      },
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
      headers: {
        "Content-Type": "application/json" 
      },
      body: JSON.stringify({
        email: email,
        password: password,
      })
    })
    .then(res => this._checkResponse(res))
  }

  checkToken(jwt) {
    return fetch(this._baseUrl + '/users/me', {
      headers: {
        "Content-Type": "application/json",
        "Authorization" : `Bearer ${jwt}`
      }
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

const auth = new Auth(baseUrl)

export { auth }