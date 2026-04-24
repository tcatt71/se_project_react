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
import { getItems, addItem, deleteItem } from "../../utils/api";

import "./App.css";
import "./../Button/Button.css";

function App() {
  const [weatherData, setWeatherData] = useState({
    location: "",
    temperature: { C: null, F: null },
  });
  const [clothingItems, setClothingItems] = useState([]);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

  useEffect(() => {
    getItems()
      .then((data) => setClothingItems(data))
      .catch((err) => console.error(err.message));

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
      .catch((err) => console.error(err));
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

  function handleAddItemSubmit(newClothing) {
    addItem(newClothing)
      .then((item) => {
        setClothingItems([item, ...clothingItems]);
      })
      .catch((err) => console.error(err.message));
    handleCloseModal();
  }

  function handleToggleSwitchChange() {
    currentTemperatureUnit === "F"
      ? setCurrentTemperatureUnit("C")
      : setCurrentTemperatureUnit("F");
  }

  function handleDeleteItem(id) {
    deleteItem(id)
      .then(() => {
        const newClothingItems = clothingItems.filter(
          (item) => item._id !== id,
        );
        setClothingItems(newClothingItems);
        handleCloseModal();
      })
      .catch((err) => console.error(err.message));
  }

  const condition = weatherApi.getWeatherCondition(weatherData.temperature.F);

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
                  clothingItems={clothingItems}
                  condition={condition}
                  onCardClick={handleCardClick}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <Profile
                  clothingItems={clothingItems}
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
          onDeleteItem={handleDeleteItem}
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
