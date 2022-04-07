import { useEffect, useState, useCallback } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
// import { v4 as uuidv4 } from "uuid";

import BurgerConstructor from "../burger-constructor/burger-constructor";
import BurgerIngredients from "../burger-ingredients/burger-indredients";
import styles from "./main-layout.module.css";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import IngredientDetails from "../ingredient-details/ingredient-details";
import { useSelector, useDispatch } from "react-redux";
import { fetchIngredients } from "../../services/actions/ingredients";
import { selectAllIngredients } from "../../services/reducers/ingredients";
import { postOrder } from "../../services/actions/elements";
import { selectAllElements } from "../../services/reducers/elements";

export default function MainLayout() {
	const [selectedIngredient, setSelectedIngredient] = useState();
	const data = useSelector(selectAllIngredients);
	const [isOpenOrder, setIsOpenOrder] = useState(false);
	const [isOpenIngredient, setIsOpenIngredient] = useState(false);
	const order = useSelector((store) => store.elements.order);
	const elements = useSelector(selectAllElements);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchIngredients());
	}, []);

	//open OrderDetails as modal
	const onPerformOrder = useCallback(() => {
		dispatch(postOrder(elements));
		setIsOpenOrder(true);
	}, [elements, dispatch]);

	const onCloseModalOrder = useCallback(() => {
		setIsOpenOrder(false);
	}, []);

	//open IngredientDetails as modal
	const onIngredientClick = useCallback((ingredient) => {
		setSelectedIngredient(ingredient);
		setIsOpenIngredient(true);
	}, []);

	const onCloseIngredient = useCallback(() => {
		setIsOpenIngredient(false);
	}, []);

	return (
		<main className={styles.layout}>
			<DndProvider backend={HTML5Backend}>
				{data && (
					<BurgerIngredients
						data={data}
						onIngredientClick={onIngredientClick}
					/>
				)}
				<BurgerConstructor onPerformOrderClick={onPerformOrder} />
			</DndProvider>

			{isOpenOrder && (
				<Modal onClose={onCloseModalOrder}>
					<OrderDetails
						order={order}
						isOrderPosting={order.posting}
						isOrderError={order.error}
					/>
				</Modal>
			)}

			{isOpenIngredient && (
				<Modal onClose={onCloseIngredient}>
					<IngredientDetails ingredient={selectedIngredient} />
				</Modal>
			)}
		</main>
	);
}
