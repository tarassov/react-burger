import { FC, useMemo } from "react";
import styles from "./ingredient-block.module.css";
import IngredientCard from "../ingredient-card/ingredient-card";
import { IIngredient } from "../../services/model/types";
import { IGroupedCart } from "../../services/adapters/elements-adapters";

const IngredientBlock: FC<{
	ingredients: Array<IIngredient>;
	groupedCart: IGroupedCart;
	onIngredientClick: (ingredient: IIngredient) => void;
}> = ({ ingredients, groupedCart, onIngredientClick }) => {
	const preparedData = useMemo(() => {
		return ingredients.map((ingredient) => {
			const count = groupedCart[ingredient._id];
			return (
				<IngredientCard
					key={ingredient._id}
					count={count}
					ingredient={ingredient}
					onIngredientClick={onIngredientClick}
				/>
			);
		});
	}, [ingredients, groupedCart, onIngredientClick]);

	return <div className={styles.grid}>{preparedData}</div>;
};

export default IngredientBlock;
