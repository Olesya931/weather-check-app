import { useState, useEffect } from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import HomePage from './components/HomePage';
import WeatherPage from './components/WeatherPage';
import thunderstorm from './img/thunderstorm.svg';
import drizzle from './img/drizzle.svg';
import rain from './img/rain.svg';
import snow from './img/snow.svg';
import squall from './img/squall.svg';
import clear from './img/clear.svg';
import clouds from './img/clouds.svg';
import logo from './img/logo.svg';
// import './styles/css/Header.css';




const App = () => {

  const [favorite, setFavorite] = useState([]);
  const [weather, setWeather] = useState();

// получение изображения погоды по id
  const getWeatherIcon = (id)=>{
    let img = clear;
      if(id>=200&&id<=232){
        img = thunderstorm;
      } else if(id>=300&&id<=321){
        img = drizzle;
      } else if(id>=500&&id<=531){
        img = rain;
      }else if(id>=600&&id<=622){
        img = snow;
      }else if(id>=701&&id<=781){
        img = squall;
      }else if(id===800){
        img = clear;
      }else if(id>=801&&id<=804){
        img = clouds;
      }
      return img;
  }


// получение данных об "избранных" городах
  useEffect(() => {
    saveToLocalStorage(favorite);
    const key = '50a7aa80fa492fa92e874d23ad061374';
    if (favorite.length === 0) return;
    let requests = favorite.map(item => fetch(`https://api.openweathermap.org/data/2.5/weather?q=${item}&appid=${key}&lang=ru&units=metric`));
    Promise.all(requests)
      .then(res => Promise.all(res.map(r => r.json())))
      .then(data => {
        setWeather(data);
      })
  }, [favorite]);



// сохранение "избранных" городов в LocaStorage
  const saveToLocalStorage = (items) => {
    localStorage.setItem('weather-favorites', JSON.stringify(items));
  }
  return (
    <BrowserRouter>
      <div className="App">
        <Route exact path="/">
          <HomePage 
          favorite={favorite}
          setFavorite={setFavorite}
          getWeatherIcon={getWeatherIcon}
          weather={weather}/>
        </Route>
        <Route exact path="/weather">
          <WeatherPage
            favorite={favorite}
            setFavorite={setFavorite}
            getWeatherIcon={getWeatherIcon}
          />
        </Route>
      </div>
    </BrowserRouter>

    
  );
}

export default App;
