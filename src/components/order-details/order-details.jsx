import PropTypes from "prop-types";
import { orderPropTypes } from "../../utils/prop-types";
import done from "../../images/done.png";
import styles from "./order-details.module.css";

function OrderDetails({ order, isOrderPosting, isOrderError }) {
	return (
		<div className={styles.container}>
			{isOrderPosting ? (
				<p
					className={`text text_type_digits-large mt-30  ${styles.title} ${styles.blink}`}
				>
					...
				</p>
			) : (
				<p className={`text text_type_digits-large mt-30  ${styles.title}`}>
					{order.orderNumber}{" "}
				</p>
			)}

			{isOrderError && (
				<p className={`text text_type_main-medium mt-30  ${styles.title}`}>
					Ошибка при соединении.
				</p>
			)}

			{!isOrderError &&
				(isOrderPosting ? (
					<p className={`text text_type_main-medium mt-8`}>
						...идет соединение со спутником...{" "}
					</p>
				) : (
					<p className={`text text_type_main-medium mt-8`}>
						идентификатор заказа{" "}
					</p>
				))}

			{!isOrderError && (
				<div className={`mt-15 ${isOrderPosting && styles.blink}`}>
					<img
						src={done}
						className={styles.image}
						alt="изображение недоступно"
					/>
				</div>
			)}

			{!isOrderPosting && !isOrderError && (
				<>
					<p className="text text_type_main-default mt-15">
						Ваш заказ начали готовить
					</p>
					<p className="text text_type_main-default text_color_inactive mt-2">
						Дождитесь готовности на орбитальной станции
					</p>
				</>
			)}
		</div>
	);
}

OrderDetails.propTypes = {
	order: orderPropTypes,
	isOrderPosting: PropTypes.bool.isRequired,
	isOrderError: PropTypes.bool.isRequired,
};

export default OrderDetails;
