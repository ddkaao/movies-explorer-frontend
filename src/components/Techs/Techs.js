import React from "react";
import './Techs.css'; 

export default function Techs() {
    return (
        <div className="techs" id="techs">
            <div className="techs__content">
            <h2 className="techs__title">Технологии</h2>
            <div className="techs__container">
                <h2 className="techs__number">7 технологий</h2>
                <p className="techs__subtitle">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
                <div className="techs__list">
                    <p className="techs__item">HTML</p>
                    <p className="techs__item">CSS</p>
                    <p className="techs__item">JS</p>
                    <p className="techs__item">React</p>
                    <p className="techs__item">Git</p>
                    <p className="techs__item">Express.js</p>
                    <p className="techs__item">mongoDB</p>
                </div>
            </div>
            </div>
        </div>
    )
}