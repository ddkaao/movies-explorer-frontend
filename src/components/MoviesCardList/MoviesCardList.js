import React from "react";
import { useLocation } from 'react-router-dom';
import MoviesCard from "../MoviesCard/MoviesCard";
import "./MoviesCardList.css";

export default function MoviesCardList({ movies, moviesReceived, handleButtonMore, saveMovie, deleteMovie, moviesSaved }) {

    const { pathname } = useLocation();

    return (
        <section className="moviesCardList">
            {moviesReceived.length > 0 ? (
                <div className="moviesCardList__list">
                    {moviesReceived.map((movieRecieved) => (
                        <MoviesCard key={movieRecieved.id || movieRecieved.movieId} movieRecieved={movieRecieved} saveMovie={saveMovie} deleteMovie={deleteMovie} moviesSaved={moviesSaved} />
                    ))}
                </div>
            ) : (
                <p className="moviesCardList__error">Ничего не найдено</p>
            )}
            {pathname !== "/saved-movies" && movies.length > 0 ? (
                <div className="moviesCardList__btns">
                    <button className="moviesCardList__button" type="button" onClick={handleButtonMore}>Ещё</button>
                </div>
            ) : (
                <> </>
            )}
        </section>
    )
}