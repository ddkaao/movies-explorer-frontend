import React from "react";
import { Link } from "react-router-dom";
import './PageNotFound.css'; 

export default function PageNotFound() {
    return (
        <div className="pageNotFound">
            <div className="pageNotFound__container">
                <div className="pageNotFound__content">
                    <h2 className="pageNotFound__title">404</h2>
                    <p className="pageNotFound__caption">Страница не найдена</p>
                </div>
                <Link className="pageNotFound__link" to={-1}>Назад</Link>
            </div>
        </div>
    )
}