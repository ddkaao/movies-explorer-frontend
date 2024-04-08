import React, { useState } from "react";
import poster from "../../images/poster.svg";
import { useLocation } from 'react-router-dom';
import "./MoviesCard.css";

export default function MoviesCard() {

    const { pathname } = useLocation();
    const [ saved, setSaved ] = useState(false);

    function handleSaved() {
        setSaved(true);
    }

    return (
        <section className="moviesCard">
            <div className="moviesCard__container">
                <div className="moviesCard__content">
                    <a className="moviesCard__link" href="/">
                        <img className="moviesCard__image" src={poster} alt="Постер" />
                    </a>
                    <div className="moviesCard__tooltip"></div>
                </div>
                <div className="moviesCard__caption">
                    <p className="moviesCard__title">По волнам: Искусство звука в кино</p>
                    <p className="moviesCard__duration">1 ч 17 м</p>
                </div>
            </div>
            {pathname === '/saved-movies' ? (
                <button type="button" className="moviesCard__btn moviesCard__btn-delete"></button>
            ) : (
                <button type="button" className={`moviesCard__btn ${saved ? "moviesCard__btn-saved" : "moviesCard__btn-save"}`} onClick={handleSaved}></button>
            )}
        </section>
    )
}