import React from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import "./MoviesCardList.css";

export default function MoviesCardList() {
    return (
        <section className="moviesCardList">
            <div className="moviesCardList__list">
                <MoviesCard />
                <MoviesCard />
                <MoviesCard />
                <MoviesCard />
                <MoviesCard />
                <MoviesCard />
            </div>
            <p className="moviesCardList__error">Ничего не найдено</p>
            <div className="moviesCardList__btns">
                <button className="moviesCardList__button" type="button">Ещё</button>
            </div>
        </section>
    )
}