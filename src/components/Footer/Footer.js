import React from "react";
import './Footer.css'; 

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer__container">
                <h2 className="footer__caption">Учебный проект Яндекс.Практикум х BeatFilm.</h2>
                <div className="footer__content">
                    <p className="footer__copyright">© 2020</p>
                    <div className="footer__links">
                        <a href="https://practicum.yandex.ru/" className="footer__link" rel="noreferrer" target="_blank">Яндекс.Практикум</a>
                        <a href="https://github.com/ddkaao" className="footer__link" rel="noreferrer" target="_blank">GitHub</a>
                    </div>
                </div>
            </div>
        </footer>
    )
}