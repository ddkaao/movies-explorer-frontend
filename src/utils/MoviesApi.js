class MoviesApi {
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

    getMovies() {
        return fetch(`${this._url}/beatfilm-movies`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
        })
        .then(this._getResponse)
    }

}

const moviesApi = new MoviesApi({
    url: 'https://api.nomoreparties.co',
});

export default moviesApi;