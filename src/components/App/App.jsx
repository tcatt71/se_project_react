import { useEffect, useState } from "react";
import { CurrentTemperatureUnitContext } from "./../../contexts/CurrentTemperatureUnitContext";

import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";

import * as weatherApi from "../../utils/weatherApi";
import * as clothingItems from "../../utils/clothingItems";

import "./App.css";
import "./app-container.css";
import "./../Form/Form.css";
import "./../Button/Button.css";

function App() {
  const [weatherData, setWeatherData] = useState({
    location: "",
    temperature: { C: null, F: null },
  });

  const [clothingList, setClothingList] = useState(
    clothingItems.defaultClothingItems
  );
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

  useEffect(() => {
    weatherApi
      .fetchData()
      .then((data) => {
        setWeatherData({
          location: data.name,
          temperature: {
            F: data.main.temp,
            C: Math.round(((data.main.temp - 32) * 5) / 9),
          },
        });
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

  function handleFormSubmit(evt) {
    evt.preventDefault();
    handleCloseModal();
  }

  function handleToggleSwitchChange() {
    currentTemperatureUnit === "F"
      ? setCurrentTemperatureUnit("C")
      : setCurrentTemperatureUnit("F");
  }

  const condition = weatherApi.getWeatherCondition(weatherData.temperature);

  return (
    <div className="app">
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <div className="app-container app__app-container">
          <Header
            location={weatherData.location}
            openAddGarmentModal={handleOpenAddGarmentModal}
          />
          <Main
            temperature={weatherData.temperature}
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
      </CurrentTemperatureUnitContext.Provider>
    </div>
  );
}

export default App;
