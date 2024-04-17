import React from "react";
import { Link } from "react-router-dom";
import account from "../../images/account.svg";
import SlideMenu from "../SlideMenu/SlideMenu";
import MenuButton from "../MenuButton/MenuButton";
import './Navigation.css'; 

export default function Navigation() {

    const [isSlideMenuOpened, setSlideMenuOpen] = React.useState(false);

    function  handleClickOnMenuBtn() {
        setSlideMenuOpen(true);
    }

    function closeSlideMenu() {
        setSlideMenuOpen(false);
    }

    return (
        <section className="navigation">
            <div className="navigation__links">
                <Link className="navigation__link" to="/movies">Фильмы</Link>
                <Link className="navigation__link" to="/saved-movies">Сохранённые фильмы</Link>
            </div>
            <Link className="navigation__account" to="/profile">
                <img src={account} className="navigation__button" alt="Аккаунт" />
            </Link>

            <MenuButton onClick={handleClickOnMenuBtn} />
            <SlideMenu isOpen={isSlideMenuOpened} onClose={closeSlideMenu} />
        </section>
    )
}