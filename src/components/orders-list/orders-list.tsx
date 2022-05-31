import { FC, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useLocationTyped } from "../../hooks/use-location-typed";
import { IFeedOrder } from "../../services/adapters/feed-adapters";
import OrderPreview from "../order-preview/order-preview";
import styles from "./order-list.module.css";

const OrdersList: FC<{ orders: Array<IFeedOrder> }> = ({ orders }) => {
	const navigate = useNavigate();
	const location = useLocationTyped();

	const onClick = useCallback(
		(order: IFeedOrder) => {
			navigate(`/feed/${order.number}`, {
				state: { background: location },
			});
		},
		[location]
	);

	return (
		<div className={`${styles.container} ml-2`}>
			<p className="text text_type_main-medium mt-6 ml-6">Лента заказов</p>
			<div className={`${styles.list} mt-4`}>
				{orders.map((order) => {
					return (
						<OrderPreview
							order={order}
							onOrderClick={onClick}
							key={order._id}
						/>
					);
				})}
			</div>
		</div>
	);
};

export default OrdersList;
