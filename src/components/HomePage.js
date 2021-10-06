import React, { useEffect } from 'react'
import SearchBar from './SearchBar';
import Guide from './Guide';
import Favorite from './Favorite';
import logo from '../img/logo.svg';

import '../styles/css/Header.css';




const HomePage = ({ favorite, setFavorite, getWeatherIcon, weather }) => {

    // получение из LocalStorage избранных городов
    useEffect(() => {
        if (localStorage.getItem('weather-favorites') === null) {
            localStorage.setItem('weather-favorites', JSON.stringify([]));
        } else {
            let weatherFavorite = JSON.parse(localStorage.getItem('weather-favorites'));
            setFavorite(weatherFavorite);
        }
    }, []);


    return (
        <div className="home-page">
            <header className="header">
                <div className="container">
                    <div className="logo">
                        <a className="logo__link" href="#" >
                            <img className="logo__img" src={logo} alt="Weather check" />
                            <span className="logo__text">WeatherCheck</span>
                        </a>
                    </div>
                </div>
            </header>
            <SearchBar />
            {/* Если в избранное добавлены города, то выводим их  */}
            {
                favorite.length === 0 ? <Guide /> : <Favorite favorite={favorite} setFavorite={setFavorite} getWeatherIcon={getWeatherIcon} weather={weather} />
            }
        </div>

    )


}

export default HomePage;