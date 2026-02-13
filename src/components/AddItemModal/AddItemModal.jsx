import ModalWithForm from "../ModalWithForm/ModalWithForm";

import { useForm } from "../../hooks/useForm";

import "./../Form/Form.css";

function AddItemModal({ isOpen, onAddItem, onClose, onSubmit }) {
  const { values, handleChange } = useForm({
    item: "",
    url: "",
    weather: "",
  });

  return (
    <ModalWithForm
      isOpen={isOpen}
      onAddItem={onAddItem}
      onClose={onClose}
      onSubmit={onSubmit}
      // onReset={handleReset}
      title={"New garment"}
      buttonText={"Add garment"}
      name={"add-garment"}
    >
      <label className="form__label form__label_block" htmlFor="name">
        Name
      </label>
      <input
        className="form__input"
        type="text"
        id="name"
        name="item"
        value={values.item}
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
        name="url"
        value={values.url}
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
