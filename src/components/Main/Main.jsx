import { useContext } from "react";

import WeatherCard from "./../WeatherCard/WeatherCard";
import ItemCard from "./../ItemCard/ItemCard";

import { CurrentTemperatureUnitContext } from "./../../contexts/CurrentTemperatureUnitContext";

import "./Main.css";
import "./../../layout/card-container.css";

function Main({ temperature, clothingList, condition, onCardClick }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  return (
    <main className="main app-container__main">
      <WeatherCard temperature={temperature} clothingList={clothingList} />
      {typeof temperature[currentTemperatureUnit] === "number" && (
        <p className="main__prompt">
          Today is {Math.trunc(temperature[currentTemperatureUnit])}&deg;{" "}
          {currentTemperatureUnit} / You may want to wear:
        </p>
      )}
      <ul className="card-container">
        {condition &&
          clothingList
            .filter((item) => item.weather === condition)
            .map((item) => (
              <li className="main__list-item" key={item._id}>
                <ItemCard
                  name={item.name}
                  link={item.link}
                  weather={item.weather}
                  onClick={onCardClick}
                />
              </li>
            ))}
      </ul>
    </main>
  );
}

export default Main;
