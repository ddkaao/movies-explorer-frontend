import React from "react";
import { Link } from "react-router-dom";
import logo from '../../images/logo.svg';
import './Login.css'; 

export default function Login({ isLoading, onLogin, onLoginErr }) {

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [isDisabled, setIsDisabled] = React.useState(true);
    const [emailErr, setEmailErr] = React.useState('');
    const [passwordErr, setPasswordErr] = React.useState('');
    const formR = React.useRef();

    function handleSubmit(e) {
        e.preventDefault();
      
        onLogin(email, password);
    }

    function validate() {
        const form = formR.current;
        if (form.checkValidity()) {
          setIsDisabled(false);
        } else {
          setIsDisabled(true);
        }
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
        <section className="login">
            <div className="login__container">
                <form className="login__form" ref={formR} onSubmit={handleSubmit} noValidate>
                    <Link to="/">
                        <img src={logo} alt="Логотип" className="login__logo" />
                    </Link>
                    <h2 className="login__title">Рады видеть!</h2>
                    <fieldset className="login__inputs">
                        <div className="login__field">
                            <p className="login__label">E-mail</p>
                            <input className="login__input" type="email" value={email} onChange={handleEmailChange} required disabled={isLoading} />
                            <span className="login__error">{emailErr}</span>
                        </div>
                        <div className="login__field">
                            <p className="login__label">Пароль</p>
                            <input className="login__input" type="password" minLength="8" maxLength="32" value={password} onChange={handlePasswordChange} required disabled={isLoading} />
                            <span className="login__error">{passwordErr}</span>
                        </div>
                    </fieldset>
                    <span  className="login__formError">{onLoginErr}</span>
                    <button type="submit" className={`login__btn ${isDisabled ? "login__btn-disabled" : ""}`}>Войти</button>
                    <p className="register__caption">Ещё не зарегистрированы? <Link className="login__link" to="/signup">Регистрация</Link></p>
                </form>
            </div>
        </section>
    )
}