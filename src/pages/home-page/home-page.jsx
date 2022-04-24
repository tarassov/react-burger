import { useEffect, useCallback } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import BurgerConstructor from "../../components/burger-constructor/burger-constructor";
import BurgerIngredients from "../../components/burger-ingredients/burger-indredients";
import styles from "./home-page.module.css";
import Modal from "../../components/modal/modal";
import OrderDetails from "../../components/order-details/order-details";
import IngredientDetails from "../../components/ingredient-details/ingredient-details";
import { useSelector, useDispatch } from "react-redux";
import {
	fetchIngredients,
	selectIngredient,
	unselectIngredient,
} from "../../services/actions/ingredients-actions";
import { selectAllIngredients } from "../../services/adapters/ingredients-adapters";
import { selectAllElements } from "../../services/adapters/elements-adapters";
// import { postOrder } from "../../services/actions/orders-actions";
import { tryToPostOrder } from "../../services/actions/orders-actions";
import Error from "../../components/error/erorr";
import Loader from "../../components/loader/loader";

export default function HomePage() {
	//selectors
	const ingredients = useSelector(selectAllIngredients);
	const elements = useSelector(selectAllElements);
	const { orderModal, error, ingredientModal, loading } = useSelector(
		(store) => store.system
	);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchIngredients());
	}, []);

	//open OrderDetails as modal
	const onPerformOrder = useCallback(() => {
		dispatch(tryToPostOrder(elements));
	}, [elements, dispatch]);

	//open IngredientDetails as modal
	const onIngredientClick = useCallback((ingredient) => {
		dispatch(selectIngredient(ingredient));
	}, []);

	const onCloseIngredient = useCallback(() => {
		dispatch(unselectIngredient());
	}, []);

	return (
		<main className={styles.layout}>
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

			{ingredientModal && (
				<Modal onClose={onCloseIngredient}>
					<IngredientDetails />
				</Modal>
			)}
			{error && (
				<Modal>
					<Error />
				</Modal>
			)}
			{loading && <Loader />}
		</main>
	);
}
