import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Promo from "../Promo/Promo";
import AboutProject from "../AboutProject/AboutProject";
import Techs from "../Techs/Techs";
import AboutMe from "../AboutMe/AboutMe";
import Portfolio from "../Portfolio/Portfolio";
import "./Main.css";

export default function Main({ isLogged }) {
    return (
        <>
            <Header loggedIn={isLogged} />
            <main className="main">
                <Promo />
                <AboutProject />
                <Techs />
                <AboutMe /> 
                <Portfolio />
            </main>
            <Footer />
        </>
    )
}