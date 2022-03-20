import React, {useRef} from 'react';
import PropTypes from 'prop-types';
import {ingredientPropTypes} from '../../utils/prop-types'
import {ConstructorElement,DragIcon,CurrencyIcon,Button} from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './burger-constructor.module.css' 
import Price from '../price/price';



export default function BurgerConstructor({cart}){

    const bun = cart.find(x=>x.type=='bun')
    
    return(
        <section className={`pl-4 ml-5 mt-25 ${styles.container}`}>
            <div classname={`${styles.cart}`}>
                <div className={`${styles.elements}`}>
                {bun && 
                <div className = {`pl-8 ${styles.bun}`}>
                    <ConstructorElement
                        type="top"
                        isLocked={true}
                        text={bun.name}
                        price={bun.price}
                        thumbnail={bun.image_mobile}                    
                    />
                 </div>   
                }
                <div className={styles.list}>
                {cart.map((ingredient,index) => {
                    if (ingredient.type !='bun'){
                    return(     
                        <div>           
                        <DragIcon type="primary"/>   
                        <div className={`pl-1 ${styles.ingredient}`}>        
                            <ConstructorElement
                                key = {index}
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
                            text={bun.name}
                            price={bun.price}
                            thumbnail={bun.image_mobile}
                        />
                    </div>   
                }
                </div> 
            </div>    
            <div className={`mt-10 ${styles.total}`}>
                <div className={`mr-10 ${styles.price}`}><Price price={100} large/></div>
                <Button type="primary" size="large">Оформить заказ</Button>
             </div>            
        </section>    
    )
}

BurgerConstructor.propTypes = {
    cart: PropTypes.arrayOf(ingredientPropTypes.isRequired),
};