import React from "react";
import moviesApi from "../../utils/MoviesApi";
import mainApi from "../../utils/MainApi";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";
import "./Movies.css";

export default function Movies({ loggedIn, isLoading, setIsLoading }) {

    const [movies, setMovies] = React.useState([]);
    const [moviesNumber, setMoviesNumber] = React.useState([]);
    const [moviesReceived, setMoviesReceived] = React.useState([]);
    const [moviesInputSearch, setmoviesInputSearch] = React.useState("");
    const [moviesFilter, setMoviesFilter] = React.useState(false);
    const [moviesWithFilter, setMoviesWithFilter] = React.useState([]);
    const [moviesReceivedWithFilter, setMoviesReceivedWithFilter] = React.useState([]);
    const [moviesSaved, setMoviesSaved] = React.useState([]);
    const [onSearchErr, setOnSearchErr] = React.useState("");

    React.useEffect(() => {
        setMoviesNumber(getMoviesNumber());
        const handlerResize = () => setMoviesNumber(getMoviesNumber());
        window.addEventListener('resize', handlerResize);
        return () => { window.removeEventListener('resize', handlerResize) };
    }, []);
    
    function getMoviesNumber() {
        let cards;
        const width = document.documentElement.clientWidth;
        const MoviesCountConfig = {
            '1280': [12, 3],
            '700': [8, 2],
            '600': [5, 1],
            '300': [5, 1]
        };
        Object.keys(MoviesCountConfig).sort((a, b) => a - b).forEach((key) => {
            if (width > +key) {
                cards = MoviesCountConfig[key];
            }
        });
    return cards;
    };
    
    function handleButtonMore() {
        const spliceFilms = movies;
        const newFilms = moviesReceived.concat(spliceFilms.splice(0, moviesNumber[1]));
        setMoviesReceived(newFilms);
        setMovies(spliceFilms);
    };

    function getMovies(inputSearch) {
        setMoviesFilter(false);
        localStorage.setItem('moviesFilter', false);
        if (!inputSearch) {
            setOnSearchErr('Нужно ввести ключевое слово');
            return false;
        }
        setIsLoading(true);
        setOnSearchErr('');
        moviesApi.getMovies()
            .then((res) => {
                let filterRes = res.filter(({ nameRU }) => nameRU.toLowerCase().includes(inputSearch.toLowerCase()));
                localStorage.setItem('movies', JSON.stringify(filterRes));
                localStorage.setItem('moviesInputSearch', inputSearch);
                const spliceData = filterRes.splice(0, moviesNumber[0]);
                setMoviesReceived(spliceData);
                setMovies(filterRes);
                setMoviesReceivedWithFilter(spliceData);
                setMoviesWithFilter(filterRes);
            })
            .catch ((e) => {
                console.log(e);
                setOnSearchErr('Во время запроса произошла ошибка.');
            })
            .finally(() => {
                setIsLoading(false);
            })
    };

    async function getMoviesFilter(filter) {
        let filterMoviesReceived = [];
        let filterMovies = [];
    
        if (filter) {
          setMoviesReceivedWithFilter(moviesReceived);
          setMoviesWithFilter(movies);
          filterMoviesReceived = moviesReceived.filter(({ duration }) => duration <= 40);
          filterMovies = movies.filter(({ duration }) => duration <= 40);
        } else {
          filterMoviesReceived = moviesReceivedWithFilter;
          filterMovies = moviesWithFilter;
        }
        localStorage.setItem('movies', JSON.stringify(filterMoviesReceived.concat(filterMovies)));
        localStorage.setItem('moviesFilter', filter);
        setMoviesReceived(filterMoviesReceived.concat(filterMovies));
        setMovies(filterMovies);
    }

    function saveMovieToggle(movie, save) {
        if (save) {
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
            mainApi.saveMovie(movieObject)
                .then((res) => {
                    setMoviesSaved([res, ...moviesSaved]);
                })  
                .catch((e) => {
                    console.log(e);
                });
        }   else {
                mainApi.deleteMovie(movie._id)
                    .then(() => {
                        mainApi.getMovies((res) => {
                            console.log(res);
                            setMoviesSaved(res);
                        })
                    })
                    .catch ((e) => {
                        console.log(e);
                    });
        }
    }

    React.useEffect(() => {
        mainApi.getMovies()
          .then((res) => {
            setMoviesSaved(res);
          })
          .catch((e) => {
            console.log(e);
          });
    
        const localStorageFilms = localStorage.getItem('movies');
        const localStorageInput = localStorage.getItem('moviesInputSearch');
        const localStorageFilter = localStorage.getItem('moviesFilter');

        if (localStorageFilter) {
            setMoviesFilter(localStorageFilter === 'true');
        }

        if (localStorageInput) {
            setmoviesInputSearch(localStorageInput);
          }
    
        if (localStorageFilms) {
          const filterData = JSON.parse(localStorageFilms);
          setMoviesReceived(filterData.splice(0, getMoviesNumber()[0]));
          setMovies(filterData);
        }
    }, [loggedIn]);

    return (
        <>
            <Header loggedIn={loggedIn} />
            <main className="movies">
                <SearchForm  moviesInputSearch={moviesInputSearch} getMovies={getMovies} moviesFilter={moviesFilter} getMoviesFilter={getMoviesFilter}/>
                <span className="movies__error">{onSearchErr}</span>
                {isLoading ? (
                    <Preloader />
                ) : (
                    <MoviesCardList movies={movies}  moviesReceived={moviesReceived} handleButtonMore={handleButtonMore} saveMovieToggle={saveMovieToggle} moviesSaved={moviesSaved} />
                )
            }
            </main>
            <Footer />
        </>
    )
}