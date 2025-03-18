import React, { useEffect, useState } from 'react';
import SearchIcon from '../assets/search_icon.png';

import clear_icon from '../assets/clear.png';
import cloud_icon from '../assets/cloud.jpg';
import drizzle_icon from '../assets/drizzle.png';
import rain_icon from '../assets/rain.png';
import snow_icon from '../assets/snow.png';
import humidity_icon from '../assets/humidity.png';
import wind_icon from '../assets/wind.png';



const Weather = () => {
  const [weatherData, setWeatherData] = useState(false);
  const [city, setCity] = useState("New York");

  const allIcons = {
    "01d": clear_icon,
    "01n": clear_icon,
    "02d": cloud_icon,
    "02n": cloud_icon,
    "03d": cloud_icon,
    "03n": cloud_icon,
    "04d": drizzle_icon,
    "04n": drizzle_icon,
    "09d": rain_icon,
    "09n": rain_icon,
    "10d": rain_icon,
    "10n": rain_icon,
    "13d": snow_icon,
    "13n": snow_icon
  };

  const search = async (city) => {
    try {
      const url = https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID};

      const response = await fetch(url);
      const data = await response.json();
      console.log(data);

      if (data.cod === 200) {
        const icon = allIcons[data.weather[0].icon] || clear_icon;
        setWeatherData({
          humidity: data.main.humidity,
          windSpeed: data.wind.speed,
          temperature: Math.floor(data.main.temp),
          location: data.name,
          icon: icon
        });
      } else {
        console.error("Cidade não encontrada");
        setWeatherData(null);
      }
    } catch (error) {
      console.error("Erro ao buscar os dados:", error);
    }
  };

  useEffect(() => {
    search(city);
  }, []);

  return (
    <div className='weather'>
      <div className='search-bar'>
        <input
          type="text"
          placeholder='Search'
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <img
          src={SearchIcon}
          alt="Search"
          className="search-icon"
          onClick={() => search(city)}
        />
      </div>
      <img src={clear_icon} alt="" className='weather-icon'/>
      <p className='temeprature'>{weatherData.temperature} ºC</p>
      <p className='location'>{weatherData.location}</p>
      <div className='weather-data'>
        <div className="col">
          <img src={humidity_icon} alt="" />
          <div>
            <p> {weatherData.humidity}</p>
            <span>Humidity</span>
          </div>
        </div>
        <div className="col">
          <img src={wind_icon} alt="" />
          <div>
            <p> {weatherData.windSpeed} Km/h</p>
            <span>Wind Speed</span>
          </div>
        </div>   
      </div>

      {weatherData ? (
        <div className='weather-info'>
          <h2>{weatherData.location}</h2>
          <img src={weatherData.icon} alt="Weather Icon" className="weather-icon" />
          <p>Temp: {weatherData.temperature}°C</p>
          <p>Humidity: {weatherData.humidity}%</p>
          <p>Wind Speed: {weatherData.windSpeed} m/s</p>
        </div>
      ) : (
        <p className="error-message">Cidade não encontrada</p>
      )}
    </div>
  );
};

export default Weather;

