import React from "react";
import './AboutProject.css'; 

export default function AboutProject() {
    return (
        <section className="aboutProject" id="project">
            <div className="aboutProject__content">
                <h2 className="aboutProject__title">О проекте</h2>
                <div className="aboutProject__container">
                    <div className="aboutProject__information">
                        <h2 className="aboutProject__subtitle">Дипломный проект включал 5 этапов</h2>
                        <p className="aboutProject__text">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
                    </div>
                    <div className="aboutProject__information">
                        <h2 className="aboutProject__subtitle">На выполнение диплома ушло 5 недель</h2>
                        <p className="aboutProject__text">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
                    </div>
                </div>
                <div className="aboutProject__timing">
                    <div className="aboutProject__backend">
                        <p className="aboutProject__deadline">1 неделя</p>
                        <p className="aboutProject__caption">Back-end</p>
                    </div>
                    <div className="aboutProject__frontend">
                        <p className="aboutProject__deadline aboutProject__deadline_dark">4 недели</p>
                        <p className="aboutProject__caption aboutProject__caption_dark">Front-end</p>
                    </div>
                </div>
            </div>
        </section>
    )
}