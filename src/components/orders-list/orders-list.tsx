import { FC } from "react";
import { IFeedOrder } from "../../services/adapters/feed-adapters";
import OrderPreview from "../order-preview/order-preview";
import styles from "./order-list.module.css";

const OrdersList: FC<{ orders: Array<IFeedOrder> }> = ({ orders }) => {
	const onClick = (order: IFeedOrder) => {
		console.log(order._id);
	};

	return (
		<div className={`${styles.container} ml-2`}>
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
