import React, { useState } from "react";
import { useLocation } from 'react-router-dom';
import "./MoviesCard.css";

export default function MoviesCard({ movieRecieved, saveMovie, deleteMovie, moviesSaved }) {

    const { pathname } = useLocation();
    const [ saved, setSaved ] = useState(false);

    function getDuration(mins) {
        return `${Math.floor(mins / 60)}ч ${mins % 60}м`;
    }

    function handleSave() {
        const found = moviesSaved.some(savedMovie => movieRecieved.id === savedMovie.movieId);
        if (found) {
            setSaved(true);
            saveMovie(movieRecieved);
        } else {
            setSaved(false);
            saveMovie(movieRecieved);
        }
    }
    
    function handleUnsave() {
        deleteMovie(movieRecieved);
    }

    React.useEffect(() => {
        if (pathname !== '/saved-movies') {
            const savedMovie = moviesSaved.some(savedMovie => savedMovie.movieId === movieRecieved.id);

          if (savedMovie) {
            setSaved(true);
          } else {
            setSaved(false);
          }
        }
      }, [pathname, setSaved, moviesSaved, movieRecieved.id]);

    return (
        <section className="moviesCard">
            <div className="moviesCard__container">
                <div className="moviesCard__content">
                    <a className="moviesCard__link" href={movieRecieved.trailerLink} target="_blank"  rel="noreferrer">
                        <img className="moviesCard__image" src={pathname === '/saved-movies' ? `${movieRecieved.image}` : `https://api.nomoreparties.co${movieRecieved.image.url}`} alt={movieRecieved.nameRU} />
                    </a>
                </div>
                <div className="moviesCard__caption">
                    <p className="moviesCard__title">{movieRecieved.nameRU}</p>
                    <p className="moviesCard__duration">{getDuration(movieRecieved.duration)}</p>
                </div>
            </div>
            <div className="moviesCard__buttons">
                {pathname === '/saved-movies' ? (
                    <button type="button" className="moviesCard__btn moviesCard__btn-delete" onClick={handleUnsave}></button>
                ) : (
                    <button type="button" className={`moviesCard__btn ${saved ? "moviesCard__btn-saved" : "moviesCard__btn-save"}`} onClick={handleSave}></button>
                )}
            </div>
        </section>
    )
}