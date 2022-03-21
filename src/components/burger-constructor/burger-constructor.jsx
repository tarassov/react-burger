import React, {useEffect, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import {ingredientPropTypes} from '../../utils/prop-types'
import {ConstructorElement,DragIcon,CurrencyIcon,Button} from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './burger-constructor.module.css' 
import Price from '../price/price';



export default function BurgerConstructor({cart}){
    const [bun, setBun] = useState()
    const [total, setTotal] = useState(0)

    useEffect(() => {   
        setBun(cart.find(x=>x.type=='bun'))
    }, [cart])

    useEffect(() => {   
        setTotal(cart.reduce( (prev,curr)=>prev+curr.price, 0))
    }, [cart])

    
    return(
        <section className={`pl-4 ml-5 mt-25 ${styles.container}`}>
            <div className={`${styles.cart}`}>
                <div className={`${styles.elements}`}>
                {bun && 
                <div className = {`pl-8 ${styles.bun}`}>
                    <ConstructorElement
                        type="top"
                        isLocked={true}
                        text={bun.name + " (верх)"}
                        price={bun.price}
                        thumbnail={bun.image_mobile}                    
                    />
                 </div>   
                }
                <div className={styles.list}>
                {cart.map((ingredient,index) => {
                    if (ingredient.type !='bun'){
                    return(     
                        <div key = {index}>           
                        <DragIcon type="primary"/>   
                        <div className={`pl-1 ${styles.ingredient}`}>        
                            <ConstructorElement                              
                                isLocked={false}
                                text={ingredient.name}
                                price={ingredient.price}
                                thumbnail={ingredient.image_mobile}
                            />
                         </div>   
                    </div>
                    ) 
                    }
                })             
                }
                </div>
                {bun && 
                    <div className = {"pl-8"}>
                        <ConstructorElement
                            type="bottom"
                            isLocked={true}
                            text={bun.name+ " (низ)"}
                            price={bun.price}
                            thumbnail={bun.image_mobile}
                        />
                    </div>   
                }
                </div> 
            </div>    
            <div className={`mt-10 ${styles.total}`}>
                <div className={`mr-10 ${styles.price}`}><Price price={total} large/></div>
                <Button type="primary" size="large">Оформить заказ</Button>
             </div>            
        </section>    
    )
}

BurgerConstructor.propTypes = {
    cart: PropTypes.arrayOf(ingredientPropTypes.isRequired).isRequired,
};