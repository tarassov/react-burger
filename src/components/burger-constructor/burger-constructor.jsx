import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDrop } from "react-dnd";
import PropTypes from "prop-types";
import {
	ConstructorElement,
	DragIcon,
	Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-constructor.module.css";
import Price from "../price/price";

import { add, remove } from "../../services/actions/elements";
import { selectAllElements } from "../../services/reducers/elements";

export default function BurgerConstructor({ onPerformOrderClick }) {
	const [bun, setBun] = useState();

	const dispatch = useDispatch();
	const elements = useSelector(selectAllElements);
	const totalPrice = useSelector((store) => store.elements.totalPrice);

	const [{ isHover }, dropTargerRef] = useDrop({
		accept: "ingredient",
		collect: (monitor) => ({
			isHover: monitor.isOver(),
		}),
		drop(ingredient) {
			dispatch(add(ingredient));
		},
	});

	const onRemoveElement = useCallback(
		(element) => () => {
			dispatch(remove(element));
		},
		[dispatch]
	);

	useEffect(() => {
		setBun(elements.find((x) => x.type === "bun"));
	}, [elements]);

	return (
		<section className={`pl-4 ml-5 mt-25 ${styles.container}`}>
			<div className={`${styles.cart}`}>
				<div
					className={`${styles.elements} ${isHover && styles.onHover}`}
					ref={dropTargerRef}
				>
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
						{elements.map((ingredient, index) => {
							if (ingredient.type != "bun") {
								return (
									<div key={index}>
										<DragIcon type="primary" />
										<div className={`pl-1 ${styles.ingredient}`}>
											<ConstructorElement
												isLocked={false}
												text={ingredient.name}
												price={ingredient.price}
												handleClose={onRemoveElement(ingredient)}
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
					<Price price={totalPrice} large />
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
