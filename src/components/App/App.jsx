import { useEffect, useState } from "react";

import { Routes, Route } from "react-router-dom";

import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ItemModal from "../ItemModal/ItemModal";
import Profile from "../Profile/Profile";
import AddItemModal from "../AddItemModal/AddItemModal";

import { CurrentTemperatureUnitContext } from "./../../contexts/CurrentTemperatureUnitContext";

import * as weatherApi from "../../utils/weatherApi";
import * as clothingItems from "../../utils/clothingItems";

import "./App.css";
import "./../Button/Button.css";

function App() {
  const [weatherData, setWeatherData] = useState({
    location: "",
    temperature: { C: null, F: null },
  });

  const [clothingList, setClothingList] = useState(
    clothingItems.defaultClothingItems,
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

  function handleAddItem() {
    setActiveModal("add-garment");
  }

  function handleCardClick(cardData) {
    setActiveModal("item-card");
    setSelectedCard(cardData);
  }

  function handleCloseModal() {
    setActiveModal("");
  }

  function handleAddItemSubmit(newClothing, resetForm) {
    console.log(newClothing);
    // setClothingList([newClothing, ...clothingList]);
    // console.log(clothingList);
    handleCloseModal();
    resetForm();
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
        <div className="app__container">
          <Header location={weatherData.location} onAddItem={handleAddItem} />
          <Routes>
            <Route
              path="/"
              element={
                <Main
                  temperature={weatherData.temperature}
                  clothingList={clothingList}
                  condition={condition}
                  onCardClick={handleCardClick}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <Profile
                  clothingList={clothingList}
                  onCardClick={handleCardClick}
                  onAddItem={handleAddItem}
                />
              }
            />
          </Routes>
          <Footer />
        </div>
        <ItemModal
          isOpen={activeModal === "item-card"}
          onClose={handleCloseModal}
          selectedCard={selectedCard}
        ></ItemModal>
        <AddItemModal
          isOpen={activeModal === "add-garment"}
          onClose={handleCloseModal}
          onAddItem={handleAddItemSubmit}
        />
      </CurrentTemperatureUnitContext.Provider>
    </div>
  );
}

export default App;
