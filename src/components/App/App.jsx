import { useEffect, useState } from "react";

import { Routes, Route } from "react-router-dom";

import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ItemModal from "../ItemModal/ItemModal";
import Profile from "../Profile/Profile";
import AddItemModal from "../AddItemModal/AddItemModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";

import { CurrentTemperatureUnitContext } from "./../../contexts/CurrentTemperatureUnitContext";

import {
  fetchData,
  cleanWeatherData,
  getWeatherCondition,
} from "../../utils/weatherApi";
import { getGeolocation } from "../../utils/geolocation";
import { getItems, addItem, deleteItem } from "../../utils/api";
import { register, authorize } from "../../utils/auth";

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
  const [isLoading, setIsLoading] = useState(false);
  const [geolocationError, setGeolocationError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    name: "",
    avatar: "",
    email: "",
  });

  useEffect(() => {
    getItems()
      .then((data) => setClothingItems(data))
      .catch((err) => console.error(err.message));

    // Get user's geolocation and fetch weather data
    getGeolocation()
      .then(({ latitude, longitude }) => {
        return fetchData(latitude, longitude);
      })
      .then((data) => {
        setWeatherData(cleanWeatherData(data));
      })
      .catch((err) => {
        console.error(err.message);
        setGeolocationError(err.message);
        // Fallback to default coordinates
        fetchData()
          .then((fallbackData) => {
            if (fallbackData) {
              setWeatherData(cleanWeatherData(fallbackData));
            }
          })
          .catch((err) => {
            console.error(err.message);
          });
      });
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
    setIsLoading(true);
    addItem(newClothing)
      .then((item) => {
        setClothingItems([item, ...clothingItems]);
        handleCloseModal();
      })
      .catch((err) => console.error(err.message))
      .finally(() => setIsLoading(false));
  }

  function handleRegisterSubmit({ name, avatar, email, password }) {
    setIsLoading(true);
    register({ name, avatar, email, password })
      .then(() => {
        handleLoginSubmit({ email, password });
      })
      .catch((err) => console.error(err.message));
  }

  function handleLoginSubmit({ email, password }) {
    if (!email || !password) {
      return;
    }

    setIsLoading(true);

    authorize({ email, password })
      .then((res) => {
        if (res.token) {
          localStorage.setItem("jwt", res.token);
          setCurrentUser(res.user);
          setIsLoggedIn(true);
          handleCloseModal();
        }
      })
      .catch((err) => console.error("Login failed:", err))
      .finally(() => setIsLoading(false));
  }

  function handleToggleSwitchChange() {
    currentTemperatureUnit === "F"
      ? setCurrentTemperatureUnit("C")
      : setCurrentTemperatureUnit("F");
  }

  function handleDeleteItem(id) {
    setIsLoading(true);
    deleteItem(id)
      .then(() => {
        const newClothingItems = clothingItems.filter(
          (item) => item._id !== id,
        );
        setClothingItems(newClothingItems);
        handleCloseModal();
      })
      .catch((err) => console.error(err.message))
      .finally(() => setIsLoading(false));
  }

  const condition = getWeatherCondition(weatherData.temperature.F);

  return (
    <div className="app">
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <div className="app__container">
          <Header
            location={weatherData.location}
            onAddItem={handleAddItem}
            geolocationError={geolocationError}
          />
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
          isLoading={isLoading}
        ></ItemModal>
        <AddItemModal
          isOpen={activeModal === "add-garment"}
          onClose={handleCloseModal}
          onAddItem={handleAddItemSubmit}
          isLoading={isLoading}
        />
        <RegisterModal
          isOpen={activeModal === "register"}
          onClose={handleCloseModal}
          onRegisterSubmit={handleRegisterSubmit}
          isLoading={isLoading}
        ></RegisterModal>
        <LoginModal
          isOpen={activeModal === "login"}
          onClose={handleCloseModal}
          onLoginSubmit={handleLoginSubmit}
          isLoading={isLoading}
        ></LoginModal>
      </CurrentTemperatureUnitContext.Provider>
    </div>
  );
}

export default App;
