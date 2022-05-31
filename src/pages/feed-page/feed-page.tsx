import { useEffect } from "react";
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
		dispatch(socket.connect());

		return function cleanup() {
			dispatch(socket.close());
		};
	}, []);

	return (
		<div className={styles.layout}>
			<OrdersList orders={orders} />
			<OrdersTotal totalToday={totalToday} total={total} orders={orders} />
			{connecting && <Loader />}
		</div>
	);
}
