import { FC, useMemo } from "react";
import { IFeedOrder } from "../../services/adapters/feed-adapters";
import { useAppSelector } from "../../services/store/store";
import styles from "./order-preview.module.css";

const OrderPreview: FC<{
	order: IFeedOrder;
	onOrderClick: (args: IFeedOrder) => void;
}> = ({ order, onOrderClick }) => {
	const onClick = () => {
		onOrderClick(order);
	};

	const ingredients = useAppSelector((store) => store.ingredients.entities);

	const getDate = useMemo(() => {
		const orderDate = new Date(order.createdAt).setHours(0, 0, 0, 0);
		const currentDate = new Date().setHours(0, 0, 0, 0);
		let day = "";
		if (orderDate === currentDate) {
			day = "Сегодня";
		} else if (currentDate - orderDate == 24 * 60 * 60 * 1000) {
			day = "Вчера";
		} else if (currentDate - orderDate == -24 * 60 * 60 * 1000) {
			day = "Завтра";
		}
		const time = new Date(order.createdAt).toLocaleTimeString("ru-Ru", {
			hour: "2-digit",
			minute: "2-digit",
			timeZoneName: "short",
		});
		return `${day}, ${time}`;
	}, [order.createdAt]);

	return (
		<div className={`${styles.card} mt-4`} onClick={onClick}>
			<div className={`${styles.header}`}>
				<p className={`text text_type_digits-default  m-6 ${styles.number}`}>
					{" "}
					#{order.number}
				</p>
				<p className="text text_type_main-default text_color_inactive m-6">
					{getDate}
				</p>
			</div>
			<p className="text text_type_main-medium ml-6 mr-6 mb-6">{order.name}</p>
			<div className={`${styles.ingredients} ml-6 pb-6`}>
				{order.ingredients
					.filter((x, index) => index < 9)
					.map((id, index) => {
						const ingredient = ingredients[id];
						if (ingredient !== undefined) {
							const left = -15 * index;
							return (
								<img
									src={ingredient.image}
									className={styles.image}
									style={
										index > 0
											? {
													left: `${left}px`,
													zIndex: order.ingredients.length - index,
											  }
											: { zIndex: order.ingredients.length }
									}
									key={index}
								/>
							);
						}
					})}
			</div>
		</div>
	);
};

export default OrderPreview;
