import React from "react";
import "./SearchForm.css";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import search_icon from "../../images/search_btn.svg";

export default function SearchForm({ moviesInputSearch, getMovies, moviesFilter, getMoviesFilter }) {

    const [formSearch, setFormSearch] = React.useState('');
    const [filter, setFilter] = React.useState(false);

    function handleInputChange(evt) {
        setFormSearch(evt.target.value);
    }

    function handleSubmit(evt) {
        evt.preventDefault();
        getMovies(formSearch);
    }

    function handleFilterChange() {
        const newFilter = !filter;
        setFilter(newFilter);
        getMoviesFilter(newFilter);
    }

    React.useEffect(() => {
        setFormSearch(moviesInputSearch);
        setFilter(moviesFilter);
    }, [moviesInputSearch, moviesFilter]);

    return (
        <section className="search">
            <div className="search__container">
                <form className="search__form" onSubmit={handleSubmit} noValidate>
                    <input className="search__input" type="text" placeholder="Фильм" minLength="1" maxLength="32" value={formSearch} onChange={handleInputChange} required />
                    <button type="submit" className="search__btn-submit">
                        <img src={search_icon} alt="Ввод" />
                    </button>
                </form>
                <FilterCheckbox filter={filter} handleFilterChange={handleFilterChange} />
                <div className="search__line"></div>
            </div>
        </section>
    )
}