
import "./WeatherInput.css";

function WeatherInput({onSearch, onLocationClick, cityInput,onInputChange, onKeyUp }) {

    return (
        <div className="weather-input">
        <h3>Enter a city:</h3>
        <input
          type="text"
          className="city-input"
          placeholder="Input city"
          value={cityInput}
          onChange={onInputChange}
          onKeyUp={onKeyUp}
        />
        <button className="search-btn" onClick={onSearch}>
          Search
        </button>
        <div className="separator"></div>
        <button className="location-btn" onClick={onLocationClick}>
          Use current location
        </button>
      </div>
    )
}

export default WeatherInput;