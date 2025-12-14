import "./ToggleSwitch.css";

function ToggleSwitch() {
  return (
    <label className="switch">
      <input className="switch__check-box" type="checkbox" />
      <div className="switch__slider"></div>
      <div className="switch__unit switch__F-text">F</div>
      <div className="switch__unit switch__C-text">C</div>
    </label>
  );
}

export default ToggleSwitch;
