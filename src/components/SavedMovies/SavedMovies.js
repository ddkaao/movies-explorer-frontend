import React from "react";
import mainApi from "../../utils/MainApi";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import "./SavedMovies.css";

export default function SavedMovies({ loggedIn }) {

    const [movies, setMovies] = React.useState([]);
    const [moviesReceived, setMoviesReceived] = React.useState([]);
    const [moviesInputSearch, setMoviesInputSearch] = React.useState("");
    const [moviesFilter, setMoviesFilter] = React.useState(false);
    const [onSearchErr, setOnSearchErr] = React.useState("");

    async function getMovies(inputSearch, filter) {
        if (!inputSearch) {
            setOnSearchErr('Нужно ввести ключевое слово');
            return false;
        }
        setMoviesInputSearch(inputSearch);
        setOnSearchErr('');
        try {
          const filterState = localStorage.getItem('savedMoviesFilter');
          const data = movies;
          if (filterState) {
            let filterData = moviesReceived.filter(({ nameRU }) => nameRU.toLowerCase().includes(inputSearch.toLowerCase()));
            setMoviesReceived(filterData);
          } else {
            let filterData = data.filter(({ nameRU }) => nameRU.toLowerCase().includes(inputSearch.toLowerCase()));
            setMoviesReceived(filterData);
            if (inputSearch) {
              localStorage.setItem('savedMovies', JSON.stringify(filterData));
              localStorage.setItem('savedMoviesFilter', filter);
            } 
          }
        } catch (err) {
            setOnSearchErr('Во время запроса произошла ошибка.');
            setMovies([]);
        }
    }

    async function getMoviesFilter(filter) {
        let filterMovies = [];   
        if (filter) {
            const data = moviesReceived;
            filterMovies = data.filter(({ duration }) => duration <= 40);
        } else {
          filterMovies = movies;
        }
        localStorage.setItem('savedMoviesFilter', filter);
        setMoviesReceived(filterMovies);
    }

    function deleteMovie(movie) {
      mainApi.deleteMovie(movie._id)
          .then(() => {
              mainApi.getMovies()
                  .then((res) => {
                      setMoviesReceived(res);
                      setMovies(res);
                  })
          })
          .catch ((e) => {
              console.log(e);
          });
    }

    React.useEffect(() => {
      const localStorageFilms = localStorage.getItem('savedMovies');
      if (localStorageFilms) {
        setMovies(JSON.parse(localStorageFilms));
        const localStorageFilmsTumbler = localStorage.getItem('savedMoviesFilter');
  
        if (localStorageFilmsTumbler) {
          setMoviesFilter(localStorageFilmsTumbler === 'true');
        }
      } else {
          mainApi.getMovies()
            .then((res) => {
              setMovies(res);
              setMoviesReceived(res);
            })
            .catch ((e) => {
              console.log(e);
            })
      }
    }, [loggedIn]);

    return (
        <>
            <Header loggedIn={loggedIn} />
            <main className="savedMovies">
                <SearchForm getMovies={getMovies} getMoviesFilter={getMoviesFilter} moviesInputSearch={moviesInputSearch} moviesFilter={moviesFilter} />
                <span className="movies__error">{onSearchErr}</span>
                <MoviesCardList moviesReceived={moviesReceived} deleteMovie={deleteMovie} movies={[]} />
            </main>
            <Footer />
        </>
    )
}