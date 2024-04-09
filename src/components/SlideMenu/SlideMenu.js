import React from "react";
import { Link } from "react-router-dom";
import account from "../../images/account.svg";
import cross from "../../images/cross.svg";
import './SlideMenu.css'; 

export default function SlideMenu({ isOpen, onClose }) {
    return (
        <section className={`slideMenu ${isOpen ? 'slideMenu-opened' : ''}`}>
            <div className="slideMenu__container">
                <div className="slideMenu__links">
                    <Link className="slideMenu__link" to="/">Главная</Link>
                    <Link className="slideMenu__link" to="/movies">Фильмы</Link>
                    <Link className="slideMenu__link" to="/saved-movies">Сохранённые фильмы</Link>
                </div>
                <Link className="slideMenu__account" to="/profile">
                    <img src={account} className="navigation__button" alt="Аккаунт" />
                </Link>
            </div>
            <button type="button" className="slideMenu__close" onClick={onClose}>
                    <img src={cross}  alt="Закрыть" className="slideMenu__close-icon" />
            </button>
        </section>
    )
}