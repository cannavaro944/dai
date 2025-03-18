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
  const [weatherData, setWeatherData] = useState<{
    humidity: number;
    windSpeed: number;
    temperature: number;
    location: string;
    icon: string;
  } | null>(null);
  
  const [city, setCity] = useState<string>("London");

  const allIcons: Record<string, string> = {
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

  const search = async (city: string) => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;

      const response = await fetch(url);
      const data = await response.json();

      
        const icon = allIcons[data.weather[0]?.icon] || clear_icon;
        setWeatherData({
          humidity: data.main.humidity,
          windSpeed: data.wind.speed,
          temperature: Math.floor(data.main.temp),
          location: data.name,
          icon: icon
        });
     
        console.error("Cidade não encontrada");
        setWeatherData(null);
      
    } catch (error) {
      console.error("Erro ao buscar os dados:", error);
      setWeatherData(null);
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

      {weatherData ? (
        <div className='weather-info'>
          <h2>{weatherData.location}</h2>
          <img src={weatherData.icon} alt="Weather Icon" className="weather-icon" />
          <p className='temperature'>{weatherData.temperature} ºC</p>
          <div className='weather-data'>
            <div className="col">
              <img src={humidity_icon} alt="Humidity Icon" />
              <div>
                <p>{weatherData.humidity}%</p>
                <span>Humidity</span>
              </div>
            </div>
            <div className="col">
              <img src={wind_icon} alt="Wind Icon" />
              <div>
                <p>{weatherData.windSpeed} Km/h</p>
                <span>Wind Speed</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p className="error-message">Cidade não encontrada</p>
      )}
    </div>
  );
};

export default Weather;
