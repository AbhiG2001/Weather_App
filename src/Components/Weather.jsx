import React from "react";
import {
  FaMapMarkerAlt,
  FaSearch,
} from "react-icons/fa";
import HourlyForecast from "./HourlyForecast";
import axios from "axios";
import { useState } from "react";



const Weather1 = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState("");
  const [error, setError] = useState("");
  const api_key = `${import.meta.env.VITE_WEATHER_API_KEY}`; // Use your own API key here
  const api_url = "http://api.weatherapi.com/v1/forecast.json";
  const fetchData = async (query) => {
    // fetch data from the API
    console.log(query)
    try {
      const response = await axios.get(
        `${api_url}?key=${api_key}&q=${query}&days=1`
      );
      console.log(response.data.forecast.forecastday[0].hour);
      setWeatherData(response.data);
      setError("");
    } catch (err) {
      //   console.log("There was an error or the city was not found.");
      setError("There was an error or the city was not found.");
      setWeatherData(null);
    }
  };
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      // console.log("yes, geolocation is supported");
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          // console.log(latitude,longitude);
          const query = `${latitude},${longitude}`;
          fetchData(query);
        },
        (error) => {
          setError(error.message);
        }
      );
    } else {
      // console.log("geolocation does not supported for these browser !")
      setError("Geolocation is not supported by this browser.");
    }
  };
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      fetchData(city);
    }
  };

  return (
    <div className="bg-green-100 min-h-screen flex items-center justify-center">
      {/* card container */}
      <div className="bg-white shadow-lg my-10 p-4 rounded w-full max-w-sm">
        <div className="flex">
          {/* input field and search button */}
          <div className="flex border rounded items-center px-2 py-2 w-full">
            <FaSearch className="h-5 w-5" />
            <input
              onKeyUp={handleKeyPress}
              value={city}
              onChange={(e) => setCity(e.target.value)}
              type="text"
              placeholder="Enter City Name"
              className="pl-2 border-none focus:outline-none w-full"
            />
          </div>
          {/* current location button */}
          <button
            onClick={getCurrentLocation}
            className="px-4 py-2 bg-green-500 text-white ml-2 rounded hover:bg-green-600"
          >
            <FaMapMarkerAlt className="w-5 h-5" />
          </button>
        </div>

        {/* display the eorror message */}
        {error && <p className="text-red-500 text-center mt-4">{error}</p>}

        {/* Weather Data Display */}
        {weatherData && (
          <div className="mt-4 text-center">
            <h2 className="text-xl font-semibold ">
              {weatherData.location.name}
            </h2>
            {/* Weather icon */}
            <img
              className="mx-auto h-40"
              src={weatherData.current.condition.icon}
              alt=""
            />
            <p className="text-lg font-semibold">
              {weatherData.current.temp_c}
            </p>
            <p className="text-sm capitalize font-semibold">
              {weatherData.current.condition.text}
            </p>

            {/* hourly Forecast  */}
            <HourlyForecast
              hourlyData={weatherData.forecast.forecastday[0].hour}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Weather1;
