import { FC, useCallback, useMemo } from "react";
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
			navigate(`${location.pathname}/${order.number}`, {
				state: { background: location },
			});
		},
		[location]
	);
	const showOrdersStatus = useMemo(() => {
		return location.pathname === "/profile/orders";
	}, [location]);

	const sortedOrders = useMemo(() => {
		return orders.sort((a, b) => {
			if (new Date(a.createdAt) > new Date(b.createdAt)) {
				return -1;
			} else {
				return 1;
			}
		});
	}, [orders]);

	return (
		<div className={`${styles.container} ml-2`}>
			<div className={`${styles.list} mt-4`}>
				{sortedOrders.map((order) => {
					return (
						<OrderPreview
							order={order}
							onOrderClick={onClick}
							key={order._id}
							showStatus={showOrdersStatus}
						/>
					);
				})}
			</div>
		</div>
	);
};

export default OrdersList;
