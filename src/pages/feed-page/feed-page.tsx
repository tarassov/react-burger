import { useEffect } from "react";
import OrdersList from "../../components/orders-list/orders-list";
import OrdersTotal from "../../components/orders-totals/orders-totals";
import { startWs } from "../../services/actions/feed-actions";
import { fetchIngredients } from "../../services/actions/ingredients-actions";
import { selectAllOrders } from "../../services/adapters/feed-adapters";
import { useAppDispatch, useAppSelector } from "../../services/store/store";
import styles from "./feed-page.module.css";

export default function FeedPage() {
	const dispatch = useAppDispatch();

	const orders = useAppSelector(selectAllOrders);
	const { total, totalToday } = useAppSelector((store) => store.feed);

	useEffect(() => {
		dispatch(fetchIngredients());
		dispatch(startWs());
	}, []);

	return (
		<div className={styles.layout}>
			<OrdersList orders={orders} />
			<OrdersTotal totalToday={totalToday} total={total} orders={orders} />
		</div>
	);
}
