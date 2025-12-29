import { useContext } from "react";
import { CurrentTemperatureUnitContext } from "./../../contexts/CurrentTemperatureUnitContext";

import "./WeatherCard.css";

function WeatherCard({ temperature }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  return (
    <div className="weather-card">
      {typeof temperature[currentTemperatureUnit] === "number" && (
        <div className="weather-card__temperature">
          {Math.trunc(temperature[currentTemperatureUnit])}&deg;
          {currentTemperatureUnit}
        </div>
      )}
    </div>
  );
}

export default WeatherCard;
