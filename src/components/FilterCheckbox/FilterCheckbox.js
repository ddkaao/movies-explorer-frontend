import React from "react";
import "./FilterCheckbox.css";

export default function FilterCheckbox({ filter, handleFilterChange }) {
    return (
        <label className="filter">
            <input type="checkbox" className="filter__checkbox" value={filter} checked={filter} onChange={handleFilterChange} />
            <span className="filter__toggle"></span>
            <span className="filter__caption">Короткометражки</span>
        </label>
    )
}