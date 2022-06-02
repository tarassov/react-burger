import { FC, useMemo } from "react";
import { IFeedOrder } from "../../services/adapters/feed-adapters";
import { useAppSelector } from "../../services/store/store";
import sayDate from "../../utils/say-date";
import Price from "../price/price";
import styles from "./order-preview.module.css";

const OrderPreview: FC<{
	order: IFeedOrder;
	onOrderClick: (args: IFeedOrder) => void;
	showStatus?: boolean;
}> = ({ order, onOrderClick, showStatus }) => {
	const onClick = () => {
		onOrderClick(order);
	};

	const ingredients = useAppSelector((store) => store.ingredients.entities);

	const orderTotal = useMemo(() => {
		if (!ingredients) return 0;
		return order.ingredients.reduce((prev, curr) => {
			const ingredient = ingredients[curr];
			if (!ingredient) return prev;
			const price =
				ingredient.type === "bun" ? ingredient.price * 2 : ingredient.price;
			return prev + price;
		}, 0);
	}, [order, ingredients]);

	const getDate = useMemo(() => {
		return sayDate(order.createdAt);
	}, [order.createdAt]);

	const statusName = (status: string): string => {
		switch (status) {
			case "done":
				return "Выполнен";
			case "pending":
				return "Готовится";
			default:
				return "Создан";
		}
	};

	return (
		<div className={`${styles.card} mt-4 mr-2`} onClick={onClick}>
			<div className={`${styles.header}`}>
				<p className={`text text_type_digits-default  m-6 ${styles.number}`}>
					{" "}
					#{order.number}
				</p>
				<p className="text text_type_main-default text_color_inactive m-6">
					{getDate}
				</p>
			</div>
			<div className={`${styles.name}`}>
				<p className="text text_type_main-medium ml-6 mr-6">{order.name}</p>
			</div>
			{showStatus && (
				<p
					className={`text text_type_main-default ml-6 ${styles.status} ${
						order.status === "done" && styles.done
					}`}
				>
					{statusName(order.status)} {order.status}
				</p>
			)}
			<div className={`${styles.footer} mt-6`}>
				<div className={`${styles.ingredients} ml-6 pb-6`}>
					{order.ingredients
						.filter((x, index) => index < 9)
						.map((id, index) => {
							const ingredient = ingredients[id];
							if (ingredient !== undefined) {
								const left = index + 40 * index;
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
				<div className={`${styles.price} pt-4 mr-6`}>
					<Price price={orderTotal} />
				</div>
			</div>
		</div>
	);
};

export default OrderPreview;
