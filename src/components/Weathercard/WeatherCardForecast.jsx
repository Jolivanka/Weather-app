import React from "react";
import "./WeatherCard.css";

function WeatherCardForecast({ weatherItem, index }) {
  const futureDate = new Date();
  futureDate.setDate(futureDate.getDate() + index + 1);
  const formattedDate = `${futureDate.toLocaleDateString(undefined, {
    weekday: "short",
  })}, ${futureDate.getDate()}`;

  return (
    <div className="forecast-container">
    <div className="card__forecast-weather" key={index}>
      <h2 className>{formattedDate}</h2>
      <div className="temperature-forecast">
          <h4>{(weatherItem.main.temp - 273.15).toFixed(0)}°C</h4>
        </div>
        <div className="icon">
          <img
            src={`http://openweathermap.org/img/w/${weatherItem.weather[0].icon}.png`}
            alt="Weather Icon"
          />
          <h4>{weatherItem.weather[0].description}</h4>
        </div>
        <div>
          <h4>Wind: {weatherItem.wind.speed}m/s</h4>
        </div>
        <div className="humidity">
          <h4>Humidity: {weatherItem.main.humidity}%</h4>
        </div>
      </div>
      </div>
  );
}

export default WeatherCardForecast;

