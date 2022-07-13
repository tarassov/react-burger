import { useEffect } from "react";
import { motion } from "framer-motion";
import Loader from "../../components/loader/loader";
import OrdersList from "../../components/orders-list/orders-list";
import OrdersTotal from "../../components/orders-totals/orders-totals";
import * as socket from "../../services/actions/feed-actions";
import { fetchIngredients } from "../../services/actions/ingredients-actions";
import { selectAllOrders } from "../../services/adapters/feed-adapters";
import { useAppDispatch, useAppSelector } from "../../services/store/store";
import styles from "./feed-page.module.css";

export default function FeedPage() {
	const dispatch = useAppDispatch();

	const orders = useAppSelector(selectAllOrders);
	const { total, totalToday, connecting } = useAppSelector(
		(store) => store.feed
	);

	useEffect(() => {
		dispatch(fetchIngredients());
		dispatch(socket.connect("orders/all"));

		return function cleanup() {
			dispatch(socket.disconnect());
		};
	}, []);

	return (
		<motion.div
			className={styles.layout}
			animate={{
				opacity: [0, 1],
			}}
			transition={{ duration: 2 }}
		>
			{!connecting && (
				<>
					<div>
						<p className="text text_type_main-medium mt-6 ml-6">
							Лента заказов
						</p>
						<OrdersList orders={orders} />
					</div>

					<OrdersTotal totalToday={totalToday} total={total} orders={orders} />
				</>
			)}
			{connecting && <Loader />}
		</motion.div>
	);
}
