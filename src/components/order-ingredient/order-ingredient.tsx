import { FC } from "react";
import { IIngredient } from "../../services/model/types";
import Price from "../price/price";
import styles from "./order-ingredient.module.css";

const OrderIngredient: FC<{ ingredient: IIngredient; count: number }> = ({
	ingredient,
	count,
}) => {
	return (
		<div className={`${styles.container}`}>
			<div>
				{" "}
				<img src={ingredient.image} className={styles.image} />
				<p className={`text text_type_main-default ${styles.name}`}>
					{" "}
					{ingredient.name}{" "}
				</p>
			</div>
			<div className={styles.price}>
				<p className={`text text_type_digits-default ${styles.count} `}>
					{count} x{" "}
				</p>
				<Price price={ingredient.price} />
			</div>
		</div>
	);
};

export default OrderIngredient;
