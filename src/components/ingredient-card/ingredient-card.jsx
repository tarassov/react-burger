import PropTypes from "prop-types";
import { useDrag } from "react-dnd";

import { ingredientPropTypes } from "../../utils/prop-types";
import styles from "./ingredient-card.module.css";
import { Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import Price from "../price/price";

export default function IngredientCard({
	ingredient,
	count,
	onIngredientClick,
}) {
	const [{ opacity }, dragRef] = useDrag({
		type: "ingredient",
		item: { ...ingredient },
		collect: (monitor) => ({
			opacity: monitor.isDragging() ? 0.5 : 1,
		}),
	});

	const onClick = () => {
		onIngredientClick(ingredient);
	};

	return (
		<div
			className={`mt-6 ml-4 mr-2 ${styles.card}`}
			onClick={onClick}
			ref={dragRef}
			style={{ opacity }}
		>
			{count > 0 && (
				<div className={styles.counter}>
					<Counter count={count} size="default" />
				</div>
			)}
			<div className={"ml-4"}>
				<img src={ingredient.image} />
			</div>
			<div className={`mt-1 mb-1 ${styles.price}`}>
				<Price price={ingredient.price} />
			</div>
			<p className={`text text_type_main-small ${styles.name}`}>
				{ingredient.name}
			</p>
		</div>
	);
}

IngredientCard.propTypes = {
	ingredient: ingredientPropTypes,
	count: PropTypes.number,
	onIngredientClick: PropTypes.func.isRequired,
};
