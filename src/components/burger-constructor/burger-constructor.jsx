import React, {useRef} from 'react';
import PropTypes from 'prop-types';
import {ingredientPropTypes} from '../../utils/prop-types'
import {ConstructorElement} from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './burger-constructor.module.css' 


export default function BurgerConstructor({cart}){

    const bunRef = useRef(null)
    const sauceRef = useRef(null)
    const mainRef = useRef(null)

    const bun = cart.find(x=>x.type=='bun')
    
    return(
        <section className={`ml-5 ${styles.container}`}>
            <div className={styles.elements}>
            <ConstructorElement
                type="top"
                isLocked={true}
                text={bun.name}
                price={bun.price}
                thumbnail={bun.image_mobile}
            />
            <ConstructorElement
                type="bottom"
                isLocked={true}
                text={bun.name}
                price={bun.price}
                thumbnail={bun.image_mobile}
            />
            </div>            
        </section>    
    )
}

BurgerConstructor.propTypes = {
    cart: PropTypes.arrayOf(ingredientPropTypes.isRequired),
};