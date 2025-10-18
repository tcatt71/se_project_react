import AppContainer from "./AppContainer";
import Header from "./Header";
import Main from "./Main";
import WeatherCard from "./WeatherCard";
import Footer from "./Footer";
import * as weatherApi from "../utils/weatherApi";
import { useEffect, useState } from "react";

function App() {
  const [location, setLocation] = useState("");
  const [temperature, setTemperature] = useState(0);

  useEffect(() => {
    weatherApi
      .fetchData()
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setLocation(data.name);
        setTemperature(data.main.temp);
      });
  }, []);

  return (
    <div className="app">
      <AppContainer>
        <Header location={location} />
        <Main>
          <WeatherCard temperature={temperature} />
        </Main>
        <Footer />
      </AppContainer>
    </div>
  );
}

export default App;
