import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import "./SideBar.css";

function SideBar({ onEditProfile, onLogout }) {
  const { currentUser } = useContext(CurrentUserContext);
  const { avatar, name } = currentUser || {};
  const userInitial = name?.trim()?.charAt(0);

  return (
    <div className="side-bar">
      <div className="side-bar__header">
        {avatar ? (
          <img className="side-bar__avatar" src={avatar} alt="User" />
        ) : (
          <div className="side-bar__avatar">{userInitial?.toUpperCase()}</div>
        )}
        <span className="side-bar__user-name">{name}</span>
      </div>
      <div className="side-bar__buttons-container">
        <button
          className="button button_type_profile"
          type="button"
          onClick={onEditProfile}
        >
          Change profile data
        </button>
        <button
          className="button button_type_profile"
          type="button"
          onClick={onLogout}
        >
          Log out
        </button>
      </div>
    </div>
  );
}

export default SideBar;
