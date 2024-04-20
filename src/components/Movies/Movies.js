import React from "react";
import moviesApi from "../../utils/MoviesApi";
import mainApi from "../../utils/MainApi";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";
import { useLocation } from 'react-router-dom';
import "./Movies.css";

export default function Movies({ loggedIn, moviesSaved, setMoviesSaved }) {

    const [movies, setMovies] = React.useState([]);
    const [moviesNumber, setMoviesNumber] = React.useState('');
    const [moviesReceived, setMoviesReceived] = React.useState([]);
    const splice = moviesReceived.slice(0, moviesNumber);
    const [moviesInputSearch, setmoviesInputSearch] = React.useState("");
    const [moviesFilter, setMoviesFilter] = React.useState(false);
    const [onSearchErr, setOnSearchErr] = React.useState("");
    const [preloader, setPreloader] = React.useState(false);
    const [searched, setSearched] = React.useState(true);
    const { pathname } = useLocation();
    
    const getMoviesNumber = () => {
        const cards = { 
            start: 12, 
            step: 3
        }
        if (window.innerWidth < 1280) {
            cards.start = 8
            cards.step = 2
        }
        if ((window.innerWidth < 700) || (window.innerWidth < 600)) {
            cards.start = 5
            cards.step = 2
        }
        return cards;
    };

    React.useEffect(() => {
        if (pathname === '/movies') {
            setMoviesNumber(getMoviesNumber().start);
            const showInitialNumber = () => {
                if (window.innerWidth >= 3) {
                    setMoviesNumber(getMoviesNumber().start);
                } else if (window.innerWidth < 3 && window.innerWidth >= 2) {
                    setMoviesNumber(getMoviesNumber().start);
                } else if (window.innerWidth < 2) {
                    setMoviesNumber(getMoviesNumber().start);
                }
            }
            window.addEventListener('resize', showInitialNumber);
            return () => window.removeEventListener('resize', showInitialNumber);
          }
    }, [pathname, moviesReceived]);
    
    function handleButtonMore() {
        setMoviesNumber(moviesNumber + getMoviesNumber().step);
    };

    const searchMovies = React.useCallback((inputSearch, moviesFilter, movies) => {
        setmoviesInputSearch(inputSearch);
        localStorage.setItem('moviesInputSearch', JSON.stringify(inputSearch));
        localStorage.setItem('allMovies', JSON.stringify(movies));
        localStorage.setItem('moviesFilter', JSON.stringify(moviesFilter));
        setMoviesReceived(movies.filter((movie) => {
            const filterData = movie.nameRU.toLowerCase().includes(inputSearch.toLowerCase())
            if (moviesFilter) {
                if (filterData && movie.duration <= 40) {
                    return true;
                } else {
                    return false;
                }
            } else {
                return filterData;
            }
        }))
        setSearched(false);
    }, []);

    function getMovies(inputSearch) {
        if (!inputSearch) {
            setOnSearchErr('Нужно ввести ключевое слово');
            return false;
        }
        setOnSearchErr("");
        if (movies.length === 0) {
            setPreloader(true);
            moviesApi.getMovies()
                .then((res) => {
                    setMovies(res);
                    setMoviesFilter(false);
                    searchMovies(inputSearch, moviesFilter, res);
                })
                .catch ((e) => {
                    console.log(e);
                    setOnSearchErr('Во время запроса произошла ошибка.');
                })
                .finally(() => {
                    setPreloader(false);
                })
        } else {
            searchMovies(inputSearch, moviesFilter, movies);
        }
    };

    function saveMovie(movie) {
        const movieObject = {
        image: 'https://api.nomoreparties.co' + movie.image.url,
        trailerLink: movie.trailerLink,
        thumbnail: 'https://api.nomoreparties.co' + movie.image.url,
        movieId: movie.id,
        country: movie.country || 'Неизвестно',
        director: movie.director,
        duration: movie.duration,
        year: movie.year,
        description: movie.description,
        nameRU: movie.nameRU,
        nameEN: movie.nameEN,
        };
        const saved = moviesSaved.some(film => movie.id === film.movieId);
        const found = moviesSaved.find(savedMovie => movie.id === savedMovie.movieId);
        if (!saved){
            mainApi.saveMovie(movieObject)
                .then((res) => {
                    setMoviesSaved([res, ...moviesSaved]);
                })  
                .catch((e) => {
                    console.log(e);
                });
        } else {
            mainApi.deleteMovie(found._id)
            .then(() => {
                setMoviesSaved(moviesSaved.filter((film) => {
                    return film._id !== found._id
                }))
            })
            .catch ((e) => {
                console.log(e);
            });
        }
    };

    React.useEffect(() => {
        if (localStorage.moviesFilter && localStorage.moviesInputSearch && localStorage.allMovies) {
            const localStorageMovies = JSON.parse(localStorage.allMovies);
            const localStorageInput = JSON.parse(localStorage.moviesInputSearch);
            const localStorageFilter = JSON.parse(localStorage.moviesFilter);
            setmoviesInputSearch(localStorageInput);
            setMoviesFilter(localStorageFilter);
            setMovies(localStorageMovies);
            searchMovies(localStorageInput, localStorageFilter, localStorageMovies);
        }
    }, [searchMovies]);

    return (
        <>
            <Header loggedIn={loggedIn} />
            <main className="movies">
                <SearchForm  
                    moviesInputSearch={moviesInputSearch} 
                    getMovies={getMovies} 
                    searchMovies={searchMovies}
                    moviesFilter={moviesFilter}
                    setMoviesFilter={setMoviesFilter}
                    movies={movies}
                    moviesSaved={moviesSaved}
                />
                <span className="movies__error">{onSearchErr}</span>
                {preloader ? (
                    <Preloader />
                ) : (
                    <MoviesCardList 
                        moviesReceived={moviesReceived} 
                        handleButtonMore={handleButtonMore} 
                        saveMovie={saveMovie} 
                        moviesSaved={moviesSaved}  
                        searched={searched}
                        splice={splice}
                        moviesNumber={moviesNumber}
                    />
                )
            }
            </main>
            <Footer />
        </>
    )
}