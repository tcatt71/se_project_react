import AppContainer from "./AppContainer";
import Header from "./Header";
import Main from "./Main";
import WeatherCard from "./WeatherCard";
import Footer from "./Footer";
import * as weatherApi from "../utils/weatherApi";
import { useEffect, useState } from "react";

function App() {
  const [location, setLocation] = useState("");

  useEffect(() => {
    weatherApi
      .fetchData()
      .then((res) => res.json())
      .then((data) => {
        setLocation(data.name);
      });
  }, []);

  return (
    <div className="app">
      <AppContainer>
        <Header location={location} />
        <Main>
          <WeatherCard />
        </Main>
        <Footer />
      </AppContainer>
    </div>
  );
}

export default App;
