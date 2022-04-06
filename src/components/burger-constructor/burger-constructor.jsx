import { useEffect, useContext, useState } from "react";
import PropTypes from "prop-types";
import {
	ConstructorElement,
	DragIcon,
	Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-constructor.module.css";
import Price from "../price/price";
import { CartContext } from "../../services/app-context";

export default function BurgerConstructor({ onPerformOrderClick }) {
	const [bun, setBun] = useState();
	const { cartState } = useContext(CartContext);

	useEffect(() => {
		setBun(cartState.cart.find((x) => x.type === "bun"));
	}, [cartState.cart]);

	return (
		<section className={`pl-4 ml-5 mt-25 ${styles.container}`}>
			<div className={`${styles.cart}`}>
				<div className={`${styles.elements}`}>
					{bun && (
						<div className={`pl-8`}>
							<ConstructorElement
								type="top"
								isLocked={true}
								text={bun.name + " (верх)"}
								price={bun.price}
								thumbnail={bun.image_mobile}
							/>
						</div>
					)}
					<div className={styles.list}>
						{cartState.cart.map((ingredient, index) => {
							if (ingredient.type != "bun") {
								return (
									<div key={index}>
										<DragIcon type="primary" />
										<div className={`pl-1 ${styles.ingredient}`}>
											<ConstructorElement
												isLocked={false}
												text={ingredient.name}
												price={ingredient.price}
												thumbnail={ingredient.image_mobile}
											/>
										</div>
									</div>
								);
							}
						})}
					</div>
					{bun && (
						<div className={"pl-8"}>
							<ConstructorElement
								type="bottom"
								isLocked={true}
								text={bun.name + " (низ)"}
								price={bun.price}
								thumbnail={bun.image_mobile}
							/>
						</div>
					)}
				</div>
			</div>
			<div className={`mt-10 ${styles.total}`}>
				<div className={`mr-10 ${styles.price}`}>
					<Price price={cartState.totalPrice} large />
				</div>
				<Button type="primary" size="large" onClick={onPerformOrderClick}>
					Оформить заказ
				</Button>
			</div>
		</section>
	);
}

BurgerConstructor.propTypes = {
	onPerformOrderClick: PropTypes.func.isRequired,
};
