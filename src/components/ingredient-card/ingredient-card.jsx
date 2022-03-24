import PropTypes from 'prop-types'
import {ingredientPropTypes} from '../../utils/prop-types'
import styles from './ingredient-card.module.css'
import {CurrencyIcon,Counter} from '@ya.praktikum/react-developer-burger-ui-components'
import Price from '../price/price'

export default function IngredientCard({ingredient,count, onIngredientClick}){

    const onClick =() =>{
        onIngredientClick(ingredient);
    }
    
    return(
        <div className={`mt-6 ml-4 mr-2 ${styles.card}`} onClick={onClick}>
            {count>0 && <div className={styles.counter}>
                <Counter count={count} size="default" />
            </div>}
            <div className={"ml-4"}> 
                <img src={ingredient.image}/>
            </div> 
            <div className={`mt-1 mb-1 ${styles.price}`}>
                <Price price={ingredient.price}/>  
            </div>  
            <p className={`text text_type_main-small ${styles.name}`}>{ingredient.name}</p> 
        </div>
    )   
}

IngredientCard.propTypes = {
    ingredient: ingredientPropTypes,
    count: PropTypes.number
}