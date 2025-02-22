const API_KEY = "dc65306ff30c4e35946113618252102";
const BASE_URL = "https://api.weatherapi.com/v1";

// Fetch weather by city name
export const getWeatherByCity = async (city) => {
    try {
      const response = await fetch(
        `${BASE_URL}/forecast.json?key=${API_KEY}&q=${city}&days=5&aqi=no&alerts=no`
      );
      return await response.json();
    } catch (error) {
      console.error("Error fetching weather by city:", error);
      return null;
    }
  };
  
  // Fetch weather by coordinates (latitude & longitude)
  export const getWeatherByCoords = async (lat, lon) => {
    try {
      const response = await fetch(
        `${BASE_URL}/forecast.json?key=${API_KEY}&q=${lat},${lon}&days=5&aqi=no&alerts=no`
      );
      return await response.json();
    } catch (error) {
      console.error("Error fetching weather by coordinates:", error);
      return null;
    }
  };