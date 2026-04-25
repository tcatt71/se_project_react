import ModalWithForm from "../ModalWithForm/ModalWithForm";

import { useForm } from "../../hooks/useForm";

import "./../Form/Form.css";
import { useEffect } from "react";

function AddItemModal({ isOpen, onAddItem, onClose, isLoading }) {
  const { values, handleChange, handleReset } = useForm({
    name: "",
    imageUrl: "",
    weather: "",
  });

  useEffect(() => {
    if (isOpen) handleReset();
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onAddItem(values);
  }

  return (
    <ModalWithForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      title={"New garment"}
      buttonText={isLoading ? "Saving..." : "Add garment"}
      name={"add-garment"}
    >
      <label className="form__label form__label_block" htmlFor="name">
        Name
      </label>
      <input
        className="form__input"
        type="text"
        id="name"
        name="name"
        value={values.name}
        placeholder="Name"
        onChange={handleChange}
      />
      <label className="form__label form__label_block" htmlFor="image">
        Image
      </label>
      <input
        className="form__input"
        type="url"
        id="image"
        name="imageUrl"
        value={values.imageUrl}
        placeholder="Image URL"
        onChange={handleChange}
      />
      <fieldset className="form__fieldset">
        <legend className="form__legend">Select the weather type:</legend>
        <div className="form__field">
          <input
            className="form__radio-button"
            type="radio"
            id="hot"
            name="weather"
            checked={values.weather === "hot"}
            value="hot"
            onChange={handleChange}
          />
          <label htmlFor="hot" className="form__label form__label_gray">
            Hot
          </label>
        </div>
        <div className="form__field">
          <input
            className="form__radio-button"
            type="radio"
            id="warm"
            name="weather"
            checked={values.weather === "warm"}
            value="warm"
            onChange={handleChange}
          />
          <label htmlFor="warm" className="form__label form__label_gray">
            Warm
          </label>
        </div>
        <div className="form__field">
          <input
            className="form__radio-button"
            type="radio"
            id="cold"
            name="weather"
            checked={values.weather === "cold"}
            value="cold"
            onChange={handleChange}
          />
          <label htmlFor="cold" className="form__label form__label_gray">
            Cold
          </label>
        </div>
      </fieldset>
    </ModalWithForm>
  );
}

export default AddItemModal;
