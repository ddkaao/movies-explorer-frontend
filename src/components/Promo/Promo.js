import React from "react";
import './Promo.css'; 

export default function Promo() {
    return (
        <section className="promo">
            <div className="promo__container">
                <h1 className="promo__title">Учебный проект студента факультета Веб-разработки.</h1>
                <div className="promo__navTab">
                    <a href="#project" className="promo__link">О проекте</a>
                    <a href="#techs" className="promo__link">Технологии</a>
                    <a href="#student" className="promo__link">Студент</a>
                </div>
            </div>
        </section>
    )
}