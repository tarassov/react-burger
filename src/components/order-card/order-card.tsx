import { FC, useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import Loader from "../loader/loader";
import styles from "./order-card.module.css";
import { RootState, useAppSelector } from "../../services/store/store";
import { selectOrderById } from "../../services/adapters/feed-adapters";
import { fetchOneOrder } from "../../services/actions/feed-actions";
import { fetchIngredients } from "../../services/actions/ingredients-actions";
import OrderIngredient from "../order-ingredient/order-ingredient";
import sayDate from "../../utils/say-date";
import Price from "../price/price";
import { IIngredient } from "../../services/model/types";

interface IGroupedIngredient extends IIngredient {
	count: number;
}

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

	const getDate = useMemo(() => {
		return order ? sayDate(order.createdAt) : "";
	}, [order?.createdAt]);

	const groupedIngredients = useMemo(() => {
		const grouped: Array<IGroupedIngredient> = [];

		if (order !== undefined) {
			order.ingredients.map((id) => {
				const ingredient = ingredients[id];
				if (ingredient) {
					const found = grouped.find((x) => x._id === id);
					if (found) {
						found.count++;
					} else {
						grouped.push({ ...ingredient, count: 1 });
					}
				}
			});
		}
		return grouped;
	}, [order?.ingredients]);

	const orderTotal = useMemo(() => {
		if (!ingredients || !order) return 0;
		return groupedIngredients.reduce((prev, curr) => {
			return prev + curr.price * curr.count;
		}, 0);
	}, [groupedIngredients]);

	if (!modal && (!order || ids.length === 0)) {
		return <Loader />;
	}
	return (
		<div className={styles.container}>
			<div className={`${styles.title} ${styles.titleCentered}`}>
				<p
					className={`${
						!modal ? "pt-8" : "pt-2"
					} text text_type_digits-default`}
				>
					#{order?.number}
				</p>
			</div>
			<p className={`mt-10 ml-2 text text_type_main-medium ${styles.name}`}>
				{order?.name}
			</p>
			<p className={`ml-2 text text_type_main ${styles.status}`}>
				{order?.status === "done" ? "Выполнен" : "В работе"}
			</p>
			<p className={`mt-10 ml-2 text text_type_main-medium`}>Состав:</p>
			<div className={`ml-2 mt-6 mr-2 ${styles.list}`}>
				{order &&
					groupedIngredients.map((ingredient, index) => {
						if (ingredient) {
							return (
								<OrderIngredient
									ingredient={ingredient}
									count={ingredient.count}
									key={index}
								/>
							);
						}
					})}
			</div>
			<div className={`${styles.footer} ml-2 mt-10`}>
				<p className={`ml-2 text text_type_main `}>{getDate} </p>
				<div className="mr-2">
					<Price price={orderTotal} />
				</div>
			</div>
		</div>
	);
};

export default OrderCard;
