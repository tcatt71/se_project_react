import { useContext } from "react";

import "./ToggleSwitch.css";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";

function ToggleSwitch() {
  const { currentTemperatureUnit, handleToggleSwitchChange } = useContext(
    CurrentTemperatureUnitContext
  );

  return (
    <label className="switch">
      <input
        className="switch__check-box"
        type="checkbox"
        onChange={handleToggleSwitchChange}
        checked={currentTemperatureUnit === "F" ? false : true}
      />
      <div className="switch__slider"></div>
      <div className="switch__unit switch__F-text">F</div>
      <div className="switch__unit switch__C-text">C</div>
    </label>
  );
}

export default ToggleSwitch;
