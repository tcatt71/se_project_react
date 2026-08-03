import { useEffect, useState } from "react";

import { useFormWithValidation } from "../../hooks/useFormWithValidation";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

import "./../Form/Form.css";

function LoginModal({ isOpen, onLoginSubmit, onClose, isLoading }) {
  const [touched, setTouched] = useState({});
  const { values, handleChange, handleReset, errors, isValid } =
    useFormWithValidation({
      email: "",
      password: "",
    });

  useEffect(() => {
    if (isOpen) {
      handleReset();
      setTouched({});
    }
  }, [isOpen, handleReset]);

  useEffect(() => {
    if (!isOpen) {
      handleReset();
      setTouched({});
    }
  }, [isOpen, handleReset]);

  function handleSubmit(e) {
    e.preventDefault();
    if (isValid) {
      const { email, password } = values;
      onLoginSubmit({ email, password });
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
      title={"Log In"}
      submitButtonText={isLoading ? "Logging in..." : "Log In"}
      orButtonText={"or Sign Up"}
      name={"login"}
      showOrButton={true}
      isValid={isValid}
    >
      <div className="form__input_container">
        <label className="form__label form__label_block" htmlFor="login-email">
          Email
        </label>
        <input
          className={`form__input ${touched.email && errors.email ? "form__input_invalid" : ""}`}
          type="email"
          id="login-email"
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

        <label
          className="form__label form__label_block"
          htmlFor="login-password"
        >
          Password
        </label>
        <input
          className={`form__input ${touched.password && errors.password ? "form__input_invalid" : ""}`}
          type="password"
          id="login-password"
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
      </div>
    </ModalWithForm>
  );
}

export default LoginModal;
