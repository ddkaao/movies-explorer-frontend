import React from "react";
import Header from "../Header/Header";
import './Profile.css'; 

export default function Profile({ isLogged }) {
    return (
        <>
            <Header loggedIn={isLogged} />
            <section className="profile">
                <div className="profile__container">
                    <form className="profile__form">
                        <h2 className="profile__title">Привет, Дмитрий!</h2>
                        <fieldset className="profile__inputs">
                            <div className="profile__field">
                                <p className="profile__label profile__label-name">Имя</p>
                                <input className="profile__input profile__input-name" type="text" minLength="2" maxLength="32" defaultValue="Дмитрий" required />
                                <span className="profile__error"></span>
                            </div>
                            <div className="profile__field">
                                <p className="profile__label profile__label-mail">E-mail</p>
                                <input className="profile__input profile__input-mail" type="email" defaultValue="dmitry_wattt@mail.ru" required />
                                <span className="profile__error"></span>
                            </div>
                        </fieldset>
                        <div className="profile__buttons">
                            <button type="submit" className="profile__btn-edit">Редактировать</button>
                            <button type="button" className="profile__btn-exit">Выйти из аккаунта</button>
                        </div>
                    </form>
                </div>
            </section>
        </>
    )
}