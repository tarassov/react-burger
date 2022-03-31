import React, {useReducer} from 'react';
import AppHeader from '../app-header/app-header';
import MainLayout from '../main-layout/main-layout';
import {CartContext } from '../../context/app-context';


const  initialCartState= {cart:[],totalPrice: 0}

export function cartReducer(state, action){
  switch (action.type) {
    case "load":
      return {cart: action.ingredients, totalPrice: action.ingredients.reduce((prev,curr)=>prev+curr.price, 0) };
    case "add":
       return {
          cart: [...state.cart, action.ingredient], 
          totalPrice: state.totalPrice + action.ingredient.price
        }
    case "reset":
      return initialCartState;
    default:
      throw new Error(`Wrong type of action: ${action.type}`);
  }
}

function App() {
  const [cartState, cartDispatcher] = useReducer(cartReducer, initialCartState, undefined);


  return (
    <div style={{overflow: 'hidden'}}>
      <CartContext.Provider value={{cartState, cartDispatcher}}>
          <AppHeader/>
          <MainLayout/>
      </CartContext.Provider>
    </div>
  );
}

export default App;
