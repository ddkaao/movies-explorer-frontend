import React from "react";
import { useLocation } from 'react-router-dom';
import MoviesCard from "../MoviesCard/MoviesCard";
import "./MoviesCardList.css";

export default function MoviesCardList({ moviesReceived, handleButtonMore, saveMovie, deleteMovie, moviesSaved, searched, splice, moviesNumber }) {

    const { pathname } = useLocation();

    return (
        <section className="moviesCardList">
            <div className="moviesCardList__list">
            {(splice.length !== 0 && pathname === "/movies") ?
                    splice.map((movieRecieved) => {
                        return (
                            <MoviesCard key={movieRecieved.id}  movieRecieved={movieRecieved} saveMovie={saveMovie}  moviesSaved={moviesSaved} />
                        )
                    }) : moviesReceived.length !== 0 ?
                            moviesReceived.map((movieRecieved) => {
                                return (
                                    <MoviesCard key={movieRecieved.movieId} movieRecieved={movieRecieved} deleteMovie={deleteMovie} />
                                )
                            })
                : !searched ? (
                    <p className="moviesCardList__error">Ничего не найдено</p>
                ) : (
                    <p className="moviesCardList__error">Фильмов ещё нет</p>
                )
            }
            </div>
            {pathname !== "/saved-movies" && moviesNumber <= moviesReceived.length ? (
                <div className="moviesCardList__btns">
                    <button className="moviesCardList__button" type="button" onClick={handleButtonMore}>Ещё</button>
                </div>
            ) : (
                <> </>
            )}
        </section>
    )
}