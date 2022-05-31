import { FC, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import Loader from "../loader/loader";
import styles from "./order-card.module.css";
import { RootState, useAppSelector } from "../../services/store/store";
import { selectOrderById } from "../../services/adapters/feed-adapters";
import { fetchOneOrder } from "../../services/actions/feed-actions";
import { fetchIngredients } from "../../services/actions/ingredients-actions";

const OrderCard: FC<{ modal?: boolean }> = ({ modal }) => {
	const { number } = useParams<{ number: string }>();
	const dispatch = useDispatch();
	const order = useAppSelector((state: RootState) =>
		selectOrderById(state, number ?? "")
	);

	const { ids, entities: ingredients } = useAppSelector(
		(store) => store.ingredients
	);

	useEffect(() => {
		if (!order && number) dispatch(fetchOneOrder({ number: number }));
	}, [order]);

	useEffect(() => {
		if (ids.length === 0) dispatch(fetchIngredients());
	}, [ids]);

	if (!modal && (!order || ids.length === 0)) {
		return <Loader />;
	}

	return (
		<div className={styles.container}>
			<div className={`${styles.title} ${!modal && styles.titleCentered}`}>
				<p className={`${modal && "pl-10"} text text_type_main-large`}>
					#{order?.number}
				</p>
			</div>
			<div className={"mt-8"}>
				<p className={`${modal && "pl-10"} text text_type_main-large`}>
					{order?.name}
				</p>
			</div>
			<p className={`${modal && "pl-10"} text text_type_main-large`}>Состав:</p>
			{order &&
				order.ingredients.map((ingredient, index) => {
					return (
						<p key={index} className={`text text_type_main-default`}>
							{ingredients[ingredient]?.name}
						</p>
					);
				})}
		</div>
	);
};

export default OrderCard;
