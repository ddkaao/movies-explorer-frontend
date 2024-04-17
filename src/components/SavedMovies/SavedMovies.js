import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import "./SavedMovies.css";

export default function SavedMovies({ isLogged }) {
    return (
        <>
            <Header loggedIn={isLogged} />
            <main className="savedMovies">
                <SearchForm />
                <MoviesCardList />
            </main>
            <Footer />
        </>
    )
}