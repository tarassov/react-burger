import React, {useState} from 'react';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-indredients';
import styles from './main-layout.module.css'
import {cart} from '../../utils/cart'//test cart data
import {data} from '../../utils/data'//test ingredients data

export default function MainLayout(props){
    const [ingredients,setIngredients] = useState([])
 
    const onAddIngredient = (ingredient) =>{
        if (ingredient.type=='bun' && ingredients.some(i => i.type =='bun')){
            //if there is a bun already  - remove it first(I suppose)
        }    
        setIngredients([
           ...ingredients, 
           ingredient
         ])
    }

    const onCloseOrder = () =>{

    }

    return(
      <main className={styles.layout}>
        <BurgerIngredients data ={data} onAddIngredient={onAddIngredient}/>
        <BurgerConstructor cart={cart} onCloseOrder={onCloseOrder}/>
      </main>
    )
}