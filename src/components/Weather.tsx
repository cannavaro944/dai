import React, { useEffect, useState } from 'react';
import SearchIcon from '../assets/search_icon.png';
const Weather = () => {

  const[weatherData, setWeatherData]= useState(false);
  const allIcons ={
"01d": clear_icon,
"01n": clear_icon,
"02d": cloud_icon,
"02n": cloud_icon,
"03d": cloud_icon,
"03n": cloud _icon,
"04d": drizzle_icon,
"04n": drizzle_icon,
"09d": rain_icon,
"09n": rain_icon,
"10d": rain_icon,
"10n": rain_icon,
"13d": snow_icon,
"13n": snow icon,
  }
  const search= async (city) =>{
    try{
      const url = 'https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}'


      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
      const icon = allIcons[data.weather[0].icon] || clear_icon;
      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: icon
      })
    } catch(error){

    }
    useEffect(()=>{
      search("Braga");
    }, [])
  }
  return (
    <div className='weather'>
      <div className='search-bar'>
        <input type ="text" aria-placeholder='Search'/>
        <img src={SearchIcon} alt="" className="search-icon" />
      </div>
    </div>
  )
}

export default Weather
