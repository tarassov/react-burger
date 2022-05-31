import { useEffect } from "react";
import * as socket from "../../../services/actions/feed-actions";
import { fetchIngredients } from "../../../services/actions/ingredients-actions";
import { useAppDispatch } from "../../../services/store/store";

export default function OrderHistory() {
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(fetchIngredients());
		dispatch(socket.connect("orders/all"));

		return function cleanup() {
			dispatch(socket.close());
		};
	}, []);
	return (
		<div>
			<p className={`text text_type_main-large`}>Здесь будет что-то</p>
		</div>
	);
}
