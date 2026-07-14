import { useEffect, useState } from "react";

import { useFormWithValidation } from "../../hooks/useFormWithValidation";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

import "./../Form/Form.css";
import "./../RegisterModal/RegisterModal.css";

function RegisterModal({ isOpen, onRegisterSubmit, onClose, isLoading }) {
  const [touched, setTouched] = useState({});
  const { values, handleChange, handleReset, errors, isValid } =
    useFormWithValidation({
      email: "",
      password: "",
      name: "",
      avatarUrl: "",
    });

  useEffect(() => {
    if (isOpen) {
      handleReset();
      setTouched({});
    }
  }, [isOpen, handleReset]);

  function handleSubmit(e) {
    e.preventDefault();
    if (isValid) {
      onRegisterSubmit(values);
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
      title={"Sign up"}
      submitButtonText={isLoading ? "Saving..." : "Next"}
      orButtonText={"or Log In"}
      name={"register"}
      showOrButton={true}
      isValid={isValid}
    >
      <label className="form__label form__label_block" htmlFor="email">
        Email*
      </label>
      <input
        className={`form__input ${touched.email && errors.email ? "form__input_invalid" : ""}`}
        type="email"
        id="email"
        name="email"
        value={values.email}
        placeholder="Email"
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <span
        className={`form__error ${touched.email && errors.email ? "form__error_visible" : "form__error_hidden"}`}
      >
        {errors.email || ""}
      </span>

      <label className="form__label form__label_block" htmlFor="password">
        Password*
      </label>
      <input
        className={`form__input ${touched.password && errors.password ? "form__input_invalid" : ""}`}
        type="password"
        id="password"
        name="password"
        value={values.password}
        placeholder="Password"
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <span
        className={`form__error ${touched.password && errors.password ? "form__error_visible" : "form__error_hidden"}`}
      >
        {errors.password || ""}
      </span>

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

      <label className="form__label form__label_block" htmlFor="avatarUrl">
        Avatar URL
      </label>
      <input
        className={`form__input ${touched.avatarUrl && errors.avatarUrl ? "form__input_invalid" : ""}`}
        type="url"
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

export default RegisterModal;
