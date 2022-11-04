import React, { useState, useContext } from 'react';

import Modal from '../UI/Modal';
import CartItem from './CartItem';
import UserForm from './UserForm';
import classes from './Cart.module.css';
import CartContext from '../../store/cart-context';

const Cart = (props) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const cartCtx = useContext(CartContext);

  const totalAmount = `${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map(item => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  let meals = [];
  for (let meal of cartCtx.items) {
    meals.push({
      name: meal.name,
      amount: meal.amount
    })
  }
  
  const order = {
    client: 'Some client',
    address: 'Some Address',
    meals,
    totalAmount: cartCtx.totalAmount.toFixed(2)
  };

  const hideFormHandler = () => {
    setIsFormOpen(false);
  }

  const orderHandler = () => {  
    setIsFormOpen(true);
  }

  const finishOrderHandler = async (client, address) => {
    setIsSubmitting(true);

    order.client = client;
    order.address = address;

    await fetch('https://react-http-acac5-default-rtdb.firebaseio.com/orders.json', {
      method: 'POST',
      body: JSON.stringify(order),
      headers: {
        'Content-Type': 'application.json'
      }
    });

    setIsSubmitting(false);
    setDidSubmit(true);
    setIsFormOpen(false);
    cartCtx.clearCart();
  };

  const cartModalContent = (
    <React.Fragment>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isFormOpen && <UserForm onHideForm={hideFormHandler} onFinishOrder={finishOrderHandler} />}
      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={props.onHideCart}>
          Close
        </button>
        {hasItems && !isFormOpen && <button className={classes.button} onClick={orderHandler}>Order</button>}
      </div>
    </React.Fragment>
  );

  const isSubmittingModalContent = <p>Sending order data...</p>;

  const didSubmitModalContent = (
    <React.Fragment>
      <p>Successfully sent the order!</p>
      <div className={classes.actions}>
        <button className={classes.button} onClick={props.onHideCart}>
          Close
        </button>
      </div>
    </React.Fragment>
  );

  return (
    <Modal onHideCart={props.onHideCart}>
      {!isSubmitting && !didSubmit && cartModalContent}
      {isSubmitting && isSubmittingModalContent}
      {!isSubmitting && didSubmit && didSubmitModalContent}
    </Modal>
  )
};

export default Cart;