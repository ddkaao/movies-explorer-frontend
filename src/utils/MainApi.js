class MainApi {
    constructor({url}) {
        this._url = url;
    }

    _getResponse(response) {
        if(response.ok){
            return response.json();
        } else {
            return Promise.reject(`Ошибка: ${response.status}`);
        }
    }

    register(name, email, password) {
        return fetch(`${this._url}/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({name, email, password}),
        })
        .then(this._getResponse);
    }

    login(email, password) {
        return fetch(`${this._url}/signin`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({email, password}),
        })
        .then(this._getResponse);
    }

    getToken(token) {
        return fetch(`${this._url}/users/me`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization" : `Bearer ${token}`
            }
        })
        .then(this._getResponse);
    }

    getProfileInformation() {
        const token = localStorage.getItem('jwt');
        return fetch(`${this._url}/users/me`, {
            headers: {
                authorization: `Bearer ${token}`,
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        })
        .then(this._getResponse)
    }

    getMovies() {
        const token = localStorage.getItem('jwt');
        return fetch(`${this._url}/movies`, {
            headers: {
                authorization: `Bearer ${token}`,
                Accept: "application/json",
                "Content-Type": "application/json"
            },
        })
        .then(this._getResponse)
    }

    changeProfileInformation({name, email}) {
        const token = localStorage.getItem('jwt');
        return fetch(`${this._url}/users/me`, {
            method: 'PATCH',
            headers: {
                authorization: `Bearer ${token}`,
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({name, email}),
        })
        .then(this._getResponse)
    }

    saveMovie(movie) {
        const token = localStorage.getItem('jwt');
        return fetch(`${this._url}/movies`, {
            method: 'POST',
            headers: {
                authorization: `Bearer ${token}`,
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(movie),
        })
        .then(this._getResponse)
    }

    deleteMovie(id) {
        const token = localStorage.getItem('jwt');
        return fetch(`${this._url}/movies/${id}`, {
            method: 'DELETE',
            headers: {
                authorization: `Bearer ${token}`,
                Accept: "application/json",
                "Content-Type": "application/json"
            },
        })
        .then(this._getResponse)
    }

}

const mainApi = new MainApi({
    url: 'https://api.ddkaao.movies.nomoredomainswork.ru',
});

export default mainApi;