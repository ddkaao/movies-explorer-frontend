import React from "react";
import { Link } from "react-router-dom";
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
        <div className="navigation">
            <div className="navigation__links">
                <Link className="navigation__link" to="/movies">Фильмы</Link>
                <Link className="navigation__link" to="/saved-movies">Сохранённые фильмы</Link>
            </div>
            <Link className="navigation__account" to="/profile">
                <button type="button" className="navigation__button">Аккаунт</button>
            </Link>

            <MenuButton onClick={handleClickOnMenuBtn} />
            <SlideMenu isOpen={isSlideMenuOpened} onClose={closeSlideMenu} />
        </div>
    )
}