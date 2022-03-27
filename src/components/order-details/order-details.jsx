import PropTypes from 'prop-types'
import {orderPropTypes} from '../../utils/prop-types'
import done from '../../images/done.png'
import styles from './order-details.module.css'

function OrderDetails({order}){
    return(
        <div className={styles.container}>
            <p className={`text text_type_digits-large mt-30  ${styles.title}`}>{order._id}</p> 
            <p className={`text text_type_main-medium mt-8`}>идентификатор заказа</p>       
            <div className={"mt-15"}><img src={done} className={styles.image}/></div>
            <p className="text text_type_main-default mt-15">Ваш заказ начали готовить</p>  
            <p className="text text_type_main-default text_color_inactive mt-2">Дождитесь готовности на орбитальной станции</p>  
        </div>
    )
}

OrderDetails.propTypes = {
    order:orderPropTypes,
}

export default OrderDetails