import React from "react";
import arrow from "../../images/arrow.svg";
import './Portfolio.css'; 

export default function Portfolio() {
    return (
        <div className="portfolio">
            <div className="portfolio__container">
                <h2 className="portfolio__title">Портфолио</h2>
                <ul className="portfolio__list">
                    <li className="portfolio__link">
                        <a href="https://github.com/ddkaao/how-to-learn" className="portfolio__item">
                            <h2 className="portfolio__name">Статичный сайт</h2>
                            <img src={arrow}  alt="Стрелка" className="portfolio__arrow"/>
                        </a>
                    </li>
                    <li className="portfolio__link">
                        <a href="https://github.com/ddkaao/russian-travel" className="portfolio__item">
                            <h2 className="portfolio__name">Адаптивный сайт</h2>
                            <img src={arrow}  alt="Стрелка" className="portfolio__arrow"/>
                        </a>
                    </li>
                    <li className="portfolio__link">
                        <a href="https://github.com/ddkaao/react-mesto-api-full-gha" className="portfolio__item">
                            <h2 className="portfolio__name">Одностраничное приложение</h2>
                            <img src={arrow}  alt="Стрелка" className="portfolio__arrow"/>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    )
}