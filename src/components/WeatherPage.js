import React, { useEffect, useState } from 'react';
import { NavLink, useLocation, Redirect } from 'react-router-dom';
import barometr from '../img/barometer.svg';
import logo from '../img/logo.svg';

import sprite from "../data/sprite.svg";
import '../styles/css/WeatherPage.css'
import '../styles/css/Header.css';

const WeatherPage = ({ favorite, setFavorite, getWeatherIcon }) => {
    let location = useLocation();

    const [weatherInfo, setWeatherInfo] = useState();
    const [toggleButton, setToggleButton] = useState(false);


    // получение информации о погоде в выбранном городе
    useEffect(() => {
        let weatherFavorite = JSON.parse(localStorage.getItem('weather-favorites'));
        setFavorite(weatherFavorite);
        const key = '05f0d827dc5191cc155093b4e7a2f37f';
        if (location.state !== undefined) {
            let city = location.state.name;
            fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&lang=ru&units=metric`)
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    setWeatherInfo(data);
                });
                if (favorite.indexOf(city) === -1) {
                    setToggleButton(false);
                } else {
                    setToggleButton(true);
                    
                }
        }

    }, [])


    //если город не был введен, то перенаправление обратно на главную страницу
    if (location.state === undefined) {
        return <Redirect exact to="/" />
    }

    //сохранить город в закладки, если он еще не сохранен. если уже сохранен, то удалить из закладок
    const saveWeather = (weather) => {
        if (favorite.indexOf(weather) === -1) {
            const newFavorite = [...favorite, weather];
            setFavorite(newFavorite);
        } else {
            setFavorite(favorite.filter(item => item !== weather));
        }
        setToggleButton(!toggleButton);
    }

    

    // перевод времени заката из юникс 
    const convertTime = (unixTime) => {
        let date = new Date((unixTime * 1000));
        let hours = date.getHours();
        let minutes = "0" + date.getMinutes();
        let formattedTime = hours + ":" + minutes.substr(-2);
        return formattedTime;
    }

    return (
        <>
            <header className="header__weather">
                <div className="container">
                    <div className="logo">
                        <a className="logo__link" href="#" >
                            <img className="logo__img" src={logo} alt="Weather check" />
                            <span className="logo__text">WeatherCheck</span>
                        </a>
                    </div>
                </div>
            </header>
            <div className="weather-page">

                <div className="head">
                    <div className="container">
                        <div className="head__inner">
                            <NavLink to="/" className="head__back">
                                <svg className="head__back-img">
                                <use href={sprite + "#back"} />
                                </svg>
                                <span className="head__back-text">Назад</span>
                            </NavLink>
                            <button className="head__bookmark" onClick={(e) => saveWeather(weatherInfo.name)}>
                                <svg className={toggleButton ? "head__bookmark-img head__bookmark-img_toggle" : "head__bookmark-img"}>
                                    <use href={sprite + "#bookmark"} />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <div className="weather">
                    <div className="container">
                        {weatherInfo && (
                            <div className="weather__inner">
                                <div className="weather__name">{weatherInfo.name}</div>
                                <div className="weather__description">{weatherInfo.weather[0].description}</div>
                                <div className="weather__main">
                                    <div className="weather__temperature">{Math.round(weatherInfo.main.temp)}&deg;</div>
                                    <div className="weather__icon"><img className="weather__icon-img" src={getWeatherIcon(weatherInfo.weather[0].id)} alt="weather icon" /></div>
                                </div>
                                <div className="weather__pressure">
                                    <img src={barometr} alt="barometr" className="weather__pressure-icon" />
                                    <div className="weather__pressure-value">{Math.round(weatherInfo.main.pressure * 0.75)} мм рт. ст.</div>
                                </div>
                                <div className="weather__sunset">Закат в {convertTime(weatherInfo.sys.sunset)}</div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default WeatherPage;
