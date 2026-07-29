import { useEffect, useState, useContext } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { useFormWithValidation } from "../../hooks/useFormWithValidation";
import { updateProfile } from "../../utils/api";
import "./../Form/Form.css";

function EditProfileModal({ isOpen, onClose, isLoading, setIsLoading }) {
  const [touched, setTouched] = useState({});
  const [profileUpdateError, setProfileUpdateError] = useState(null);
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const { avatar, name } = currentUser || {};
  const { values, handleChange, handleReset, errors, isValid } =
    useFormWithValidation({
      nameUpdate: name,
      avatarUrlUpdate: avatar,
    });

  useEffect(() => {
    if (isOpen) {
      handleReset();
    }
  }, [isOpen, handleReset]);

  // Clears error messages when the form is closed.
  useEffect(() => {
    if (!isOpen) {
      setTouched({});
      if (profileUpdateError) {
        setProfileUpdateError(null);
      }
    }
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    const { nameUpdate, avatarUrlUpdate } = values;
    setIsLoading(true);
    const jwt = localStorage.getItem("jwt");

    updateProfile(
      { name: nameUpdate || undefined, avatar: avatarUrlUpdate || undefined },
      jwt,
    )
      .then((user) => {
        setCurrentUser({ ...user });
        onClose();
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err.message);
        setProfileUpdateError(err.message);
        setIsLoading(false);
      })
      .finally(() => handleReset());
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
      profileUpdateError={profileUpdateError}
    >
      <label className="form__label form__label_block" htmlFor="name">
        Name *
      </label>
      <input
        className={`form__input ${touched.nameUpdate && errors.nameUpdate ? "form__input_invalid" : ""}`}
        type="text"
        id="nameUpdate"
        name="nameUpdate"
        value={values.nameUpdate}
        placeholder="Name"
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <span
        className={`form__error ${touched.nameUpdate && errors.nameUpdate ? "form__error_visible" : "form__error_hidden"}`}
      >
        {errors.nameUpdate || ""}
      </span>
      <label className="form__label form__label_block" htmlFor="image">
        Avatar *
      </label>
      <input
        className={`form__input ${touched.avatarUrlUpdate && errors.avatarUrlUpdate ? "form__input_invalid" : ""}`}
        type="text"
        id="avatarUrlUpdate"
        name="avatarUrlUpdate"
        value={values.avatarUrlUpdate}
        placeholder="Avatar URL"
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <span
        className={`form__error ${touched.avatarUrlUpdate && errors.avatarUrlUpdate ? "form__error_visible" : "form__error_hidden"}`}
      >
        {errors.avatarUrlUpdate || ""}
      </span>
    </ModalWithForm>
  );
}

export default EditProfileModal;
