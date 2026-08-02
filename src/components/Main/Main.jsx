import { useContext } from "react";

import WeatherCard from "./../WeatherCard/WeatherCard";
import ItemCard from "./../ItemCard/ItemCard";

import { CurrentTemperatureUnitContext } from "./../../contexts/CurrentTemperatureUnitContext";

import "./Main.css";
import "./../../layout/card-container.css";

function Main({
  temperature,
  clothingItems,
  condition,
  onCardClick,
  onCardLike,
}) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  return (
    <main className="app__main">
      <WeatherCard temperature={temperature} clothingItems={clothingItems} />
      {typeof temperature[currentTemperatureUnit] === "number" && (
        <p className="main__prompt">
          Today is {Math.trunc(temperature[currentTemperatureUnit])}&deg;{" "}
          {currentTemperatureUnit} / You may want to wear:
        </p>
      )}
      <ul className="card-container main__card-container">
        {condition &&
          clothingItems
            .filter((item) => item.weather === condition)
            .map((item) => (
              <li className="main__list-item" key={item._id}>
                <ItemCard
                  owner={item.owner}
                  itemId={item._id}
                  name={item.name}
                  link={item.imageUrl}
                  weather={item.weather}
                  likes={item.likes}
                  onCardClick={onCardClick}
                  onCardLike={onCardLike}
                />
              </li>
            ))}
      </ul>
    </main>
  );
}

export default Main;
