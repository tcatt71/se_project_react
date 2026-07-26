import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import "./SideBar.css";

function SideBar() {
  const { currentUser } = useContext(CurrentUserContext);
  const { avatar, name } = currentUser || {};
  const userInitial = name?.trim()?.charAt(0);

  return (
    <div className="side-bar">
      <div className="side-bar__container">
        {avatar ? (
          <img className="side-bar__avatar" src={avatar} alt="User" />
        ) : (
          <div className="side-bar__avatar">{userInitial?.toUpperCase()}</div>
        )}
        <span className="side-bar__user-name">{name}</span>
      </div>
    </div>
  );
}

export default SideBar;
