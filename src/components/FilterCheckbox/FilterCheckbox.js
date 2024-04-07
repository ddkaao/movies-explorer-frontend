import React from "react";
import "./FilterCheckbox.css";

export default function FilterCheckbox() {
    return (
        <label className="filter">
            <input type="checkbox" className="filter__checkbox" />
            <span className="filter__toggle" />
            <p className="filter__caption">Короткометражки</p>
        </label>
    )
}