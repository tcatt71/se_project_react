import { Link } from "react-router-dom";

import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";

import logo from "./../../assets/logo.svg";
import avatar from "./../../assets/avatar.png";

import "./Header.css";

const currentDate = new Date().toLocaleString("default", {
  month: "long",
  day: "numeric",
});

function Header({ location, onAddItem, onRegister }) {
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
      </div>
      <div className="header__container">
        <ToggleSwitch />
        <button
          className="button button_type_text header__button"
          onClick={onRegister}
        >
          Sign Up
        </button>
        <button
          className="button button_type_text header__button"
          onClick={onAddItem}
        >
          + Add clothes
        </button>
        <Link to="/profile" className="header__link-wrapper">
          <span className="header__user-name">Terrence Tegegne</span>
          <img src={avatar} alt="User" />
        </Link>
      </div>
    </header>
  );
}

export default Header;
