import { FC } from "react";

import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./price.module.css";

export const Price: FC<{
	price: number;
	size?: "default" | "medium" | "large";
}> = ({ price, size = "default" }) => {
	return (
		<div className={styles.container}>
			<p className={`text text_type_digits-${size} mr-3 ${styles.price}`}>
				{price}
			</p>
			<CurrencyIcon type="primary" />
		</div>
	);
};

export default Price;
