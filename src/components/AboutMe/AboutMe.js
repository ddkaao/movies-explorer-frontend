import React from "react";
import face from "../../images/face.jpg";
import './AboutMe.css'; 

export default function AboutMe() {
    return (
        <div className="aboutMe" id="student">
            <div className="aboutMe__content">
                <h2 className="aboutMe__title">Студент</h2>
                <div className="aboutMe__container">
                    <div className="aboutMe__text">
                        <h2 className="aboutMe__name">Дмитрий</h2>
                        <p className="aboutMe__age">Начинающий фронтенд-разработчик, 21 год</p>
                        <p className="aboutMe__description">Я родился в Казани и в 17 лет переехал в Москву для учёбы. В данный момент обучаюсь на 4 курсе университета НИТУ МИСиС на направлении, связанным с IT. Во время обучения меня заинтересовала сфера веб-разработки и друг посоветовал мне Яндекс Практикум для прохождения обучения. </p>
                        <a href="https://github.com/ddkaao" className="aboutMe__github">GitHub</a>
                    </div>
                    <img  src={face} alt="Студент" className="aboutMe__image"/>
                </div>
            </div>
        </div>
    )
}