import React from 'react';
import { useHistory } from 'react-router-dom';

import '../styles/css/Favorite.css';


const Favorite = ({favorite, setFavorite, getWeatherIcon, weather}) => {

  const history = useHistory();

  // переход на страницу города и передача названия города 
  function handleClickFavorite(cityName) {
    history.push({
      pathname: '/weather',
      state: {  
        name: cityName,
      },
    });
  }


  return (

    <div className="favorite">
      <div className="container">
        <div className="favorite__inner">
          {weather && weather.map((item, index) => {
            return (
              <div className="favorite__item" key={index} onClick={() => handleClickFavorite(item.name)}>
                <div className="favorite__city">{item.name}</div>
                <div className="favorite__temperature">{Math.round(item.main.temp)}&deg;</div>
                <div className="favorite__icon"><img className="favorite__icon-img" src={getWeatherIcon(item.weather[0].id)} alt="Weather icon" /></div>
              </div>);
          })}
        </div>
      </div>
    </div>

  )
}

export default Favorite;