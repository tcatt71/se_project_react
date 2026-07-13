import { useEffect } from "react";

import { useForm } from "../../hooks/useForm";

import ModalWithForm from "../ModalWithForm/ModalWithForm";

import "./../Form/Form.css";
import "./../RegisterModal/RegisterModal.css";

function RegisterModal({ isOpen, onRegisterSubmit, onClose, isLoading }) {
  const { values, handleChange, handleReset } = useForm({
    email: "",
    password: "",
    name: "",
    avatarUrl: "",
  });

  useEffect(() => {
    if (isOpen) handleReset();
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onRegisterSubmit(values);
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
    >
      <label className="form__label form__label_block" htmlFor="email">
        Email*
      </label>
      <input
        className="form__input"
        type="email"
        id="email"
        name="email"
        value={values.email}
        placeholder="Email"
        onChange={handleChange}
      />
      <label className="form__label form__label_block" htmlFor="password">
        Password*
      </label>
      <input
        className="form__input"
        type="password"
        id="password"
        name="password"
        value={values.password}
        placeholder="Password"
        onChange={handleChange}
      />
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
      <label className="form__label form__label_block" htmlFor="avatarUrl">
        Avatar URL
      </label>
      <input
        className="form__input"
        type="url"
        id="avatarUrl"
        name="avatarUrl"
        value={values.avatarUrl}
        placeholder="Avatar URL"
        onChange={handleChange}
      />
    </ModalWithForm>
  );
}

export default RegisterModal;
