import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Router from './src/navigation/Router';
import { CartProvider } from './src/context/CartContext';
import { ProductProvider } from './src/context/ProductContext';

export default function App() {
  return (
    <ProductProvider>
      <CartProvider>
        <NavigationContainer>
          <Router />
        </NavigationContainer>
      </CartProvider>
    </ProductProvider>
  );
}
