import React, { useState } from 'react';
import axios from 'axios';
import './WeatherApp.css';

const WeatherApp = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!city) return; // Ensure city is not empty
    setLoading(true);
    setWeather(null); // Clear previous weather data
    try {
      const response = await axios.get('https://api.weatherapi.com/v1/current.json', {
        params: {
          key: '22bae9a5d6d543b0a6423903243105', // Replace with your actual API key
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
      <div className="search-container">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name"
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      {loading && <p className="loading">Loading data…</p>}
      {weather && (
        <div className="weather-cards">
          <div className="weather-card">
            <p>Temperature</p>
            <h2>{weather.current.temp_c}°C</h2>
          </div>
          <div className="weather-card">
            <p>Humidity</p>
            <h2>{weather.current.humidity}%</h2>
          </div>
          <div className="weather-card">
            <p>Condition</p>
            <h2>{weather.current.condition.text}</h2>
          </div>
          <div className="weather-card">
            <p>Wind Speed</p>
            <h2>{weather.current.wind_kph} kph</h2>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherApp;
