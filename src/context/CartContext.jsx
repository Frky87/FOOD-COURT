import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addItemToCart = (newItem) => {
    setCartItems((prevItems) => {
      const existingIndex = prevItems.findIndex(item => item.productName === newItem.productName);
      if (existingIndex !== -1) {
        const newCart = [...prevItems];
        newCart[existingIndex].quantity += newItem.quantity;
        return newCart;
      }
      return [...prevItems, newItem];
    });
  };

  const removeItemFromCart = (index) => {
    setCartItems(prevItems => prevItems.filter((_, i) => i !== index));
  };

  const updateQuantity = (index, type) => {
    setCartItems((prevItems) => {
      const newCart = [...prevItems];
      if (type === 'increase') {
        newCart[index].quantity += 1;
      } else if (type === 'decrease') {
        if (newCart[index].quantity === 1) {
          newCart.splice(index, 1);
        } else {
          newCart[index].quantity -= 1;
        }
      }
      return newCart;
    });
  };

  return (
    <CartContext.Provider value={{ cartItems, addItemToCart, removeItemFromCart, updateQuantity }}>
      {children}
    </CartContext.Provider>
  );
};
