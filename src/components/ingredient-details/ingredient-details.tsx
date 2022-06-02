import { FC, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchIngredients } from "../../services/actions/ingredients-actions";
import { selectIngredientById } from "../../services/adapters/ingredients-adapters";
import Loader from "../loader/loader";
import styles from "./ingredient-details.module.css";
import { useAppDispatch, useAppSelector } from "../../services/store/store";

const IngredientDetails: FC<{ modal?: boolean }> = ({ modal }) => {
	const { id } = useParams<{ id: string }>();
	const dispatch = useAppDispatch();
	const ingredient = useAppSelector((state) =>
		selectIngredientById(state, id ?? "")
	);
	useEffect(() => {
		if (!ingredient) dispatch(fetchIngredients());
	}, [ingredient]);

	if (!ingredient) {
		return <Loader />;
	}
	return (
		<div className={styles.container}>
			<div className={`${styles.title} ${!modal && styles.titleCentered}`}>
				<p className={`${modal && "pl-10"} text text_type_main-large`}>
					Детали ингредиента
				</p>
			</div>
			<div className={"mt-8"}>
				<img src={ingredient.image} className={styles.image} />
			</div>
			<p className="text text_type_main-medium mt-4">{ingredient.name}</p>
			<div className={`${styles.details} mt-8`}>
				<div className={styles.detailItem}>
					<p className="text text_type_main-default text_color_inactive ">
						Калории,ккал
					</p>
					<p className="text text_type_digits-default text_color_inactive">
						{ingredient.calories}
					</p>
				</div>
				<div className={styles.detailItem}>
					<p className={`text text_type_main-default text_color_inactive `}>
						Белки, г
					</p>
					<p className="text text_type_digits-default text_color_inactive">
						{ingredient.proteins}
					</p>
				</div>
				<div className={styles.detailItem}>
					<p className="text text_type_main-default text_color_inactive">
						Жиры, г
					</p>
					<p className="text text_type_digits-default text_color_inactive">
						{ingredient.fat}
					</p>
				</div>

				<div className={styles.detailItem}>
					<p className="text text_type_main-default text_color_inactive">
						Углеводы, г
					</p>
					<p className="text text_type_digits-default text_color_inactive">
						{ingredient.carbohydrates}
					</p>
				</div>
			</div>
		</div>
	);
};

export default IngredientDetails;
