// // import "/src/default.css";
// import "/src/default.css";

// function WeatherData({ currentWeather, weatherForecast }) {
//   return (
//     <div className="weather-data">
//       {currentWeather}
//       <div className="days-forecast">
//         <ul className="weather-cards">
//           {weatherForecast.length > 0 && (
//               <h2 className="h2-data">5-day forecast</h2>
//           )}
//           {weatherForecast}
//         </ul>
//       </div>
//     </div>
//   );
// }

import "./WeatherData.css";


function WeatherData({ currentWeather, weatherForecast }) {
  return (
    <div className="weather-data">
      {currentWeather}
      <div className="days-forecast">
        <div className="weather-cards">
          {weatherForecast.map((card, index) => (
            <div className="card" key={index}>
              {card}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default WeatherData;
