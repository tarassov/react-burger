import { FC, useMemo } from "react";
import { IFeedOrder } from "../../services/adapters/feed-adapters";
import styles from "./order-totals.module.css";

const OrdersTotal: FC<{
	orders: Array<IFeedOrder>;
	total: number;
	totalToday: number;
}> = ({ orders, total, totalToday }) => {
	const readyBurgers = useMemo(
		() => orders.filter((x) => x.status === "done"),
		[orders]
	);

	const inProgressBurgers = useMemo(
		() => orders.filter((x) => x.status !== "done"),
		[orders]
	);

	return (
		<div className={`${styles.container} ml-15`}>
			<div className={styles.list}>
				<p className={`text text_type_main-default mb-6 ${styles.headerTitle}`}>
					Готовы:
				</p>
				<p className={`text text_type_main-default mb-6 ${styles.headerTitle}`}>
					В работе:
				</p>
			</div>
			<div className={styles.list}>
				<div className={`${styles.listBox}`}>
					{readyBurgers.map((burger) => {
						return (
							<p
								key={burger._id}
								className={`text text_type_main-small ${styles.ready}`}
							>
								{burger.number}
							</p>
						);
					})}
				</div>
				<div className={`${styles.listBox}`}>
					{inProgressBurgers.map((burger) => {
						return (
							<p key={burger._id} className={`text text_type_main-small`}>
								{burger.number}
							</p>
						);
					})}
				</div>
			</div>
			<p className={`text text_type_main-medium mt-8`}>
				Выполнено за все время:
			</p>
			<p className={`text text_type_digits-large ${styles.number}`}>{total}</p>
			<p className={`text text_type_main-medium mt-8`}>Выполнено за сегодня:</p>
			<p className={`text text_type_digits-large ${styles.number}`}>
				{totalToday}
			</p>
		</div>
	);
};

export default OrdersTotal;
