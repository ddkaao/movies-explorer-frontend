import React, { useCallback } from "react";
import mainApi from "../../utils/MainApi";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import "./SavedMovies.css";

export default function SavedMovies({ loggedIn, moviesSaved, setMoviesSaved }) {

    const splice = 12;
    const [moviesReceived, setMoviesReceived] = React.useState(moviesSaved);
    const [moviesInputSearch, setmoviesInputSearch] = React.useState("");
    const [moviesFilter, setMoviesFilter] = React.useState(false);
    const [onSearchErr, setOnSearchErr] = React.useState("");
    const [searched, setSearched] = React.useState(true);

    const searchMovies = useCallback((inputSearch, moviesFilter, movies) => {
      setmoviesInputSearch(inputSearch);
      setMoviesReceived(movies.filter((movie) => {
          const filterData = movie.nameRU.toLowerCase().includes(inputSearch.toLowerCase());
          if (moviesFilter) {
            if (filterData && movie.duration <= 40) {
                return true;
            } else {
                return false;
            }
        } else {
            return filterData;
        }
      }));
  }, []);

  function getMovies(inputSearch) {
    if (!inputSearch) {
        setOnSearchErr('Нужно ввести ключевое слово');
        return false;
    }
    setOnSearchErr("");
    setSearched(false);
    searchMovies(inputSearch, moviesFilter, moviesSaved);
  };

    function deleteMovie(movie) {
      mainApi.deleteMovie(movie._id)
          .then(() => {
              setMoviesSaved(moviesSaved.filter((film) => {
                return film._id !== movie._id
              }))
          })
          .catch ((e) => {
              console.log(e);
          });
    };

    React.useEffect(() => {
      searchMovies(moviesInputSearch, moviesFilter, moviesSaved);
    }, [searchMovies, moviesSaved, moviesFilter, moviesInputSearch]);

    return (
        <>
            <Header loggedIn={loggedIn} />
            <main className="savedMovies">
                <SearchForm 
                  getMovies={getMovies} 
                  searchMovies={searchMovies} 
                  movies={moviesSaved}
                  moviesInputSearch={moviesInputSearch} 
                  moviesFilter={moviesFilter}
                  moviesSaved={moviesSaved}
                  setMoviesFilter={setMoviesFilter}
                  searched={searched} 
                />
                <span className="movies__error">{onSearchErr}</span>
                <MoviesCardList moviesReceived={moviesReceived} deleteMovie={deleteMovie} searched={searched} splice={splice} />
            </main>
            <Footer />
        </>
    )
}