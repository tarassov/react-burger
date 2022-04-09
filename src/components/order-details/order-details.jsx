import done from "../../images/done.png";
import styles from "./order-details.module.css";
import { useSelector } from "react-redux";

function OrderDetails() {
	const order = useSelector((store) => store.elements.order);

	return (
		<div className={styles.container}>
			{order.posting ? (
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

			{order.error && (
				<p className={`text text_type_main-medium mt-30  ${styles.title}`}>
					Ошибка при соединении.
				</p>
			)}

			{!order.error &&
				(order.posting ? (
					<p className={`text text_type_main-medium mt-8`}>
						...идет соединение со спутником...{" "}
					</p>
				) : (
					<p className={`text text_type_main-medium mt-8`}>
						идентификатор заказа{" "}
					</p>
				))}

			{!order.error && (
				<div className={`mt-15 ${order.posting && styles.blink}`}>
					<img
						src={done}
						className={styles.image}
						alt="изображение недоступно"
					/>
				</div>
			)}

			{!order.posting && !order.error && (
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

export default OrderDetails;
