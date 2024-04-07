import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import "./Movies.css";

export default function Movies({ isLogged }) {
    return (
        <>
            <Header loggedIn={isLogged} />
            <main className="movies">
                <SearchForm />
                <MoviesCardList />
            </main>
            <Footer />
        </>
    )
}