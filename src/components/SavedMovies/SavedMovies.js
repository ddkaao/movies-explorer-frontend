import React from "react";
import mainApi from "../../utils/MainApi";
import Preloader from "../Preloader/Preloader";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import "./SavedMovies.css";

export default function SavedMovies({ loggedIn, isLoading, setIsLoading }) {

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
        setOnSearchErr('');
        setIsLoading(true);
        try {
          const data = movies;
          let filterData = data.filter(({ nameRU }) => nameRU.toLowerCase().includes(inputSearch.toLowerCase()));
          if (filter) {
            filterData = filterData.filter(({ duration }) => duration <= 40);
          }
          setMoviesReceived(filterData);
    
          if (inputSearch) {
            localStorage.setItem('savedMovies', JSON.stringify(filterData));
            localStorage.setItem('savedMoviesFilter', filter);
            localStorage.setItem('savedMoviesInputSearch', inputSearch);
          } else {
            localStorage.removeItem('savedMovies');
            localStorage.removeItem('savedMoviesFilter');
            localStorage.removeItem('savedMoviesInputSearch');
          }
        } catch (err) {
            setOnSearchErr('Во время запроса произошла ошибка.');
            setMovies([]);
        } finally {
          setIsLoading(false);
        }
    }

    async function getMoviesFilter(filter) {
        let filterMovies = [];   
        if (filter) {
            const data = movies;
            filterMovies = data.filter(({ duration }) => duration <= 40);
        }
        localStorage.setItem('savedMoviesFilter', filter);
        setMoviesReceived(filterMovies);
    }

    function saveMovieToggle(movie, saved) {
        if (!saved) {
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
    }

    React.useEffect(() => {
        const localStorageFilms = localStorage.getItem('savedMovies');
        if (localStorageFilms) {
          setMovies(JSON.parse(localStorageFilms));
          const localStorageFilmsTumbler = localStorage.getItem('savedMoviesFilter');
          const localStorageFilmsInputSearch = localStorage.getItem('savedMoviesInputSearch');
    
          if (localStorageFilmsTumbler) {
            setMoviesFilter(localStorageFilmsTumbler === 'true');
          }
          if (localStorageFilmsInputSearch) {
            setMoviesInputSearch(localStorageFilmsInputSearch);
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
                {isLoading ? (
                    <Preloader />
                ) : (
                    <MoviesCardList moviesReceived={moviesReceived} saveMovieToggle={saveMovieToggle} movies={[]} />
                )}
            </main>
            <Footer />
        </>
    )
}