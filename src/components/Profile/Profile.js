import React from "react";
import Header from "../Header/Header";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import './Profile.css'; 

export default function Profile({ loggedIn, handleUpdateUser, onSignOut, onUpdateUserErr }) {

    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [nameErr, setNameErr] = React.useState('');
    const [emailErr, setEmailErr] = React.useState('');
    const [isDisabled, setIsDisabled] = React.useState(true);
    const formR = React.useRef();
    const currentUser = React.useContext(CurrentUserContext);

    function handleSubmit(e) {
        e.preventDefault();
      
        handleUpdateUser({
          name,
          email,
        });
    }

    function validate() {
        const form = formR.current;
        if (form.checkValidity()) {
          setIsDisabled(false);
        } else {
          setIsDisabled(true);
        }
    }

    function handleNameChange(e) {
        setName(e.target.value);
        if (e.target.validity.valid) {
            setNameErr('');
        } else {
            setNameErr('Количество символов от 2 до 32.')
        }
        validate();
    }

    function handleEmailChange(e) {
        setEmail(e.target.value);
        if (e.target.validity.valid) {
            setEmailErr('');
        } else {
            setEmailErr('Неккоректный адрес электронной почты.')
        }
        validate();
    }

    React.useEffect(() => {
        setName(currentUser.name);
        setEmail(currentUser.email);
    }, [currentUser]);

    return (
        <>
            <Header loggedIn={loggedIn} />
            <section className="profile">
                <div className="profile__container">
                    <form className="profile__form" ref={formR} onSubmit={handleSubmit} noValidate>
                        <h2 className="profile__title">Привет, {currentUser.name}!</h2>
                        <fieldset className="profile__inputs">
                            <div className="profile__field">
                                <p className="profile__label profile__label-name">Имя</p>
                                <input className="profile__input profile__input-name" type="text" minLength="2" maxLength="32" onChange={handleNameChange} defaultValue={currentUser.name} required />
                                <span className="profile__error">{nameErr}</span>
                            </div>
                            <div className="profile__field">
                                <p className="profile__label profile__label-mail">E-mail</p>
                                <input className="profile__input profile__input-mail" type="email" onChange={handleEmailChange} defaultValue={currentUser.email} required />
                                <span className="profile__error">{emailErr}</span>
                            </div>
                        </fieldset>
                        <div className="profile__buttons">
                            <span className="profile__formError">{onUpdateUserErr}</span>
                            <button type="submit" className={`profile__btn-edit ${isDisabled ? "profile__btn-edit-disabled" : ""}`} disabled={isDisabled} >Редактировать</button>
                            <button type="button" className="profile__btn-exit" onClick={onSignOut}>Выйти из аккаунта</button>
                        </div>
                    </form>
                </div>
            </section>
        </>
    )
}