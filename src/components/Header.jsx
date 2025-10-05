import logo from "./../assets/logo.svg";
import avatar from "./../assets/avatar.png";

const currentDate = new Date().toLocaleString("default", {
  month: "long",
  day: "numeric",
});

function handleButtonClick() {}

function Header() {
  return (
    <header className="header">
      <div className="header__container">
        <img className="header__logo" src={logo} alt="Logo" />
        <span className="header__date-location">{currentDate}, Renton</span>
      </div>
      <div className="header__container">
        <button className="header__button" onClick={handleButtonClick}>
          + Add clothes
        </button>
        <span className="header__user-name">Terrence Tegegne</span>
        <img className="header__avatar" src={avatar} alt="User" />
      </div>
    </header>
  );
}

export default Header;
