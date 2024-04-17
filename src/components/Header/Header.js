import React from "react";
import logo from '../../images/logo.svg';
import { Link } from "react-router-dom";
import Navigation from "../Navigation/Navigation";
import './Header.css'; 

export default function Header({ isLogged }) {
    return (
        <header className="header">
            <div className="header__container">
                <Link to="/">
                    <img src={logo} alt="Логотип" className="header__logo" />
                </Link>
                { isLogged ? (
                    <div className="header__menu">
                        <Link className="header__link" to="/signup">Регистрация</Link> 
                        <Link className="header__link header__link-green" to="signin">Войти</Link>
                    </div>
                ):
                (
                    <Navigation />
                )}
            </div>
        </header>
    )
}