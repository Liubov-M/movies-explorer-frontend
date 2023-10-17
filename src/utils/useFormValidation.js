import { useCallback, useState } from 'react';

export function useFormValidation() {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);
  const [isInputValid, setIsInputValid] = useState({})

  const handleChange = (evt) => {

    const name = evt.target.name
    const value = evt.target.value
    const validationMessage = evt.target.validationMessage
    const validInput = evt.target.validity.valid
    const form = evt.target.form

    setValues({ ...values, [name]: value })
    setErrors({ ...errors, [name]: validationMessage })
    setIsInputValid({ ...isInputValid, [name]: validInput })
    setIsValid(form.checkValidity())
  };

  const resetForm = useCallback(
    (data = {}) => {
      setValues(data);
      setErrors({});
      setIsValid(false);
      setIsInputValid({})
    },
    []
  );

  return { values, errors, isValid, isInputValid, setIsValid, setValues, setErrors, resetForm, handleChange };
}
