import AppContainer from "./AppContainer";
import Header from "./Header";
import Main from "./Main";

function App() {
  return (
    <div className="app">
      <AppContainer>
        <Header />
        <Main />
      </AppContainer>
    </div>
  );
}

export default App;
