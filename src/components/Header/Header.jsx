import logo from "./../../assets/logo.svg";
import avatar from "./../../assets/avatar.png";

import "./Header.css";

const currentDate = new Date().toLocaleString("default", {
  month: "long",
  day: "numeric",
});

function Header({ location, openAddGarmentModal }) {
  return (
    <header className="header app-container__header">
      <div className="header__container">
        <img className="header__logo" src={logo} alt="Logo" />
        <span className="header__date-location">
          {currentDate}, {location}
        </span>
      </div>
      <div className="header__container">
        <button
          className="button button_type_text"
          onClick={openAddGarmentModal}
        >
          + Add clothes
        </button>
        <span className="header__user-name">Terrence Tegegne</span>
        <img className="header__avatar" src={avatar} alt="User" />
      </div>
    </header>
  );
}

export default Header;
