import { useEffect, useState, useContext } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { useFormWithValidation } from "../../hooks/useFormWithValidation";
import "./../Form/Form.css";

function EditProfileModal({ isOpen, onEditProfileSubmit, onClose, isLoading }) {
  const [touched, setTouched] = useState({});
  const { currentUser } = useContext(CurrentUserContext);
  const { avatar, name } = currentUser || {};

  const { values, handleChange, handleReset, errors, isValid } =
    useFormWithValidation({
      name: name,
      avatarUrl: avatar,
    });

  useEffect(() => {
    if (isOpen) {
      handleReset();
    }
  }, [isOpen, handleReset]);

  useEffect(() => {
    if (!isOpen) {
      setTouched({});
    }
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    if (isValid) {
      const { name, avatarUrl } = values;
      onEditProfileSubmit({ name, avatar: avatarUrl });
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
      title={"Change profile data"}
      submitButtonText={isLoading ? "Saving..." : "Save changes"}
      name={"edit-profile"}
      isValid={isValid}
    >
      <label className="form__label form__label_block" htmlFor="name">
        Name *
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
        Avatar *
      </label>
      <input
        className={`form__input ${touched.avatarUrl && errors.avatarUrl ? "form__input_invalid" : ""}`}
        type="text"
        id="avatarUrl"
        name="avatarUrl"
        value={values.avatarUrl}
        placeholder="Avatar URL"
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <span
        className={`form__error ${touched.avatarUrl && errors.avatarUrl ? "form__error_visible" : "form__error_hidden"}`}
      >
        {errors.avatarUrl || ""}
      </span>
    </ModalWithForm>
  );
}

export default EditProfileModal;
