import { useEffect } from "react";
import OrdersList from "../../../components/orders-list/orders-list";
import * as socket from "../../../services/actions/feed-actions";
import { fetchIngredients } from "../../../services/actions/ingredients-actions";
import { selectAllOrders } from "../../../services/adapters/feed-adapters";
import { useAppDispatch, useAppSelector } from "../../../services/store/store";
import styles from "./order-history.module.css";

export default function OrderHistory() {
	const dispatch = useAppDispatch();
	const accessToken = useAppSelector((store) => store.user.accessToken);
	const orders = useAppSelector(selectAllOrders);

	useEffect(() => {
		dispatch(fetchIngredients());
		dispatch(
			socket.connect(`orders?token=${accessToken?.replace("Bearer ", "")}`)
		);

		return function cleanup() {
			dispatch(socket.disconnect());
		};
	}, []);
	return (
		<div className={`${styles.layout}`}>
			<OrdersList orders={orders} />
		</div>
	);
}
