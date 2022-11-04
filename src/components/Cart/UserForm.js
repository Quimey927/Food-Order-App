import useInput from '../../hooks/use-input';
import Card from '../UI/Card';
import classes from './UserForm.module.css';

const UserForm = (props) => {
  const {
    value: enteredName,
    valueIsValid: enteredNameIsValid,
    hasError: enteredNameHasError,
    valueChangeHandler: nameChangeHandler,
    valueBlurHandler: nameBlurHandler,
    reset: resetName
  } = useInput((value) => value.trim() !== '');

  const {
    value: enteredAddress,
    valueIsValid: enteredAddressIsValid,
    hasError: enteredAddressHasError,
    valueChangeHandler: addressChangeHandler,
    valueBlurHandler: addressBlurHandler,
    reset: resetAddress
  } = useInput((value) => value.trim() !== '');

  let formIsValid = false;

  if (enteredNameIsValid && enteredAddressIsValid) {
    formIsValid = true;
  }

  const submitHandler = (evt) => {
    evt.preventDefault();

    if (!formIsValid) {
      return;
    }

    props.onFinishOrder(enteredName, enteredAddress);

    resetName();
    resetAddress();
  };

  const nameClasses = enteredNameHasError ? 'form-control invalid' : 'form-control';
  const addressClasses = enteredAddressHasError ? 'form-control invalid' : 'form-control';

  return (
    <Card>
      <form className={classes["form-control"]} onSubmit={submitHandler}>
        <div className={nameClasses}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            onChange={nameChangeHandler}
            onBlur={nameBlurHandler}
            value={enteredName}
          />
          {enteredNameHasError && <p className={classes["error-text"]}>Please enter a name.</p>}
        </div>
        <div className={addressClasses}>
          <label htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            onChange={addressChangeHandler}
            onBlur={addressBlurHandler}
            value={enteredAddress}
          />
          {enteredAddressHasError && <p className={classes["error-text"]}>Please enter an address.</p>}
        </div>
        <div className={classes["form-actions"]}>
          <button disabled={!formIsValid}>Confirm</button>
        </div>
      </form>
    </Card>
  );
};

export default UserForm