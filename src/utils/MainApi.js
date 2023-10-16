class MainApi {
  constructor(options) {
    this._baseUrl = options.baseUrl;
  }
  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }

  register(username, email, password) {
    return fetch(`${this._baseUrl}/signup`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      credentials: 'include',
      body: JSON.stringify({
        name: username,
        email: email,
        password: password
      })
    })
      .then(this._getResponseData)
}
  login(email, password) {
    return fetch(`${this._baseUrl}/signin`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      credentials: 'include',
      body: JSON.stringify({
        email: email,
        password: password
      })
    })
      .then(this._getResponseData)
      .then((data) => {
        if (data.token) {
          localStorage.setItem('jwt', data.token);
          return data;
        }
      })
}

  getUserInfo(token) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Authorization' : `Bearer ${token}`,
      },
    })
      .then(this._getResponseData);
  }

  getMovies(token) {
    return fetch(`${this._baseUrl}/movies`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Authorization' : `Bearer ${token}`,
      },
    })
      .then(this._getResponseData);
  }

  setUserInfo(username, email, token) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Authorization' : `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: username,
        email: email
      })
    })
      .then(this._getResponseData);
  }

  addMovie(data, token) {
    return fetch(`${this._baseUrl}/movies`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Authorization' : `Bearer ${token}`,
      },
      body: JSON.stringify({
        country: data.country,
        director: data.director,
        duration: data.duration,
        year: data.year,
        description: data.description,
        image: `https://api.nomoreparties.co${data.image.url}`,
        trailerLink: data.trailerLink,
        thumbnail: `https://api.nomoreparties.co${data.image.formats.thumbnail.url}`,
        owner: data.owner,
        movieId: data.id,
        nameRU: data.nameRU,
        nameEN: data.nameEN
      })
    })
      .then(this._getResponseData);
  }

  deleteMovie(movieId, token) {
    return fetch(`${this._baseUrl}/movies/${movieId}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Authorization' : `Bearer ${token}`,
      },
    })
      .then(this._getResponseData);
  }

  // changeLikeCardStatus(cardId, isLiked, token) {
  //   return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
  //     method: isLiked ? "PUT" : "DELETE",
  //     credentials: 'include',
  //     headers: {
  //       'Authorization' : `Bearer ${token}`,
  //     },
  //   })
  //     .then(this._getResponseData)
  // }
}

const mainApi = new MainApi({
  baseUrl: 'http://localhost:3000',
});

export default mainApi
