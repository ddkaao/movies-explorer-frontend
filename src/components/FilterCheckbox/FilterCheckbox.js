import React from "react";
import "./FilterCheckbox.css";

export default function FilterCheckbox({ moviesFilter, handleFilterChange }) {
    return (
        <label className="filter">
            <input type="checkbox" className="filter__checkbox" value={moviesFilter} checked={moviesFilter} onChange={handleFilterChange} />
            <span className="filter__toggle"></span>
            <span className="filter__caption">Короткометражки</span>
        </label>
    )
}