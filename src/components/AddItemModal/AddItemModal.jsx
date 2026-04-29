import ModalWithForm from "../ModalWithForm/ModalWithForm";

import { useFormWithValidation } from "../../hooks/useFormWithValidation";

import "./../Form/Form.css";
import { useEffect, useState } from "react";

function AddItemModal({ isOpen, onAddItem, onClose, isLoading }) {
  const [touched, setTouched] = useState({});
  const { values, handleChange, handleReset, errors, isValid } =
    useFormWithValidation({
      name: "",
      imageUrl: "",
      weather: "",
    });

  useEffect(() => {
    if (isOpen) {
      handleReset();
      setTouched({});
    }
  }, [isOpen, handleReset]);

  // Reset form state when modal closes to clear any lingering error display
  useEffect(() => {
    if (!isOpen) {
      handleReset();
      setTouched({});
    }
  }, [isOpen, handleReset]);

  function handleSubmit(e) {
    e.preventDefault();
    if (isValid) {
      onAddItem(values);
      handleReset();
    }
  }

  function handleBlur(e) {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  }

  return (
    <ModalWithForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      title={"New garment"}
      buttonText={isLoading ? "Saving..." : "Add garment"}
      name={"add-garment"}
      isValid={isValid}
    >
      <label className="form__label form__label_block" htmlFor="name">
        Name
      </label>
      <input
        className={`form__input ${touched.name && errors.name ? "form__input_invalid" : ""}`}
        type="text"
        id="name"
        name="name"
        value={values.name}
        placeholder="Name"
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <span
        className={`form__error ${touched.name && errors.name ? "form__error_visible" : "form__error_hidden"}`}
      >
        {errors.name || ""}
      </span>
      <label className="form__label form__label_block" htmlFor="image">
        Image
      </label>
      <input
        className={`form__input ${touched.imageUrl && errors.imageUrl ? "form__input_invalid" : ""}`}
        type="text"
        id="image"
        name="imageUrl"
        value={values.imageUrl}
        placeholder="Image URL"
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <span
        className={`form__error ${touched.imageUrl && errors.imageUrl ? "form__error_visible" : "form__error_hidden"}`}
      >
        {errors.imageUrl || ""}
      </span>
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
            onBlur={handleBlur}
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
            onBlur={handleBlur}
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
            onBlur={handleBlur}
          />
          <label htmlFor="cold" className="form__label form__label_gray">
            Cold
          </label>
        </div>
        <span
          className={`form__error ${touched.weather && errors.weather ? "form__error_visible" : "form__error_hidden"}`}
        >
          {errors.weather || ""}
        </span>
      </fieldset>
    </ModalWithForm>
  );
}

export default AddItemModal;
