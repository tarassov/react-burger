import styles from './ingredient-block.module.css'
import IngredientCard from '../ingredient-card/ingredient-card';
import {ingredientPropTypes} from '../../utils/prop-types'
import PropTypes from 'prop-types';

export default function IngredientBlock({data, groupedCart, type, onIngredientClick,onAddIngredient}){

       
    return(
        <div className={styles.grid}> 
                    {data.map(ingredient => {
                        if(ingredient.type==type){
                            var count = groupedCart[ingredient._id] 
                            return <IngredientCard key={ingredient._id} count = {count} ingredient={ingredient} onIngredientClick={onIngredientClick}/>
                        }
                    })}
        </div>
    )
}

IngredientBlock.propTypes = {
    data: PropTypes.arrayOf(ingredientPropTypes.isRequired),
    type: PropTypes.string.isRequired,
    groupedCart: PropTypes.object.isRequired,
    onAddIngredient: PropTypes.func.isRequired,
    onIngredientClick: PropTypes.func.isRequired,
};