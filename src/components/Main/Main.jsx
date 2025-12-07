import WeatherCard from "./../WeatherCard/WeatherCard";
import ItemCard from "./../ItemCard/ItemCard";

import "./Main.css";

function Main({ temperature, clothingList, condition, onCardClick }) {
  return (
    <main className="main app-container__main">
      <WeatherCard temperature={temperature} clothingList={clothingList} />
      {typeof temperature === "number" && (
        <p className="main__prompt">
          Today is {Math.trunc(temperature)}&deg; F / You may want to wear:
        </p>
      )}
      <ul className="main__card-container">
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
