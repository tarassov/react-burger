import { useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDrop } from "react-dnd";
import PropTypes from "prop-types";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-constructor.module.css";
import Price from "../price/price";

import { add, update } from "../../services/actions/elements";
import { selectAllElements } from "../../services/adapters/elements";
import BurgerElements from "../burger-elements/burger-elements";
import Bun from "../bun/bun";

export default function BurgerConstructor({ onPerformOrderClick }) {
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

	const onSubstitute = useCallback(
		(from, to, hoverIndex, dragIndex) => {
			if (hoverIndex !== dragIndex) {
				dispatch(
					update([
						{ ...from, sortIndex: hoverIndex },
						{ ...to, sortIndex: dragIndex },
					])
				);
			}
		},
		[dispatch]
	);

	const bun = useMemo(() => {
		return elements.find((x) => x.type === "bun");
	}, [elements]);

	const listElements = useMemo(() => {
		return elements.filter((x) => x.type !== "bun");
	}, [elements]);

	return (
		<section className={`pl-4 ml-5 mt-25 ${styles.container}`}>
			<div className={`${styles.cart}`}>
				<div
					className={`${styles.elements} ${isHover && styles.onHover}`}
					ref={dropTargerRef}
				>
					<Bun bun={bun} type={"top"} />
					<BurgerElements elements={listElements} onSubstitute={onSubstitute} />
					<Bun bun={bun} type={"bottom"} />
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
