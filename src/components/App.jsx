import AppContainer from "./AppContainer";
import Header from "./Header";
import Main from "./Main";
import WeatherCard from "./WeatherCard";
import Footer from "./Footer";

function App() {
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
