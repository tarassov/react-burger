import styles from './ingredient-block.module.css'
import IngredientCard from '../ingredient-card/ingredient-card';

export default function IngredientBlock({data, type, onAddIngredient}){

    const onIngredientClick = (ingredient) => {
        onAddIngredient(ingredient)    }    

    return(
        <div className={styles.grid}> 
                    {data.map(ingredient => {
                        if(ingredient.type==type){
                            return <IngredientCard key={ingredient._id} ingredient={ingredient} onIngredientClick={onAddIngredient}/>
                        }
                    })}
        </div>
    )
}