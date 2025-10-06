import AppContainer from "./AppContainer";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";

function App() {
  return (
    <div className="app">
      <AppContainer>
        <Header />
        <Main />
        <Footer />
      </AppContainer>
    </div>
  );
}

export default App;
