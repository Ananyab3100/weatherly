import React, { useEffect, useState } from "react";
import { getWeatherByCity, getWeatherByCoords } from "../api/WeatherService";

const Home = () => {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("");
  const [unit, setUnit] = useState("C");
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getCurrentLocationWeather();
  }, []);

  // Get user's current location weather
  const getCurrentLocationWeather = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeatherByCoords(latitude, longitude);
        },
        (error) => {
          console.error("Geolocation error:", error);
          fetchWeather("New York"); // Default fallback
        }
      );
    } else {
      fetchWeather("New York");
    }
  };

  // Fetch weather by coordinates (lat, lon)
  const fetchWeatherByCoords = async (lat, lon) => {
    setLoading(true);
    const data = await getWeatherByCoords(lat, lon);
    if (data) {
      setWeather(data);
      setCity(data.location.name);
    }
    setLoading(false);
  };

  // Fetch weather by city name
  const fetchWeather = async (city) => {
    setLoading(true);
    const data = await getWeatherByCity(city);
    if (data) {
      setWeather(data);
      setCity(city);
    }
    setLoading(false);
  };

  // Convert temperature unit
  const convertTemp = (tempC) => (unit === "C" ? tempC : (tempC * 9) / 5 + 32);

  // Handle city search
  const handleSearch = () => {
    if (searchTerm.trim()) {
      fetchWeather(searchTerm.trim());
    }
  };

  return (
    <div className="container">
      <h1>Weather App</h1>

      {/* Search Input */}
      <div>
        <input
          type="text"
          placeholder="Enter city name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {/* Toggle Celsius/Fahrenheit */}
      <div>
        <button onClick={() => setUnit(unit === "C" ? "F" : "C")}>
          Switch to {unit === "C" ? "Fahrenheit" : "Celsius"}
        </button>
      </div>

      {/* Weather Data */}
      {loading ? (
        <p>Loading weather data...</p>
      ) : weather ? (
        <div>
          <h2>
            {weather.location.name}, {weather.location.country}
          </h2>
          <p>Temperature: {convertTemp(weather.current.temp_c)}°{unit}</p>
          <p>{weather.current.condition.text}</p>
          <img src={weather.current.condition.icon} alt="weather-icon" />

          {/* Hourly Forecast */}
          <h3>Hourly Forecast</h3>
          <div style={{ display: "flex", overflowX: "auto" }}>
            {weather.forecast.forecastday[0].hour.map((hour, index) => (
              <div key={index} style={{ margin: "10px", textAlign: "center" }}>
                <p>{hour.time.split(" ")[1]}</p>
                <p>{convertTemp(hour.temp_c)}°{unit}</p>
                <img src={hour.condition.icon} alt="weather-icon" />
              </div>
            ))}
          </div>

          {/* 5-Day Forecast */}
          <h3>5-Day Forecast</h3>
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            {weather.forecast.forecastday.map((day, index) => (
              <div key={index} style={{ textAlign: "center" }}>
                <p>{day.date}</p>
                <p>High: {convertTemp(day.day.maxtemp_c)}°{unit}</p>
                <p>Low: {convertTemp(day.day.mintemp_c)}°{unit}</p>
                <img src={day.day.condition.icon} alt="weather-icon" />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p>Weather data not available</p>
      )}
    </div>
  );
};

export default Home;
