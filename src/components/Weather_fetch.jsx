import { useState, useEffect, useRef } from "react";
import "./Weather_fetch.css";
import { IoSearch } from "react-icons/io5";
import { FaLocationDot } from "react-icons/fa6";
import LoadingBar from 'react-top-loading-bar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import defaultIcon from "../assets/default.png";
import sunIcon from "../assets/sun.png";
import cloudIcon from "../assets/cloudy.png";
import rainIcon from "../assets/heavy-rain.png";
import drizzleIcon from "../assets/drizzle.png";
import thunderstormIcon from "../assets/storm.png";
import snowIcon from "../assets/snow.png";
import HazeIcon from "../assets/fog.png";
import WindIcon from "../assets/Wind.png";

const weatherIcons = {
  "Clear": sunIcon,
  "Haze": HazeIcon,
  "Clouds": cloudIcon,
  "Rain": rainIcon,
  "Drizzle": drizzleIcon,
  "Thunderstorm": thunderstormIcon,
  "Snow": snowIcon,
};

const apiKey = "1a18911a65315eb2d4feebb6fbc0e880";

const Weather_fetch = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [showDefaultIcon, setShowDefaultIcon] = useState(true);
  const [progress, setProgress] = useState(0);
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showInput, setShowInput] = useState(true);
  const suggestionRef = useRef();
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1);
  const [inputFocused, setInputFocused] = useState(false);
  const getLocationWeather = () => {
    setProgress(30);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          fetchDataByCoordinates(latitude, longitude);
        },
        (error) => {
          console.error("Error getting user's location:", error);
          setProgress(100); 
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
      setProgress(100); 
    }
  };

  const fetchDataByCoordinates = async (latitude, longitude) => {
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`);
      if (!response.ok) {
        throw new Error(`Failed to fetch weather data: ${response.status} (${response.statusText})`);
      }
      const data = await response.json();
      data.wind.dir = degToCompass(data.wind.deg);
      setWeatherData(data);
      setShowDefaultIcon(false);
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setShowDefaultIcon(true);
    } finally {
      setProgress(100);
    }
  };

  const degToCompass = (num) => {
    let val = Math.floor((num / 22.5) + 0.5);
    let arr = [
      "North", "North-Northeast", "Northeast", "East-Northeast",
      "East", "East-Southeast", "Southeast", "South-Southeast",
      "South", "South-Southwest", "Southwest", "West-Southwest",
      "West", "West-Northwest", "Northwest", "North-Northwest"
    ];
    return arr[(val % 16)];
  };

  useEffect(() => {
    getLocationWeather();

    const handleOnline = () => {
      toast.dismiss();
    setTimeout(() => {
      toast.success("You are online.😊✌️", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        pauseOnHover: true,
        draggable: true
      });
    }, 100);
    };

    const handleOffline = () => {
      toast.error("You are offline. Please check your internet connection ☹️.",{
        position: "top-right",
        autoClose:false,
        hideProgressBar: false,
        pauseOnHover: true,
        draggable: true
      });
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  const getWeatherIcon = (weather) => {
    if (weather && weather.length > 0) {
      const icon = weatherIcons[weather[0].main];
      return icon || defaultIcon;
    }
    return defaultIcon;
  };

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
    setProgress(0);
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`);
      if (!response.ok) {
        throw new Error(`Failed to fetch weather data: ${response.status} (${response.statusText})`);
      }
      const data = await response.json();
      data.wind.dir = degToCompass(data.wind.deg);
      setWeatherData(data);
      setShowDefaultIcon(false);
      setSearch(""); // Clear the input field after successful fetch
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setShowDefaultIcon(true);
    } finally {
      setProgress(100);
    }
  };

  const fetchSuggestions = async (query) => {
    if (query.length === 0) {
      setSuggestions([]);
      return;
    }
    try {
      const response = await fetch(`https://api.geoapify.com/v1/geocode/autocomplete?text=${query}&apiKey=718126df44da426a8b07fb1d2726b9fa`);
      if (!response.ok) {
        throw new Error(`Failed to fetch suggestions: ${response.status} (${response.statusText})`);
      }
      const data = await response.json();
      setSuggestions(data.features.map(feature => ({
        id: feature.properties.place_id,
        name: feature.properties.city || feature.properties.name,
        country: feature.properties.country
      })));
      setSelectedSuggestionIndex(-1);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  };

  const handleInputChange = (e) => {
    const newQuery = e.target.value;
    setSearch(newQuery);
    
    // Clear suggestions when the input field is emptied
    if (newQuery === "") {
      setSuggestions([]);
    } else {
      fetchSuggestions(newQuery);
    }
  };

  const handleSuggestionClick = (cityName) => {
    setSearch(cityName);
    setSuggestions([]);
    fetchData(cityName);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && selectedSuggestionIndex !== -1) {
      e.preventDefault();
      const selectedSuggestion = suggestions[selectedSuggestionIndex];
      setSearch(selectedSuggestion.name);
      setSuggestions([]);
      fetchData(selectedSuggestion.name);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedSuggestionIndex(prevIndex => Math.max(prevIndex - 1, 0));
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedSuggestionIndex(prevIndex => Math.min(prevIndex + 1, suggestions.length - 1));
    }
  };

  return (
    <>
      <ToastContainer />
      <div className='main'>
        <LoadingBar color='#ffc107' style={{position:"absolute"}} className="LoadingBar" progress={progress} height={5} />
        <div className='cards'>
          <button className="getLocationBtn" onClick={getLocationWeather}>
            <FaLocationDot className="LocationBtn" />
          </button>
          {showInput && (
            <form onSubmit={handleSearch}>
              <input
                className='cityName'
                id='cityName'
                value={search}
                onChange={handleInputChange}
                autoComplete="off"
                onKeyDown={handleKeyPress}
                onFocus={() => setInputFocused(true)}
                onBlur={() => setTimeout(() => setInputFocused(false), 200)} // Delayed to allow click event to process
              />
              <label className='l' htmlFor="cityName">Enter your city</label>
              <button className="Search-btn" type="submit">
                <IoSearch className='search-icon' />
              </button>
            </form>
          )}
          {suggestions.length > 0 && (
            <div className='suggestions' style={{ display: inputFocused ? 'flex' : 'none', maxHeight: '200px', overflowY: 'scroll' }}>
              {suggestions.map((suggestion, index) => (
                <div
                  key={suggestion.id}
                  className={`suggestion-item ${index === selectedSuggestionIndex ? 'selected' : ''}`}
                  ref={index === 0 ? suggestionRef : null}
                  onMouseDown={() => handleSuggestionClick(suggestion.name)}
                >
                  {suggestion.name}, {suggestion.country}
                </div>
              ))}
            </div>
          )}
          <div className='result-box'>
            {(weatherData || showDefaultIcon) && (
              <>
                {!showDefaultIcon && (
                  <>
                    <div className='weather-icon'><img src={getWeatherIcon(weatherData?.weather)} alt="Weather icon" /></div>
                    <div className='temp'>{weatherData?.main && Math.round(weatherData.main.temp) + "°C"}</div>
                    <div className='feels_like'>{weatherData?.main && "Feels like " + Math.round(weatherData.main.feels_like) + "°C"}</div>
                    <div className="Wind_icon">{weatherData && <img src={WindIcon} alt="Wind icon" />}</div>
                    <div className='wind_speed'>{weatherData?.wind && "Wind " + Math.round(weatherData.wind.speed) + " km/h"}</div>
                    <div className='wind_direction'>{weatherData?.wind && "Direction " + weatherData.wind.dir}</div>
                    <div className='location'>{weatherData?.name}</div>
                    <div className='weather-condition'>{weatherData?.weather && weatherData.weather[0]?.main}</div>
                  </>
                )}
                {showDefaultIcon && (
                  <div className='weather-icon default-icon'><img src={defaultIcon} alt="welcome " /></div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Weather_fetch;

