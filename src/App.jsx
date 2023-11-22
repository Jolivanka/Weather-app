import WeatherCardCurrent from './components/Weathercard/WeatherCardCurrent'
import WeatherCardForecast from "./components/Weathercard/WeatherCardForecast";
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import WeatherInput from "./components/Weatherinput/WeatherInput";
import WeatherData from "./components/Weatherdata/WeatherData";
import { APIkey, APIurl, userLocationApi } from "./components/apis";
import { useState } from "react";
import './default.css'

function App() {
  const [cityInput, setCityInput] = useState("");
  const [currentWeather, setCurrentWeather] = useState(null);
  const [weatherForecast, setWeatherForecast] = useState([]);
  const [showFooter, setShowFooter] = useState(false);

  const getWeatherDetails = (cityName, lat, lon) => {
    const WEATHER_API_URL = `${APIurl}/forecast?lat=${lat}&lon=${lon}&appid=${APIkey}`;
    fetch(WEATHER_API_URL)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Request failed with status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setCurrentWeather(
          <WeatherCardCurrent
            cityName={cityName}
            weatherItem={data.list[0]}
          />
        );

        const forecastCards = data.list
          .slice(1, 6)
          .map((weatherItem, index) => (
            <WeatherCardForecast
              key={index}
              cityName={cityName}
              weatherItem={weatherItem}
              index={index}
            />
          ));
        setWeatherForecast(forecastCards);
      })
      .catch(() => {
        alert("An error occurred while fetching weather forecast.");
      });
  };

  const getCityCoordinates = () => {
    const cityName = cityInput.trim();
    if (!cityName) return;
    const geoCodingApi = `${userLocationApi}/direct?q=${cityName}&limit=5&appid=${APIkey}`;
    setShowFooter(true);

    fetch(geoCodingApi)
      .then((res) => res.json())
      .then((data) => {
        if (!data.length) {
          alert(`No coordinates found for ${cityName}.`);
        } else {
          const { name, lat, lon } = data[0];
          getWeatherDetails(name, lat, lon);
          setCityInput("");
        }
      })
      .catch(() => {
        alert("An error occurred while fetching coordinates.");
      });
  };

  const getUserCoordinates = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const reverseGeocodingUrl = `http://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&appid=${APIkey}`;

        fetch(reverseGeocodingUrl)
          .then((res) => res.json())
          .then((data) => {
            const { name } = data[0];
            getWeatherDetails(name, latitude, longitude);
            setShowFooter(true);
          })
          .catch(() => {
            alert("An error occurred while fetching city coordinates.");
          });
      },
      (error) => {
        if (error.code === error.PERMISSION_DENIED) {
          alert("Request denied. Please provide location permission.");
        }
      }
    );
  };

  const handleSearch = (e) => {
    if (e.key === "Enter" && cityInput) {
      getCityCoordinates(cityInput);
    }
  };

  return (
    <>
      <Header />
      <div className="container">
        <WeatherInput
          onSearch={() => getCityCoordinates(cityInput)}
          onLocationClick={getUserCoordinates}
          cityInput={cityInput}
          onInputChange={(e) => setCityInput(e.target.value)}
          onKeyUp={handleSearch}
        />
        <WeatherData
          currentWeather={currentWeather}
          weatherForecast={weatherForecast}
        />
      </div>
      {showFooter && <Footer />}
    </>
  );
}

export default App;
