import React, { useState } from 'react';
import axios from 'axios';
import './WeatherApp.css';

const WeatherApp = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    setWeather(null);
    try {
      const response = await axios.get('https://api.weatherapi.com/v1/current.json', {
        params: {
          key: '22bae9a5d6d543b0a6423903243105', 
          q: city,
        },
      });
      setWeather(response.data);
    } catch (error) {
      alert('Failed to fetch weather data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="weather-app">
      <h1>Weather App</h1>
      <div>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name"
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      {loading && <p>Loading data…</p>}
      {weather && (
        <div className="weather-cards">
          <div className="weather-card">
            <h2>{weather.location.name}</h2>
            <p>Temperature: {weather.current.temp_c}°C</p>
            <p>Humidity: {weather.current.humidity}%</p>
            <p>Condition: {weather.current.condition.text}</p>
            <p>Wind Speed: {weather.current.wind_kph} kph</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherApp;
