import React from "react";
import { Link } from "react-router-dom";
import logo from '../../images/logo.svg';
import './Register.css'; 

export default function Register() {
    return (
        <div className="register">
            <div className="register__container">
                <form className="register__form">
                    <img src={logo} alt="Логотип" className="register__logo"></img>
                    <h2 className="register__title">Добро пожаловать!</h2>
                    <fieldset className="register__inputs">
                        <div className="register__field">
                            <p className="register__label">Имя</p>
                            <input className="register__input"></input>
                            <span className="register__error"></span>
                        </div>
                        <div className="register__field">
                            <p className="register__label">E-mail</p>
                            <input className="register__input"></input>
                            <span className="register__error"></span>
                        </div>
                        <div className="register__field">
                            <p className="register__label">Пароль</p>
                            <input className="register__input"></input>
                            <span className="register__error"></span>
                        </div>
                    </fieldset>
                    <button type="submit" className="register__btn">Зарегистрироваться</button>
                    <p className="register__caption">Уже зарегистрированы? <Link className="register__link" to="/signin">Войти</Link></p>
                </form>
            </div>
        </div>
    )
}