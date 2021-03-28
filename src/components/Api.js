import data from "../utils/constants";

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
    })
    .then(res => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(res.status);
    });
  }

  getProfileInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        authorization: this._token
      }
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }

      return new Promise.reject(res.status);
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
    })
    .then(res => {
      if (res.ok) {
        profile.setUserInfo(curInfo);
        return;
      }
      return new Promise.reject(res.status);
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
    })
    .then(res => {
      if (res.ok) {
        data.avatarImg.src = formValues["avatar-url"];
        return;
      }

      return new Promise.reject(res.status);
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
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }

      return new Promise.reject(res.status);
    });
  }

  deleteCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: "DELETE",
      headers: {
        authorization: this._token
      }
    })
    .then(res => {
      if (res.ok) {
        return;
      }

      return new Promise.reject(res.status);
    });
  }

  addLike(id) {
    return fetch(`${this._baseUrl}/cards/likes/${id}`, {
      method: "PUT",
      headers: {
        authorization: this._token
      }
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }

      return new Promise.reject(res.status);
    });
  }

  rmLike(id) {
    return fetch(`${this._baseUrl}/cards/likes/${id}`, {
      method: "DELETE",
      headers: {
        authorization: this._token
      }
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }

      return new Promise.reject(res.status);
    });
  }
}
