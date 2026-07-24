import { useContext } from "react";

import { Link } from "react-router-dom";

import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";

import CurrentUserContext from "../../contexts/CurrentUserContext";

import logo from "./../../assets/logo.svg";

import "./Header.css";

const currentDate = new Date().toLocaleString("default", {
  month: "long",
  day: "numeric",
});

function Header({
  location,
  onAddItem,
  geolocationError,
  isLoggedIn,
  onRegister,
  onLogin,
}) {
  const { currentUser } = useContext(CurrentUserContext);

  const userInitial = currentUser?.name.trim().charAt(0);

  return (
    <header className="header app__header">
      <div className="header__container">
        <h1 className="header__title">What To Wear App</h1>
        <Link to="/">
          <img className="header__logo" src={logo} alt="Logo" />
        </Link>
        <span className="header__date-location">
          {currentDate}, {location}
        </span>
        {geolocationError && (
          <span className="header__error">{geolocationError}</span>
        )}
      </div>
      <div className="header__container">
        <ToggleSwitch />
        {!isLoggedIn && (
          <>
            <button
              className="button button_type_text header__button"
              onClick={onRegister}
            >
              Sign Up
            </button>
            <button
              className="button button_type_text header__button"
              onClick={onLogin}
            >
              Log In
            </button>
          </>
        )}
        {isLoggedIn && (
          <>
            <button
              className="button button_type_text header__button"
              onClick={onAddItem}
            >
              + Add clothes
            </button>
            <Link to="/profile" className="header__link-wrapper">
              <span className="header__user-name">{name}</span>
              {currentUser.avatar ? (
                <div className="header__avatar-container">
                  <img
                    className="header__avatar"
                    src={currentUser.avatar}
                    alt="user avatar"
                  />
                </div>
              ) : (
                <div className="header__avatar-container">
                  {userInitial.toUpperCase()}
                </div>
              )}
            </Link>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
