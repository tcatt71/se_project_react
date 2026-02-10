import avatar from "./../../assets/avatar.png";

import "./SideBar.css";

function SideBar() {
  return (
    <div className="side-bar">
      <div className="side-bar__container">
        <img className="side-bar__avatar" src={avatar} alt="User" />
        <span className="side-bar__user-name">Terrence Tegegne</span>
      </div>
    </div>
  );
}

export default SideBar;
