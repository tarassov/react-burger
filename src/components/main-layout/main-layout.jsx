import React, { useEffect, useState, useContext } from 'react';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-indredients';
import styles from './main-layout.module.css'
import { cart } from '../../utils/cart'//test cart data
import { order as orderData } from '../../utils/order'//test order data
import { data as testData } from '../../utils/data'//test ingredients data
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { CartContext } from '../../context/app-context';

const URL = 'https://norma.nomoreparties.space/api/';

const getUrl = (endpoint) => `${URL}${endpoint}`

const generateRandomCart = (data) => {
  const cart = []

  if (!data || data.length === 0) return cart;

  const buns = data.filter(ingredient => ingredient.type === 'bun')
  const bunIndex = Math.floor(Math.random() * buns.length)
  cart.push(buns[bunIndex])

  const ingredients = data.filter(ingredient => ingredient.type !== 'bun')
  const ingredientCount = Math.random() * (10 - 4) + 4;
  for (let i = 0; i < ingredientCount; i++) {
    cart.push(ingredients[Math.floor(Math.random() * ingredients.length)])
  }
  return cart;
}

export default function MainLayout() {
  const [ingredients, setIngredients] = useState([])
  const [order, setOrder] = useState({})
  const [selectedIngredient, setSelectedIngredient] = useState()
  const [data, setData] = useState([])
  const [isOpenOrder, setIsOpenOrder] = useState(false)
  const [isOpenIngredient, setIsOpenIngredien] = useState(false)
  const { cartDispatcher } = useContext(CartContext);

  const onAddIngredient = (ingredient) => {
    if (ingredient.type == 'bun' && ingredients.some(i => i.type == 'bun')) {
      setIngredients([
        ...ingredients.filter(x => x.type != 'bun'),
        ingredient
      ])
    }
    else {
      setIngredients([
        ...ingredients,
        ingredient
      ])
    }
  }
 
  useEffect(() => {
    //fetching data from server
    window.fetch(getUrl('ingredients'))
      .then(response => {
        if (!response.ok) {
          return Promise.reject(response.status);
        }
        return response.json();
      })
      .then(json => setData(json.data))
      .catch(e => console.log(e))
  }, [])

  useEffect(() => {
    const ingredients = generateRandomCart(data)
    cartDispatcher({ type: "load", ingredients: ingredients })
  }, [data])

  //open OrderDetails as modal
  const onPerformOrder = () => {
    setIsOpenOrder(true)
  }

  const onCloseModalOrder = () => {
    setIsOpenOrder(false)
  }
  //open IngredientDetails as modal
  const onIngredientClick = (ingredient) => {
    setSelectedIngredient(ingredient)
    setIsOpenIngredien(true)
  }

  const onCloseIngredient = () => {
    setIsOpenIngredien(false)
  }



  return (
    <main className={styles.layout}>
      {data && <BurgerIngredients data={data} onAddIngredient={onAddIngredient} onIngredientClick={onIngredientClick} />}
      <BurgerConstructor onPerformOrderClick={onPerformOrder} />

      {isOpenOrder && <Modal onClose={onCloseModalOrder}>
        <OrderDetails order={order} />
      </Modal>}

      {isOpenIngredient && <Modal onClose={onCloseIngredient}>
        <IngredientDetails ingredient={selectedIngredient} />
      </Modal>}
    </main>
  )
}