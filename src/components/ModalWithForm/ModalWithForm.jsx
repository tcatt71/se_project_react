import "./ModalWithForm.css";
import "./../Form/Form.css";

function ModalWithForm({
  isOpen,
  onClose,
  title,
  name,
  buttonText,
  children,
  onSubmit,
  isValid = true,
}) {
  return (
    <div
      className={`modal ${isOpen ? "modal_isOpened" : ""} modal_type_${name}`}
    >
      <form
        className="form modal__form"
        name={name}
        onSubmit={(e) => onSubmit(e)}
      >
        <h2 className="form__title">{title}</h2>
        <button
          className="button button_type_close button_color_gray form__button_type_close"
          type="button"
          onClick={onClose}
        >
          &#10005;
        </button>
        {children}
        <button
          className="button button_type_submit"
          type="submit"
          disabled={!isValid}
        >
          {buttonText}
        </button>
      </form>
    </div>
  );
}

export default ModalWithForm;
