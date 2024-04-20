import React from "react";
import "./SearchForm.css";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import search_icon from "../../images/search_btn.svg";
import { useLocation } from 'react-router-dom';

export default function SearchForm({ moviesInputSearch, getMovies, searchMovies,  moviesFilter, setMoviesFilter, movies, moviesSaved }) {

    const [formSearch, setFormSearch] = React.useState('');
    const { pathname } = useLocation();

    function handleInputChange(evt) {
        setFormSearch(evt.target.value);
    }

    function handleSubmit(evt) {
        evt.preventDefault();
        getMovies(formSearch);
    }

    function handleFilterChange() {
        if (moviesFilter) {
            setMoviesFilter(false)
            searchMovies(moviesInputSearch, false, movies)
        } else {
            setMoviesFilter(true)
            searchMovies(moviesInputSearch, true, movies)
        }
    }

    React.useEffect(() => {
        setFormSearch(moviesInputSearch);
      }, [moviesInputSearch, setFormSearch, pathname, moviesSaved])

    return (
        <section className="search">
            <div className="search__container">
                <form className="search__form" onSubmit={handleSubmit} noValidate>
                    <input className="search__input" type="text" placeholder="Фильм" minLength="1" maxLength="32" value={formSearch} onChange={handleInputChange} required />
                    <button type="submit" className="search__btn-submit">
                        <img src={search_icon} alt="Ввод" />
                    </button>
                </form>
                <FilterCheckbox moviesFilter={moviesFilter} handleFilterChange={handleFilterChange} />
                <div className="search__line"></div>
            </div>
        </section>
    )
}