export default class Api {
  constructor({baseUrl, token, groupId}) {
    this._token = token;
    this._cohort = groupId;
    this._baseUrl = baseUrl + this._cohort;
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards `, {
      headers: {
        authorization: this._token
      }
    });
  }

  getProfileInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        authorization: this._token
      }
    });
  }

  updateProfile({usrName, usrStatus}) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: usrName,
        about: usrStatus
      })
    });
  }

  updateAvatar(url) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: url
      })
    });
  }

  publishCard({name, link}) {
    return fetch(`${this._baseUrl}/cards `, {
      method: "POST",
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        link: link
      })
    });
  }

  deleteCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: "DELETE",
      headers: {
        authorization: this._token
      }
    })
  }

  addLike(id) {
    return fetch(`${this._baseUrl}/cards/likes/${id}`, {
      method: "PUT",
      headers: {
        authorization: this._token
      }
    })
  }

  rmLike(id) {
    return fetch(`${this._baseUrl}/cards/likes/${id}`, {
      method: "DELETE",
      headers: {
        authorization: this._token
      }
    })
  }
}
