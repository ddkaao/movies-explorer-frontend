import React from "react";
import { Link } from "react-router-dom";
import logo from '../../images/logo.svg';
import './Register.css'; 

export default function Register({ isLoading, onRegister, onRegisterErr }) {

    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [isDisabled, setIsDisabled] = React.useState(true);
    const [nameErr, setNameErr] = React.useState('');
    const [emailErr, setEmailErr] = React.useState('');
    const [passwordErr, setPasswordErr] = React.useState('');
    const formR = React.useRef();

    function handleSubmit(e) {
        e.preventDefault();
      
        onRegister(name, email, password);
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
            setNameErr('Количество символов от 8 до 32.')
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

    function handlePasswordChange(e) {
        setPassword(e.target.value);
        if (e.target.validity.valid) {
            setPasswordErr('');
        } else {
            setPasswordErr('Количество символов от 8 до 32.')
        }
        validate();
    }

    return (
        <section className="register">
            <div className="register__container">
                <form className="register__form" onSubmit={handleSubmit} ref={formR} noValidate>
                    <Link to="/">
                        <img src={logo} alt="Логотип" className="register__logo" />
                    </Link>
                    <h2 className="register__title">Добро пожаловать!</h2>
                    <fieldset className="register__inputs">
                        <div className="register__field">
                            <p className="register__label">Имя</p>
                            <input className="register__input" type="text" minLength="2" maxLength="32"value={name} onChange={handleNameChange} required disabled={isLoading} />
                            <span className="register__error">{nameErr}</span>
                        </div>
                        <div className="register__field">
                            <p className="register__label">E-mail</p>
                            <input className="register__input" type="email" value={email} onChange={handleEmailChange} required disabled={isLoading} />
                            <span className="register__error">{emailErr}</span>
                        </div>
                        <div className="register__field">
                            <p className="register__label">Пароль</p>
                            <input className="register__input" type="password" minLength="8" maxLength="32" value={password} onChange={handlePasswordChange} required disabled={isLoading} />
                            <span className="register__error">{passwordErr}</span>
                        </div>
                    </fieldset>
                    <span  className="register__formError">{onRegisterErr}</span>
                    <button type="submit" className={`register__btn ${isDisabled ? "register__btn-disabled" : ""}`} disabled={isDisabled}>Зарегистрироваться</button>
                    <p className="register__caption">Уже зарегистрированы? <Link className="register__link" to="/signin">Войти</Link></p>
                </form>
            </div>
        </section>
    )
}