import { useEffect } from "react";
import Loader from "../../../components/loader/loader";
import OrdersList from "../../../components/orders-list/orders-list";
import { useAuth } from "../../../hooks/use-auth";
import * as socket from "../../../services/actions/feed-actions";
import { fetchIngredients } from "../../../services/actions/ingredients-actions";
import { selectAllOrders } from "../../../services/adapters/feed-adapters";
import { useAppDispatch, useAppSelector } from "../../../services/store/store";
import styles from "./order-history.module.css";

export default function OrderHistory() {
	const dispatch = useAppDispatch();
	const { accessToken } = useAuth();
	const orders = useAppSelector(selectAllOrders);
	const { connecting } = useAppSelector((store) => store.feed);

	useEffect(() => {
		dispatch(fetchIngredients());
	}, []);

	useEffect(() => {
		dispatch(socket.connect(`orders?token=${accessToken()}`));

		return function cleanup() {
			dispatch(socket.disconnect());
		};
	}, []);
	if (connecting) return <Loader />;
	return (
		<div className={`${styles.layout}`}>
			<OrdersList orders={orders} />
		</div>
	);
}
