import React, { useState, useEffect } from "react";
import "./App.css";
import { IoSearch } from "react-icons/io5";
import LoadingBar from 'react-top-loading-bar'; // Importing the LoadingBar component

// Import default icon
import defaultIcon from "./assets/default.png";
import sunIcon from "./assets/sun.png";
import cloudIcon from "./assets/cloudy.png";
import rainIcon from "./assets/heavy-rain.png";
import drizzleIcon from "./assets/drizzle.png";
import thunderstormIcon from "./assets/storm.png";
import snowIcon from "./assets/snow.png";
import HazeIcon from "./assets/fog.png";

const weatherIcons = {
  "Clear": sunIcon,
  "Haze": HazeIcon,
  "Clouds": cloudIcon,
  "Rain": rainIcon,
  "Drizzle": drizzleIcon,
  "Thunderstorm": thunderstormIcon,
  "Snow": snowIcon,
};

const App = () => {
  const [search, setSearch] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [showDefaultIcon, setShowDefaultIcon] = useState(true);
  const [progress, setProgress] = useState(0); // State to manage loading bar progress

  const handleSearch = async (e) => {
    e.preventDefault();
    const location = e.currentTarget.elements.cityName.value.trim();
    if (!location) {
      alert("Please enter a city name.");
      return;
    }
    setSearch(location);
    fetchData(location);
  };

  const degToCompass = (num) => {
    let val = Math.floor((num / 22.5) + 0.5);
    let arr =  [
      "North",
      "North-Northeast",
      "Northeast",
      "East-Northeast",
      "East",
      "East-Southeast",
      "Southeast",
      "South-Southeast",
      "South",
      "South-Southwest",
      "Southwest",
      "West-Southwest",
      "West",
      "West-Northwest",
      "Northwest",
      "North-Northwest"
  ];
  
    return arr[(val % 16)];
  }

  const fetchData = async (location) => {
    setProgress(30); // Update loading progress
    try {
      const key = "1a18911a65315eb2d4feebb6fbc0e880";
      const response = await fetch(`https://pro.openweathermap.org/data/2.5/weather?q=${location}&APPID=${key}&units=metric`);
      const data = await response.json();
      data.wind.dir = degToCompass(data.wind.deg); // Convert wind direction from degrees to cardinal directions
      setProgress(70); // Update loading progress
      if (!response.ok) {
        throw new Error(`Failed to fetch weather data: ${response.status} (${response.statusText})`);
      }
      setWeatherData(data);
      setShowDefaultIcon(false); // Data fetched successfully, so hide default icon
    } catch (error) {
      alert(error.message);
      setShowDefaultIcon(true); // Show default icon if there's an error fetching data
    } finally {
      setProgress(100); // Loading complete
    }
  };

  useEffect(() => {
    setShowDefaultIcon(true); // Show default icon initially
  }, []);

  const getWeatherIcon = (weather) => {
    if (weather && weather.length > 0) {
      const icon = weatherIcons[weather[0].main];      
      return icon || defaultIcon;
    }
    return defaultIcon;
  };

  return (
  <>
  <LoadingBar color='#ffc107' progress={progress} height={5} /> 
    <div className='main'>
      <div className='cards'>
        
        <form onSubmit={handleSearch}>
          <input className='cityName' id='cityName' />
          <label className='l' htmlFor="cityName">Enter your city</label>
          <button className="Search" type="submit">
            <IoSearch className='search-icon' />
          </button>
        </form>
        <div className='result-box'>
          {(weatherData || showDefaultIcon) && (
            <>
              <div className='weather-icon'><img src={getWeatherIcon(weatherData?.weather)} alt="Weather icon" /></div>
              <div className='temp'>{weatherData?.main && Math.round(weatherData.main.temp)+"°C"}</div>
              <div className='feels_like'>{weatherData?.main && "Feels like"+" "+Math.round(weatherData.main.feels_like)+"°C"}</div>
              <div className='wind_speed'>{weatherData?.wind && "Wind speed"+" "+ Math.round(weatherData.wind.speed)+"km/h"}</div>
              <div className='wind_direction'>{weatherData?.wind && "Wind direction"+" "+ weatherData.wind.dir}</div>
              <div className='location'>{weatherData?.name}</div>
              <div className='weather-condition'>{weatherData?.weather && weatherData.weather[0]?.main}</div>
            </>
          )}
        </div>
      </div>
    </div>
    </>
  );
};

export default App;
