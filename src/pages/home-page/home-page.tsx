import { useEffect, useCallback } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import BurgerConstructor from "../../components/burger-constructor/burger-constructor";
import BurgerIngredients from "../../components/burger-ingredients/burger-indredients";
import styles from "./home-page.module.css";
import Modal from "../../components/modal/modal";
import OrderDetails from "../../components/order-details/order-details";

import { fetchIngredients } from "../../services/actions/ingredients-actions";
import { selectAllIngredients } from "../../services/adapters/ingredients-adapters";
import { selectAllElements } from "../../services/adapters/elements-adapters";
import { postOrder } from "../../services/actions/orders-actions";
import Error from "../../components/error/erorr";
import Loader from "../../components/loader/loader";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/use-auth";
import { fireError } from "../../services/actions/system-actions";
import { useAppDispatch, useAppSelector } from "../../services/store/store";
import { IPostOrderRequest, IPostOrderResponse } from "../../api/types";
import { useLocationTyped } from "../../hooks/use-location-typed";

export default function HomePage() {
	//selectors
	const ingredients = useAppSelector(selectAllIngredients);
	const elements = useAppSelector(selectAllElements);
	const { orderModal, error, loading } = useAppSelector(
		(store) => store.system
	);
	const { secureDispatch } = useAuth();

	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const location = useLocationTyped();

	useEffect(() => {
		dispatch(fetchIngredients());
	}, []);

	//open OrderDetails as modal
	const onPerformOrder = useCallback(() => {
		const bun = elements.find((x) => x.type === "bun");
		if (elements.length === 0) {
			dispatch(fireError("Не выбраны ингредиенты"));
		} else if (bun === undefined) {
			dispatch(fireError("Не выбрана булка"));
		} else {
			elements.push(bun);
			secureDispatch<IPostOrderRequest, IPostOrderResponse>(postOrder, {
				ingredients: elements.map((ingredient) => ingredient._id),
			});
		}
	}, [elements, secureDispatch]);

	//open IngredientDetails as modal
	const onIngredientClick = useCallback(
		(ingredient) => {
			navigate(`/ingredients/${ingredient._id}`, {
				state: { background: location },
			});
		},
		[location]
	);

	return (
		<div className={styles.layout}>
			<DndProvider backend={HTML5Backend}>
				{ingredients && (
					<BurgerIngredients onIngredientClick={onIngredientClick} />
				)}
				<BurgerConstructor onPerformOrderClick={onPerformOrder} />
			</DndProvider>

			{orderModal && (
				<Modal>
					<OrderDetails />
				</Modal>
			)}

			{error && (
				<Modal>
					<Error />
				</Modal>
			)}
			{loading && <Loader />}
		</div>
	);
}
