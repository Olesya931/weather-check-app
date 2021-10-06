import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import cities from '../data/cities.json';

import '../styles/css/SearchBar.css';

const SearchBar = () => {

    const [filteredData, setFilteredData] = useState([]);

    // Автокомплит
    const handleFilter = (event) => {
        const searchInput = event.target.value;
        let matches = [];

        if (searchInput.length > 2) {
            matches = cities.filter((value) => {
                const regex = new RegExp(`^${searchInput}`, 'gi');
                return value.name.match(regex);
            })
        }
        if (searchInput === "") {
            setFilteredData([]);
        } else {
            setFilteredData(matches);
        }

    }

    return (
        <>
            <section className="search">
                <div className="container">
                    <div className="search__inner">
                        <input className="search__input" onChange={handleFilter} placeholder="Укажите город" type="text" />
                    </div>

                    {filteredData.length !== 0 && (
                        <div className="search__result">

                            <ul className="result__list">
                                {
                                    filteredData.map((value, key) => {
                                        return (
                                            // Переход на страницу города при клике
                                            <NavLink to={{
                                                pathname: "/weather",
                                                state: { name: value.name }
                                            }} className="result__link" key={key}>
                                                <li className="result__item">{value.name}</li>
                                            </NavLink>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                    )}
                </div>
            </section>

        </>
    )
}

export default SearchBar