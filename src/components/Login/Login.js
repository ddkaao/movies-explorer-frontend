import React from "react";
import { Link } from "react-router-dom";
import logo from '../../images/logo.svg';
import './Login.css'; 

export default function Login() {
    return (
        <section className="login">
            <div className="login__container">
                <form className="login__form">
                    <img src={logo} alt="Логотип" className="login__logo" />
                    <h2 className="login__title">Рады видеть!</h2>
                    <fieldset className="login__inputs">
                        <div className="login__field">
                            <p className="login__label">E-mail</p>
                            <input className="login__input" type="email" required />
                            <span className="login__error"></span>
                        </div>
                        <div className="login__field">
                            <p className="login__label">Пароль</p>
                            <input className="login__input" type="password" minLength="8" maxLength="32" required />
                            <span className="login__error"></span>
                        </div>
                    </fieldset>
                    <button type="submit" className="login__btn">Войти</button>
                    <p className="register__caption">Ещё не зарегистрированы? <Link className="login__link" to="/signup">Регистрация</Link></p>
                </form>
            </div>
        </section>
    )
}