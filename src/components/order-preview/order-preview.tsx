import { FC, useMemo } from "react";
import { IFeedOrder } from "../../services/adapters/feed-adapters";
import { useAppSelector } from "../../services/store/store";
import sayDate from "../../utils/say-date";
import Price from "../price/price";
import { IGroupedIngredient } from "../../services/model/types";
import styles from "./order-preview.module.css";

const MAX_ROW = 8;

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
			const price = ingredient.price;
			return prev + price;
		}, 0);
	}, [order, ingredients]);

	const groupedIngredients = useMemo(() => {
		const grouped: Array<IGroupedIngredient> = [];

		if (order !== undefined) {
			order.ingredients.map((id) => {
				const ingredient = ingredients[id];
				if (ingredient) {
					const found = grouped.find((x) => x._id === id);
					if (found) {
						found.count++;
					} else {
						grouped.push({ ...ingredient, count: 1 });
					}
				}
			});
		}
		return grouped;
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
					{statusName(order.status)}
				</p>
			)}
			<div className={`${styles.footer} mt-6`}>
				<div className={`${styles.ingredients} ml-6 pb-6`}>
					{groupedIngredients.map((ingredient, index) => {
						if (ingredient !== undefined) {
							const column = index;
							const left = column + 40 * column;
							return (
								<div key={index}>
									{index === MAX_ROW - 1 &&
										groupedIngredients.length > MAX_ROW && (
											<div
												className={`text text_type_digits-small ${styles.count}`}
												style={{
													left: `${left + 18}px`,
													zIndex: MAX_ROW - column + 1,
												}}
											>
												+{groupedIngredients.length - MAX_ROW}
											</div>
										)}
									{index < MAX_ROW && (
										<img
											src={ingredient.image}
											className={`${styles.image} ${
												index === MAX_ROW - 1 &&
												groupedIngredients.length > MAX_ROW &&
												styles.faded
											}`}
											style={{
												left: `${left}px`,
												zIndex: MAX_ROW - column,
											}}
											key={index}
										/>
									)}
								</div>
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
