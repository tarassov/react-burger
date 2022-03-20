import {CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './price.module.css'

export default function Price({price}){
    return(
        <>
            <p className={`text text_type_digits-default mr-3 price ${styles.price}`}>{price}</p>
            <CurrencyIcon type="primary" />
        </>
    )    
}