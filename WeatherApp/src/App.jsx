import { useState } from "react";
import "./App.css";
import { IoSearch } from "react-icons/io5";

// Import default icon
import defaultIcon from "./assets/default.png";
// Import weather icons
import sunIcon from "./assets/sun.png";
import cloudIcon from "./assets/cloudy.png";
import rainIcon from "./assets/heavy-rain.png";
import drizzleIcon from "./assets/drizzle.png";
import thunderstormIcon from "./assets/storm.png";
import snowIcon from "./assets/snow.png";
import Haze from "./assets/fog.png";

const weatherIcons = {
  "Clear": sunIcon,
  "Haze":Haze,
  "Clouds": cloudIcon,
  "Rain": rainIcon,
  "Drizzle": drizzleIcon,
  "Thunderstorm": thunderstormIcon,
  "Snow": snowIcon,
};

const App = () => {
  const [search, setSearch] = useState("");
  const [weatherData, setWeatherData] = useState(null);

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

  const fetchData = async (location) => {
    try {
      const key = "1a18911a65315eb2d4feebb6fbc0e880"
      const response = await fetch(`https://pro.openweathermap.org/data/2.5/weather?q=${location}&APPID=${key}&units=metric`);
      const data = await response.json();
      if (!response.ok) {
        throw new Error(`Failed to fetch weather data: ${response.status} (${response.statusText})`);
      }
      setWeatherData(data);
    } catch (error) {
      alert(error.message);
    }
  };

  const getWeatherIcon = (weather) => {
    if (weather && weather.length > 0) {
      const icon = weatherIcons[weather[0].main];
      
      return icon || defaultIcon ;
    }
    return defaultIcon;
  };

  return (
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
          {weatherData && (
            <>
              <div className='weather-icon'><img src={getWeatherIcon(weatherData.weather)} alt="Weather icon" /></div>
              <div className='temp'>{weatherData.main && weatherData.main.temp}°C</div>
              <div className='location'>{weatherData.name}</div>
              <div className='weather-condition'>{weatherData.weather && weatherData.weather[0] && weatherData.weather[0].main}</div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
