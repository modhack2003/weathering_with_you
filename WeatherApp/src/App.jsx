import { useState } from "react";
import "./App.css"
import { IoSearch } from "react-icons/io5";
import icon from "./assets/sun.png";

const App = () => {
  const [search, setSearch] = useState("");
  const [weatherData, setWeatherData] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    const location = e.currentTarget.elements.cityName.value;
    setSearch(location);
    fetchData(location);
  };

  const fetchData = async (location) => {
    try {
      const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=ab3b79d2d2b14bbba8883349242504&q=${location}&aqi=no`);
      const data = await response.json();
      console.log(data);
      setWeatherData(data); 
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='main'>
      <div className='cards'>
        <form id='f' onSubmit={handleSearch}>
          <input className='cityName' id='cityName' />
          <label className='l' htmlFor="cityName">Enter your city</label>
          <button className="Search" type="submit">
            <IoSearch className='search-icon' />
          </button>
        </form>
        <div className='result-box'>
          {weatherData && (
            <>
              <div className='weather-icon'><img src={weatherData.current.condition.icon} alt="" /></div>
              <div className='temp'>{weatherData.current.temp_c}°C</div>
              <div className='location'>{weatherData.location.name}</div>
              <div className='weather-condition'>{weatherData.current.condition.text}</div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
