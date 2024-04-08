import React from "react";
import "./SearchForm.css";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import search_icon from "../../images/search_btn.svg";

export default function SearchForm() {
    return (
        <section className="search">
            <div className="search__container">
                <form className="search__form">
                    <input className="search__input" type="text" placeholder="Фильм" minLength="1" maxLength="32" required />
                    <button type="submit" className="search__btn-submit">
                        <img src={search_icon} alt="Ввод" />
                    </button>
                </form>
                <FilterCheckbox />
                <div className="search__line"></div>
            </div>
        </section>
    )
}