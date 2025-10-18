import AppContainer from "./AppContainer";
import Header from "./Header";
import Main from "./Main";
import WeatherCard from "./WeatherCard";
import Footer from "./Footer";
import * as weatherApi from "../utils/weatherApi";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    weatherApi
      .fetchData()
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  }, []);

  return (
    <div className="app">
      <AppContainer>
        <Header />
        <Main>
          <WeatherCard />
        </Main>
        <Footer />
      </AppContainer>
    </div>
  );
}

export default App;
