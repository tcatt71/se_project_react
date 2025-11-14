import Header from "./Header";
import Main from "./Main";
// import WeatherCard from "./WeatherCard";
import Footer from "./Footer";
import * as weatherApi from "../utils/weatherApi";
import { useEffect, useState } from "react";
import * as clothingItems from "../utils/clothingItems";
// import ItemCard from "./ItemCard";
import ModalWithForm from "./ModalWithForm";
import ItemModal from "./ItemModal";

function App() {
  const [location, setLocation] = useState("");
  const [temperature, setTemperature] = useState(null);
  const [clothingList, setClothingList] = useState(
    clothingItems.defaultClothingItems
  );
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});

  function handleOpenAddGarmentModal() {
    setActiveModal("add-garment");
  }

  function handleCardClick(cardData) {
    setActiveModal("item-card");
    setSelectedCard(cardData);
  }

  function handleCloseModal() {
    setActiveModal("");
  }

  useEffect(() => {
    weatherApi
      .fetchData()
      .then((data) => {
        setLocation(data.name);
        setTemperature(data.main.temp);
      })
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    function handleEscKeyCloseModal(evt) {
      if (evt.key === "Escape") {
        handleCloseModal();
      }
    }

    if (activeModal) {
      document.addEventListener("keyup", handleEscKeyCloseModal);
    }

    return () => document.removeEventListener("keyup", handleEscKeyCloseModal);
  }, [activeModal]);

  const condition = weatherApi.getWeatherCondition(temperature);

  function handleFormSubmit(evt) {
    evt.preventDefault();
    handleCloseModal();
  }

  return (
    <div className="app">
      <div className="app-container app__app-container">
        <Header
          location={location}
          openAddGarmentModal={handleOpenAddGarmentModal}
        />
        <Main
          temperature={temperature}
          clothingList={clothingList}
          condition={condition}
          onCardClick={handleCardClick}
        ></Main>
        <Footer />
      </div>
      <ModalWithForm
        isOpen={activeModal === "add-garment"}
        onClose={handleCloseModal}
        title={"New garment"}
        buttonText={"Add garment"}
        name={"add-garment"}
        formSubmitHandler={handleFormSubmit}
      >
        <label className="form__label form__label_block" htmlFor="name">
          Name
        </label>
        <input
          type="text"
          className="form__input"
          id="name"
          placeholder="Name"
        />
        <label className="form__label form__label_block" htmlFor="image">
          Image
        </label>
        <input
          type="url"
          className="form__input"
          id="image"
          placeholder="Image URL"
        />
        <fieldset className="form__fieldset">
          <legend className="form__legend">Select the weather type:</legend>
          <div className="form__field">
            <input
              type="radio"
              className="form__radio-button"
              name="temp-range"
              id="hot"
            />
            <label htmlFor="hot" className="form__label form__label_gray">
              Hot
            </label>
          </div>
          <div className="form__field">
            <input
              type="radio"
              className="form__radio-button"
              name="temp-range"
              id="warm"
            />
            <label htmlFor="warm" className="form__label form__label_gray">
              Warm
            </label>
          </div>
          <div className="form__field">
            <input
              type="radio"
              className="form__radio-button"
              name="temp-range"
              id="cold"
            />
            <label htmlFor="cold" className="form__label form__label_gray">
              Cold
            </label>
          </div>
        </fieldset>
      </ModalWithForm>
      <ItemModal
        isOpen={activeModal === "item-card"}
        onClose={handleCloseModal}
        selectedCard={selectedCard}
      ></ItemModal>
    </div>
  );
}

export default App;
