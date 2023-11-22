import { useEffect, useState } from "react";
import "./WeatherCard.css";


function FooterDate({ formattedDate }) {
  return (
    <div className="footer-date">
      <h4>{formattedDate}</h4>
    </div>
  );
}

function WeatherCardCurrent({ cityName, weatherItem }) {
  const [cityNameFontSize, setCityNameFontSize] = useState("4rem");

  useEffect(() => {
    if (cityName.length <= 10) {
      setCityNameFontSize("5rem");
    } else if (cityName.length <= 15) {
      setCityNameFontSize("4rem");
    } else {
      setCityNameFontSize("3rem");
    }
  }, [cityName]);

  const date = new Date(weatherItem.dt * 1000);
  const formattedDate = `${date.toLocaleDateString(undefined, {
    weekday: "short",
    
  })}, ${date.getDate()}`;
  return (
    <div className="card__current-weather">
      <h2 className='city-name' style={{fontSize :cityNameFontSize}}>{cityName}</h2>
      <div className="weather-info">
        <div>
          <h4 className="temperature">
            {(weatherItem.main.temp - 273.15).toFixed(0)}°C
          </h4>
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
        <div>
          <h4>Humidity: {weatherItem.main.humidity}%</h4>
        </div>
        <FooterDate formattedDate={formattedDate} />
      </div>
    </div>
  );
}

export default WeatherCardCurrent;
