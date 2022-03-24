import React, {useEffect, useState} from 'react';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-indredients';
import styles from './main-layout.module.css'
import {cart} from '../../utils/cart'//test cart data
import {order as orderData} from '../../utils/order'//test order data
import {data as testData} from '../../utils/data'//test ingredients data
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import IngredientDetails from '../ingredient-details/ingredient-details';

const url = 'https://norma.nomoreparties.space/api/ingredients'

export default function MainLayout(props){
    const [ingredients,setIngredients] = useState([])
    const [order,setOrder] = useState({})
    const [data,setData] = useState([])
    const [isOpenOrder,setIsOpenOrder] = useState(false)
    const [isOpenIngredient,setIsOpenIngredien] = useState(false)
 
    const onAddIngredient = (ingredient) =>{        
        if (ingredient.type=='bun' && ingredients.some(i => i.type =='bun')){
            setIngredients([
              ...ingredients.filter(x=>x.type != 'bun'), 
              ingredient
          ]) 
        } 
        else{   
          setIngredients([
            ...ingredients, 
            ingredient
          ])
       }
    }

    useEffect(()=>{
      //fetching data from server
      window.fetch(url)
        .then(response=> response.json())
        .then(json => setData(json.data))
        .catch(e => console.log(e))
      
        //fetching test data
      setIngredients(cart)
      setOrder(orderData)
    },[])

    //open OrderDetails as modal
    const onPerformOrder = () => {
      setIsOpenOrder(true)
    }

    const onCloseModalOrder = () => {
      setIsOpenOrder(false)
    }
    //open IngredientDetails as modal
    const onIngredientClick = () => {
      setIsOpenIngredien(true)
    }

    const onCloseIngredient = () => {
      setIsOpenIngredien(false)
    }



    return(
      <main className={styles.layout}>
        {data && <BurgerIngredients data ={data} cart={ingredients} onAddIngredient={onAddIngredient} onIngredientClick={onIngredientClick}/>}
        <BurgerConstructor cart={ingredients} onPerformOrderClick={onPerformOrder}/>
        
        <Modal open={isOpenOrder} onClose ={onCloseModalOrder}> 
              <OrderDetails order={order}/>
        </Modal>

        <Modal open={isOpenIngredient} onClose ={onCloseIngredient}> 
               <IngredientDetails/>
        </Modal>
       
       
 
      </main>
    )
}