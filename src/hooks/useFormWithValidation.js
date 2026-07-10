import { useState, useCallback } from "react";

// Validation rules configuration - easy to extend or modify
const validationRules = {
  name: {
    required: true,
    minLength: 2,
    message: {
      required: "This field is required",
      minLength: "Name must be at least 2 characters",
    },
  },
  imageUrl: {
    required: true,
    pattern: /^https?:\/\/.+/,
    message: {
      required: "This field is required",
      pattern: "Please enter a valid URL",
    },
  },
  weather: {
    required: true,
    message: {
      required: "Please select a weather type",
    },
  },
};

// Validate a single field value against its rules
function validateFieldValue(name, value, rules) {
  const rule = rules[name];
  if (!rule) return "";

  if (
    rule.required &&
    (!value || (typeof value === "string" && value.trim() === ""))
  ) {
    return rule.message.required || "This field is required";
  }

  if (rule.minLength && value && value.trim().length < rule.minLength) {
    return (
      rule.message.minLength || `Minimum length is ${rule.minLength} characters`
    );
  }

  if (rule.pattern && value && !rule.pattern.test(value)) {
    return rule.message.pattern || "Invalid format";
  }

  return "";
}

// Validate all fields and return errors object and validity
function validateAllFields(values, rules) {
  const errors = {};
  let isValid = true;

  Object.keys(values).forEach((name) => {
    const error = validateFieldValue(name, values[name], rules);
    if (error) {
      errors[name] = error;
      isValid = false;
    }
  });

  return { errors, isValid };
}

export function useFormWithValidation(defaultValues = {}) {
  const [values, setValues] = useState(defaultValues);
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setValues((prev) => {
      const newValues = { ...prev, [name]: value };

      // Validate this field
      const error = validateFieldValue(name, value, validationRules);
      setErrors((prevErrors) => {
        const newErrors = { ...prevErrors };
        if (error) {
          newErrors[name] = error;
        } else {
          delete newErrors[name];
        }
        return newErrors;
      });

      // Validate all fields to update isValid (using functional update to get current state)
      setIsValid(() => {
        const { isValid: allValid } = validateAllFields(
          newValues,
          validationRules,
        );
        return allValid;
      });

      return newValues;
    });
  }

  const setValue = useCallback((name, value) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  }, []);

  const setError = useCallback((name, errorMessage) => {
    setErrors((prev) => ({ ...prev, [name]: errorMessage }));
  }, []);

  const resetValidation = useCallback(() => {
    setErrors({});
    setIsValid(false);
  }, []);

  const handleResetWithCallback = useCallback(() => {
    setValues(defaultValues);
    setErrors({});
    setIsValid(false);
  }, []);

  return {
    values,
    setValues,
    setValue,
    errors,
    isValid,
    setError,
    resetValidation,
    handleChange,
    handleReset: handleResetWithCallback,
  };
}
