import { useState } from 'react';

const useInput = (validateInput) => {
  const [enteredValue, setEnteredValue] = useState('');
  const [isTouched, setIsTouched] = useState(false);

  const enteredValueIsValid = validateInput(enteredValue);
  const hasError = !enteredValueIsValid && isTouched;

  const valueChangeHandler = (evt) => {
    setEnteredValue(evt.target.value);
  };

  const valueBlurHandler = (evt) => {
    setIsTouched(true);
  };

  const reset = () => {
    setEnteredValue('');
    setIsTouched(false);
  }

  return {
    value: enteredValue,
    valueIsValid: enteredValueIsValid,
    hasError,
    valueChangeHandler,
    valueBlurHandler,
    reset
  };
};

export default useInput;