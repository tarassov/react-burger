import { FC } from "react";
import { IFeedOrder } from "../../services/adapters/feed-adapters";
import styles from "./order-totals.module.css";

const readyBurgers = ["034533", "034532", "034534", "034535"];
const inProgressBurgers = ["034543", "034542", "034544"];

const OrdersTotal: FC<{
	orders: Array<IFeedOrder>;
	total: number;
	totalToday: number;
}> = ({ total, totalToday }) => {
	return (
		<div className={styles.container}>
			<div className={styles.list}>
				<div>
					{readyBurgers.map((burger) => {
						return (
							<p key={burger} className={`text text_type_main-small`}>
								{burger}
							</p>
						);
					})}
				</div>
				<div>
					{inProgressBurgers.map((burger) => {
						return (
							<p key={burger} className={`text text_type_main-small`}>
								{burger}
							</p>
						);
					})}
				</div>
			</div>
			<p className={`text text_type_main-medium mt-8`}>
				Выполнено за все время:
			</p>
			<p className={`text text_type_digits-large`}>{total}</p>
			<p className={`text text_type_main-medium mt-8`}>Выполнено за сегодня</p>
			<p className={`text text_type_digits-large`}>{totalToday}</p>
		</div>
	);
};

export default OrdersTotal;
