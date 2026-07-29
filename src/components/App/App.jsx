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
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

import { CurrentTemperatureUnitContext } from "./../../contexts/CurrentTemperatureUnitContext";
import CurrentUserContext from "./../../contexts/CurrentUserContext";

import {
  fetchData,
  cleanWeatherData,
  getWeatherCondition,
} from "../../utils/weatherApi";
import { getGeolocation } from "../../utils/geolocation";
import { getItems, addItem, deleteItem } from "../../utils/api";
import { register, authorize, checkToken } from "../../utils/auth";

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
    _id: "",
  });

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");

    if (!jwt) {
      return;
    }

    getItems(jwt)
      .then((data) => setClothingItems(data))
      .catch((err) => console.error(err.message));
  }, []);

  useEffect(() => {
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
    const jwt = localStorage.getItem("jwt");

    if (!jwt) {
      return;
    }

    checkToken(jwt)
      .then(({ name, avatar, email, _id }) => {
        setIsLoggedIn(true);
        setCurrentUser({ name, avatar, email, _id });
      })
      .catch((err) => {
        console.error(err.message);
        localStorage.removeItem("jwt");
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
    const jwt = localStorage.getItem("jwt");

    addItem(newClothing, jwt)
      .then((item) => {
        setClothingItems([item, ...clothingItems]);
        handleCloseModal();
      })
      .catch((err) => console.error(err.message))
      .finally(() => setIsLoading(false));
  }

  function handleRegister() {
    setActiveModal("register");
  }

  function handleRegisterSubmit({ name, avatar, email, password }) {
    setIsLoading(true);
    register({ name, avatar, email, password })
      .then(() => {
        handleLoginSubmit({ email, password });
      })
      .catch((err) => {
        console.error(err.message);
        setIsLoading(false);
        handleCloseModal();
      });
  }

  function handleLogin() {
    setActiveModal("login");
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

          return getItems(res.token)
            .then((data) => {
              setClothingItems(data);
              setIsLoggedIn(true);
            })
            .then(() => checkToken(res.token))
            .then(({ name, avatar, email, _id }) =>
              setCurrentUser({ name, avatar, email, _id }),
            )
            .catch((err) => {
              console.error(err.message);
              localStorage.removeItem("jwt");
            });
        }
      })
      .catch((err) => console.error("Login failed:", err))
      .finally(() => {
        setIsLoading(false);
        handleCloseModal();
      });
  }

  function handleEditProfile() {
    setActiveModal("edit-profile");
  }

  function handleToggleSwitchChange() {
    currentTemperatureUnit === "F"
      ? setCurrentTemperatureUnit("C")
      : setCurrentTemperatureUnit("F");
  }

  function handleDeleteItem(id) {
    setIsLoading(true);
    const jwt = localStorage.getItem("jwt");

    deleteItem(id, jwt)
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
    <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
      <div className="app">
        <CurrentTemperatureUnitContext.Provider
          value={{ currentTemperatureUnit, handleToggleSwitchChange }}
        >
          <div className="app__container">
            <Header
              location={weatherData.location}
              onAddItem={handleAddItem}
              geolocationError={geolocationError}
              isLoggedIn={isLoggedIn}
              onRegister={handleRegister}
              onLogin={handleLogin}
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
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Profile
                      clothingItems={clothingItems}
                      onCardClick={handleCardClick}
                      onAddItem={handleAddItem}
                      onEditProfile={handleEditProfile}
                    />
                  </ProtectedRoute>
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
          <EditProfileModal
            isOpen={activeModal === "edit-profile"}
            onClose={handleCloseModal}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          ></EditProfileModal>
        </CurrentTemperatureUnitContext.Provider>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
