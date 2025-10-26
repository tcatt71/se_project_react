import AppContainer from "./AppContainer";
import Header from "./Header";
import Main from "./Main";
import WeatherCard from "./WeatherCard";
import Footer from "./Footer";
import * as weatherApi from "../utils/weatherApi";
import { useEffect, useState } from "react";
import * as clothingItems from "../utils/clothingItems";
import ItemCard from "./ItemCard";

function App() {
  const [location, setLocation] = useState("");
  const [temperature, setTemperature] = useState(null);
  const [clothingArr, setClothingArr] = useState(
    clothingItems.defaultClothingItems
  );

  useEffect(() => {
    weatherApi
      .fetchData()
      .then((res) => res.json())
      .then((data) => {
        setLocation(data.name);
        setTemperature(data.main.temp);
      });
  }, []);

  return (
    <div className="app">
      <AppContainer>
        <Header location={location} />
        <Main>
          <WeatherCard temperature={temperature} clothingArr={clothingArr} />
          {temperature && (
            <p className="main__prompt">
              Today is {Math.trunc(temperature)}&deg; F / You may want to wear:
            </p>
          )}
          <div className="main__card-container">
            {clothingArr.map((item) => (
              <ItemCard key={item._id} name={item.name} link={item.link} />
            ))}
          </div>
        </Main>
        <Footer />
      </AppContainer>
    </div>
  );
}

export default App;
