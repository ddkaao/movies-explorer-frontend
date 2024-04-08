import React from "react";
import { Link } from "react-router-dom";
import cross from "../../images/cross.svg";
import './SlideMenu.css'; 

export default function SlideMenu({ isOpen, onClose }) {
    return (
        <section className={`slideMenu ${isOpen ? 'slideMenu-opened' : ''}`}>
            <div className="slideMenu__container">
                <div className="slideMenu__links">
                    <Link className="slideMenu__link" to="/">Главная</Link>
                    <Link className="slideMenu__link" to="/">Фильмы</Link>
                    <Link className="slideMenu__link" to="/">Сохранённые фильмы</Link>
                </div>
                <Link className="slideMenu__account">
                    <button type="button" className="slideMenu__button">Аккаунт</button>
                </Link>
            </div>
            <button type="button" className="slideMenu__close" onClick={onClose}>
                    <img src={cross}  alt="Закрыть" className="slideMenu__close-icon" />
            </button>
        </section>
    )
}